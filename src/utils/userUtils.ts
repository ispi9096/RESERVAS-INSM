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

  const identityRaw = (
    overrideIdentity !== undefined
      ? overrideIdentity
      : localStorage.getItem('app_teacher_name') ||
        localStorage.getItem('app_teacher_identity') ||
        ''
  );

  const currentSavedIdentity = identityRaw.trim().toLowerCase();

  // Strict private filtering: only match if a teacher name/surname is entered in the input field
  if (currentSavedIdentity.length > 0) {
    const rCreatedBy = (r.createdBy || '').trim().toLowerCase();
    const rUserId = (r.userId || '').trim().toLowerCase();

    const isMatchByCreatedBy = Boolean(
      rCreatedBy && (
        rCreatedBy === currentSavedIdentity || 
        rCreatedBy.includes(currentSavedIdentity) || 
        currentSavedIdentity.includes(rCreatedBy)
      )
    );
    const isMatchByUserId = Boolean(
      rUserId && (
        rUserId === currentSavedIdentity || 
        rUserId.includes(currentSavedIdentity) || 
        currentSavedIdentity.includes(rUserId)
      )
    );

    return isMatchByCreatedBy || isMatchByUserId;
  }

  // If no teacher name is typed in the field, return false for private filtering
  return false;
}

export function getMyReservationsCount(reservations: Reservation[], overrideIdentity?: string): number {
  if (!reservations || !Array.isArray(reservations)) return 0;
  return reservations.filter((r) => isReservationMine(r, overrideIdentity)).length;
}

