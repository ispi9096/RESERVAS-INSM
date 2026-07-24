import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  getDocs,
  writeBatch
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Reservation, FixedSchedule } from '../types';
import { INITIAL_FIXED_SCHEDULES, generateSampleReservationsForCurrentWeek } from '../data/initialData';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const RESERVATIONS_COLLECTION = 'reservations';
const FIXED_SCHEDULES_COLLECTION = 'fixed_schedules';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: localStorage.getItem('app_user_id') || null,
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Status:', JSON.stringify(errInfo));
}

/**
 * Subscribe to reservations in real-time from Firestore.
 * Automatically seeds sample reservations if collection is completely empty on first run.
 */
export function subscribeToReservations(callback: (reservations: Reservation[]) => void) {
  const colRef = collection(db, RESERVATIONS_COLLECTION);
  
  return onSnapshot(colRef, async (snapshot) => {
    if (snapshot.empty) {
      const hasSeeded = localStorage.getItem('app_has_seeded_reservations') === 'true';
      if (!hasSeeded) {
        localStorage.setItem('app_has_seeded_reservations', 'true');
        // Seed default sample reservations if database is empty on first run
        const initialReservations = generateSampleReservationsForCurrentWeek();
        callback(initialReservations);

        const batch = writeBatch(db);
        initialReservations.forEach((res) => {
          const docRef = doc(db, RESERVATIONS_COLLECTION, res.id);
          const cleanRes: any = {
            id: res.id,
            resourceId: res.resourceId,
            date: res.date,
            dayOfWeek: Number(res.dayOfWeek),
            timeSlotId: Number(res.timeSlotId),
            subject: res.subject || 'Clase',
            course: res.course || '',
            createdAt: res.createdAt || new Date().toISOString(),
            notes: res.notes || '',
            createdBy: res.createdBy || null,
            userId: res.userId || null,
            isFixed: !!res.isFixed
          };
          batch.set(docRef, cleanRes);
        });
        try {
          await batch.commit();
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, RESERVATIONS_COLLECTION);
        }
        return;
      }

      callback([]);
      return;
    }

    // Mark as seeded since database contains items
    localStorage.setItem('app_has_seeded_reservations', 'true');

    const reservationsList: Reservation[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      reservationsList.push({
        id: docSnap.id,
        resourceId: data.resourceId,
        date: data.date,
        dayOfWeek: Number(data.dayOfWeek),
        timeSlotId: Number(data.timeSlotId),
        subject: data.subject || 'Clase',
        course: data.course || '',
        createdAt: data.createdAt || new Date().toISOString(),
        notes: data.notes || '',
        createdBy: data.createdBy || undefined,
        userId: data.userId || undefined,
        isFixed: !!data.isFixed
      });
    });

    try {
      localStorage.setItem('app_cached_reservations', JSON.stringify(reservationsList));
    } catch (e) {
      // Ignore quota errors
    }

    callback(reservationsList);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, RESERVATIONS_COLLECTION);
    try {
      const cached = localStorage.getItem('app_cached_reservations');
      if (cached) {
        callback(JSON.parse(cached));
        return;
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
    callback(generateSampleReservationsForCurrentWeek());
  });
}

/**
 * Subscribe to fixed schedules in real-time from Firestore.
 * Automatically seeds initial fixed schedules if collection is empty.
 */
export function subscribeToFixedSchedules(callback: (schedules: FixedSchedule[]) => void) {
  const colRef = collection(db, FIXED_SCHEDULES_COLLECTION);

  return onSnapshot(colRef, async (snapshot) => {
    if (snapshot.empty) {
      callback(INITIAL_FIXED_SCHEDULES);
      const batch = writeBatch(db);
      INITIAL_FIXED_SCHEDULES.forEach((sched) => {
        const docRef = doc(db, FIXED_SCHEDULES_COLLECTION, sched.id);
        const cleanSched: any = {
          id: sched.id,
          resourceId: sched.resourceId,
          dayOfWeek: Number(sched.dayOfWeek),
          timeSlotId: Number(sched.timeSlotId),
          subject: sched.subject || '',
          course: sched.course || '',
          notes: sched.notes || ''
        };
        batch.set(docRef, cleanSched);
      });
      try {
        await batch.commit();
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, FIXED_SCHEDULES_COLLECTION);
      }
      return;
    }

    const schedulesList: FixedSchedule[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      schedulesList.push({
        id: docSnap.id,
        resourceId: data.resourceId,
        dayOfWeek: Number(data.dayOfWeek),
        timeSlotId: Number(data.timeSlotId),
        subject: data.subject || '',
        course: data.course || '',
        notes: data.notes || ''
      });
    });

    try {
      localStorage.setItem('app_cached_fixed_schedules', JSON.stringify(schedulesList));
    } catch (e) {
      // Ignore
    }

    callback(schedulesList);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, FIXED_SCHEDULES_COLLECTION);
    try {
      const cached = localStorage.getItem('app_cached_fixed_schedules');
      if (cached) {
        callback(JSON.parse(cached));
        return;
      }
    } catch (e) {
      // Ignore
    }
    callback(INITIAL_FIXED_SCHEDULES);
  });
}

/**
 * Add a new reservation to Firestore
 */
export async function addReservationToDb(reservation: Omit<Reservation, 'id'> & { id?: string }): Promise<string> {
  const id = reservation.id || `res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const docRef = doc(db, RESERVATIONS_COLLECTION, id);
  const dataToSave: Reservation = {
    id,
    resourceId: reservation.resourceId,
    date: reservation.date,
    dayOfWeek: Number(reservation.dayOfWeek),
    timeSlotId: Number(reservation.timeSlotId),
    subject: reservation.subject || 'Clase',
    course: reservation.course || '',
    createdAt: reservation.createdAt || new Date().toISOString(),
    notes: reservation.notes || '',
    createdBy: reservation.createdBy || undefined,
    userId: reservation.userId || undefined,
    isFixed: !!reservation.isFixed
  };
  try {
    await setDoc(docRef, dataToSave);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${RESERVATIONS_COLLECTION}/${id}`);
    throw error;
  }
  return id;
}

/**
 * Update an existing reservation in Firestore
 */
export async function updateReservationInDb(id: string, updates: Partial<Reservation>): Promise<void> {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id);
  const cleanUpdates: any = {};
  Object.keys(updates).forEach((key) => {
    const val = (updates as any)[key];
    if (val !== undefined) {
      cleanUpdates[key] = val;
    }
  });
  try {
    await updateDoc(docRef, cleanUpdates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${RESERVATIONS_COLLECTION}/${id}`);
    throw error;
  }
}

/**
 * Clear/delete all reservations from Firestore and localStorage, leaving 0 reservations in system.
 */
export async function clearAllReservationsFromDb(): Promise<void> {
  // Prevent auto-seeding sample reservations when database becomes empty
  localStorage.setItem('app_has_seeded_reservations', 'true');
  
  try {
    localStorage.setItem('app_cached_reservations', '[]');
    localStorage.setItem('app_my_reservation_ids', '[]');
  } catch (e) {
    console.error('Error resetting cached reservations in localStorage:', e);
  }

  try {
    const colRef = collection(db, RESERVATIONS_COLLECTION);
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const docs = snapshot.docs;
      // Delete in chunks of 400 to respect Firestore batch limit
      for (let i = 0; i < docs.length; i += 400) {
        const chunk = docs.slice(i, i + 400);
        const batch = writeBatch(db);
        chunk.forEach((docSnap) => {
          batch.delete(docSnap.ref);
        });
        await batch.commit();
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, RESERVATIONS_COLLECTION);
    throw error;
  }
}

/**
 * Delete a reservation from Firestore
 */
export async function deleteReservationFromDb(id: string): Promise<void> {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${RESERVATIONS_COLLECTION}/${id}`);
    throw error;
  }
}

/**
 * Add a fixed schedule to Firestore
 */
export async function addFixedScheduleToDb(schedule: Omit<FixedSchedule, 'id'> & { id?: string }): Promise<string> {
  const id = schedule.id || `fix-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const docRef = doc(db, FIXED_SCHEDULES_COLLECTION, id);
  const dataToSave: FixedSchedule = {
    ...schedule,
    id
  };
  try {
    await setDoc(docRef, dataToSave);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${FIXED_SCHEDULES_COLLECTION}/${id}`);
    throw error;
  }
  return id;
}

/**
 * Update a fixed schedule in Firestore
 */
export async function updateFixedScheduleInDb(id: string, updates: Partial<FixedSchedule>): Promise<void> {
  const docRef = doc(db, FIXED_SCHEDULES_COLLECTION, id);
  try {
    await updateDoc(docRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${FIXED_SCHEDULES_COLLECTION}/${id}`);
    throw error;
  }
}

/**
 * Delete a fixed schedule from Firestore
 */
export async function deleteFixedScheduleFromDb(id: string): Promise<void> {
  const docRef = doc(db, FIXED_SCHEDULES_COLLECTION, id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${FIXED_SCHEDULES_COLLECTION}/${id}`);
    throw error;
  }
}

