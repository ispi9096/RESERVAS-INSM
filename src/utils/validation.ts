import { ResourceId, Reservation, FixedSchedule } from '../types';
import { INITIAL_RESOURCES } from '../data/initialData';

export interface ValidationResult {
  isAvailable: boolean;
  message?: string;
  occupantName?: string;
  course?: string;
  subject?: string;
  isFixed?: boolean;
  assignedResourceId?: ResourceId;
}

export function validateResourceAvailability(
  requestedResourceId: ResourceId,
  dateStr: string, // YYYY-MM-DD
  dayOfWeek: number, // 1..5
  timeSlotId: number,
  reservations: Reservation[] = [],
  fixedSchedules: FixedSchedule[] = []
): ValidationResult {
  return isSpecificResourceBooked(requestedResourceId, dateStr, dayOfWeek, timeSlotId, reservations, fixedSchedules);
}

function isSpecificResourceBooked(
  resourceId: ResourceId,
  dateStr: string,
  dayOfWeek: number,
  timeSlotId: number,
  reservations: Reservation[] = [],
  fixedSchedules: FixedSchedule[] = []
): ValidationResult {
  const safeReservations = Array.isArray(reservations) ? reservations : [];
  const safeFixedSchedules = Array.isArray(fixedSchedules) ? fixedSchedules : [];

  // Check fixed schedules for this specific resource
  const fixed = safeFixedSchedules.find(f => f && Number(f?.dayOfWeek) === Number(dayOfWeek) && Number(f?.timeSlotId) === Number(timeSlotId) && f?.resourceId === resourceId);
  if (fixed) {
    return {
      isAvailable: false,
      message: `🔒 Horario Fijo Curricular: ${fixed?.subject || 'Materia'} - ${fixed?.course || 'Curso'}`,
      course: fixed?.course || '',
      subject: fixed?.subject || '',
      isFixed: true,
      assignedResourceId: resourceId
    };
  }

  // Check user reservations
  const existing = safeReservations.find(r => r && r?.resourceId === resourceId && r?.date === dateStr && Number(r?.timeSlotId) === Number(timeSlotId));
  if (existing) {
    const resourceName = INITIAL_RESOURCES.find(res => res.id === resourceId)?.name || resourceId;
    return {
      isAvailable: false,
      message: `⚠️ ${resourceName} ya reservado para ${existing?.subject || 'Clase'} (${existing?.course || ''})`,
      course: existing?.course || '',
      subject: existing?.subject || '',
      isFixed: false,
      assignedResourceId: resourceId
    };
  }

  return {
    isAvailable: true,
    assignedResourceId: resourceId,
    message: 'Disponible para reserva'
  };
}

