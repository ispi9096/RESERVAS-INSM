import { Reservation } from '../types';

export function getOrCreateUserId(): string {
  try {
    let uid = localStorage.getItem('app_user_id') || localStorage.getItem('app_creator_id');
    if (!uid) {
      uid = 'usr_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('app_user_id', uid);
    }
    return uid;
  } catch (err) {
    console.error('Error accessing localStorage for user ID:', err);
    return 'default_user';
  }
}

export function isReservationMine(r: Reservation, overrideIdentity?: string): boolean {
  if (!r) return false;

  const currentUserId = getOrCreateUserId();
  const currentSavedIdentity = (
    overrideIdentity ||
    localStorage.getItem('app_teacher_name') ||
    localStorage.getItem('app_teacher_identity') ||
    localStorage.getItem('app_creator_id') ||
    localStorage.getItem('app_user_id') ||
    currentUserId
  ).trim().toLowerCase();

  let myReservationIds: string[] = [];
  try {
    myReservationIds = JSON.parse(localStorage.getItem('app_my_reservation_ids') || '[]');
  } catch {
    myReservationIds = [];
  }

  const isOwnerByLocalStorageList = myReservationIds.includes(r.id);
  if (isOwnerByLocalStorageList) return true;

  if (!currentSavedIdentity) return false;

  const rCreatedBy = (r.createdBy || '').trim().toLowerCase();
  const rUserId = (r.userId || '').trim().toLowerCase();

  const isMatchByCreatedBy = Boolean(
    rCreatedBy && (rCreatedBy === currentSavedIdentity || rCreatedBy.includes(currentSavedIdentity) || currentSavedIdentity.includes(rCreatedBy))
  );
  const isMatchByUserId = Boolean(
    rUserId && (rUserId === currentSavedIdentity || rUserId.includes(currentSavedIdentity) || currentSavedIdentity.includes(rUserId))
  );

  return isMatchByCreatedBy || isMatchByUserId;
}

export function getMyReservationsCount(reservations: Reservation[], overrideIdentity?: string): number {
  if (!reservations || !Array.isArray(reservations)) return 0;
  return reservations.filter((r) => isReservationMine(r, overrideIdentity)).length;
}

