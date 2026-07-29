import { Resource, TimeSlot, FixedSchedule, Reservation } from '../types';

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'sala_robotica',
    category: 'sala',
    name: 'Sala de Robótica',
    code: 'SALA-ROB',
    description: 'Espacio equipado con mesas de trabajo y TV',
    location: 'Planta Baja - Ala Este',
    capacity: 30,
    icon: 'Bot',
    features: ['Kits Lego/Arduino', 'Pizarra Interactiva', '30 puestos de trabajo']
  },
  {
    id: 'sala_computacion',
    category: 'sala',
    name: 'Sala de Computación',
    code: 'SALA-COMP',
    description: 'Laboratorio de Informática con PCs conectadas a Internet',
    location: 'Planta Baja - Ala Este',
    capacity: 25,
    icon: 'Monitor',
    features: ['25 PCs i5 16GB', 'Internet 500Mbps', 'Acondicionador de aire', 'Proyector fijo']
  },
  {
    id: 'proyector_1',
    category: 'proyector',
    name: 'Proyector 1 (Portátil)',
    code: 'PROY-01',
    description: 'Proyector con entrada VGA y adaptador HDMI (normal).',
    location: 'Gabinete Técnico (Pedir en Biblioteca)',
    capacity: 1,
    icon: 'Projector',
    features: ['HDMI/VGA', 'Altavoces integrados', 'Maletín de transporte']
  },
  {
    id: 'proyector_2',
    category: 'proyector',
    name: 'Proyector 2',
    code: 'PROY-02',
    description: 'Proyector con entrada VGA y adaptador HDMI (normal).',
    location: 'Gabinete Técnico (Pedir en Biblioteca)',
    capacity: 1,
    icon: 'Projector',
    features: ['HDMI/VGA', 'Altavoces integrados', 'Maletín de transporte']
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  // TURNO MAÑANA
  { id: 1, label: 'Módulo 1', startTime: '07:30', endTime: '08:10' },
  { id: 2, label: 'Módulo 2', startTime: '08:10', endTime: '08:40' },
  { id: 3, label: 'Módulo 3', startTime: '09:00', endTime: '09:35' },
  { id: 4, label: 'Módulo 4', startTime: '09:35', endTime: '10:20' },
  { id: 5, label: 'Módulo 5', startTime: '10:35', endTime: '11:15' },
  { id: 6, label: 'Módulo 6', startTime: '11:15', endTime: '11:55' },
  { id: 7, label: 'Módulo 7', startTime: '11:55', endTime: '12:35' },
  { id: 8, label: 'Módulo 8', startTime: '12:35', endTime: '13:10' },

  // TURNO TARDE
  { id: 9, label: 'Módulo 9', startTime: '13:15', endTime: '13:55' },
  { id: 10, label: 'Módulo 10', startTime: '13:55', endTime: '14:35' },
  { id: 11, label: 'Módulo 11', startTime: '14:45', endTime: '15:25' },
  { id: 12, label: 'Módulo 12', startTime: '15:25', endTime: '16:05' },
  { id: 13, label: 'Módulo 13', startTime: '16:15', endTime: '16:55' },
  { id: 14, label: 'Módulo 14', startTime: '16:55', endTime: '17:35' },
  { id: 15, label: 'Módulo 15', startTime: '17:40', endTime: '18:20' },
  { id: 16, label: 'Módulo 16', startTime: '18:20', endTime: '19:00' }
];

export const INSTITUTIONAL_COURSES = [
  '1º Año A (Secundario)',
  '1º Año B (Secundario)',
  '2º Año A (Secundario)',
  '2º Año B (Secundario)',
  '3º Unificado (Secundario)',
  '3º Año Nat (Secundario)',
  '3º Año Soc (Secundario)',
  '4º Unificado (Secundario)',
  '4º Año Nat (Secundario)',
  '4º Año Soc (Secundario)',
  '5º Unificado (Secundario)',
  '5º Año Nat (Secundario)',
  '5º Año Soc (Secundario)',
  '1º Grado (Primario)',
  '2º Grado (Primario)',
  '3º Grado (Primario)',
  '4º Grado (Primario)',
  '5º Grado (Primario)',
  '6º Grado (Primario)',
  '7º Grado (Primario)',
  'Sala de 3 Años (Inicial)',
  'Sala de 4 Años (Inicial)',
  'Sala de 5 Años (Inicial)'
];

export interface SubjectLevelGroup {
  level: string;
  subjects: string[];
}

export const SUBJECTS_BY_COURSE: Record<string, string[]> = {
  '1º Año A (Secundario)': [
    'BIOLOGÍA',
    'EDUCACIÓN ARTÍSTICA (MÚSICA)',
    'EDUCACIÓN FÍSICA',
    'EDUCACIÓN TECNOLÓGICA',
    'ESPACIO DE DESARROLLO DEL IDEARIO',
    'FORMACIÓN ÉTICA Y CIUDADANA',
    'GEOGRAFÍA',
    'LENGUA EXTRANJERA (INGLÉS)',
    'LENGUA Y LITERATURA',
    'MATEMÁTICA',
    'TALLER DE ECONOMÍA Y ADMINISTRACIÓN'
  ],
  '1º Año B (Secundario)': [
    'BIOLOGÍA',
    'EDUCACIÓN ARTÍSTICA (MÚSICA)',
    'EDUCACIÓN FÍSICA',
    'EDUCACIÓN TECNOLÓGICA',
    'ESPACIO DE DESARROLLO DEL IDEARIO',
    'FORMACIÓN ÉTICA Y CIUDADANA',
    'GEOGRAFÍA',
    'LENGUA EXTRANJERA (INGLÉS)',
    'LENGUA Y LITERATURA',
    'MATEMÁTICA',
    'TALLER DE ECONOMÍA Y ADMINISTRACIÓN'
  ],
  '2º Año A (Secundario)': [
    'EDUCACIÓN ARTÍSTICA (ARTES VISUALES)',
    'EDUCACIÓN FÍSICA',
    'FÍSICO-QUÍMICA',
    'FORMACIÓN ÉTICA Y CIUDADANA',
    'HISTORIA',
    'LENGUA EXTRANJERA (INGLÉS)',
    'MATEMÁTICA',
    'ESPACIO DE DESARROLLO DEL IDEARIO',
    'TALLER DE ECONOMÍA Y ADMINISTRACIÓN',
    'LENGUA Y LITERATURA',
    'EDUCACIÓN TECNOLÓGICA'
  ],
  '2º Año B (Secundario)': [
    'EDUCACIÓN ARTÍSTICA (ARTES VISUALES)',
    'EDUCACIÓN FÍSICA',
    'FÍSICO-QUÍMICA',
    'FORMACIÓN ÉTICA Y CIUDADANA',
    'HISTORIA',
    'LENGUA EXTRANJERA (INGLÉS)',
    'MATEMÁTICA',
    'ESPACIO DE DESARROLLO DEL IDEARIO',
    'TALLER DE ECONOMÍA Y ADMINISTRACIÓN',
    'LENGUA Y LITERATURA',
    'EDUCACIÓN TECNOLÓGICA'
  ],
  '3º Unificado (Secundario)': [
    'LENGUA EXTRANJERA (INGLÉS)',
    'LENGUA Y LITERATURA',
    'MATEMÁTICA',
    'EDUCACIÓN FÍSICA',
    'BIOLOGÍA',
    'HISTORIA',
    'EDUCACIÓN ARTÍSTICA',
    'FÍSICA',
    'ESPACIO DE DESARROLLO DEL IDEARIO'
  ],
  '3º Año Nat (Secundario)': [
    'CONSTRUCCIÓN DE CIUDADANÍA E IDENTIDAD',
    'QUÍMICA'
  ],
  '3º Año Soc (Secundario)': [
    'CONSTRUCCIÓN DE CIUDADANÍA E IDENTIDAD',
    'ECONOMÍA'
  ],
  '4º Unificado (Secundario)': [
    'EDUCACIÓN FÍSICA',
    'GEOGRAFÍA',
    'LENGUA EXTRANJERA (INGLÉS)',
    'LENGUA Y LITERATURA',
    'ESPACIO DE DESARROLLO DEL IDEARIO',
    'MATEMÁTICA',
    'CONSTRUCCIÓN DE LA CIUDADANÍA Y PARTICIPACIÓN',
    'HISTORIA'
  ],
  '4º Año Nat (Secundario)': [
    'BIOLOGÍA',
    'QUÍMICA',
    'FÍSICA',
    'SALUD Y ADOLESCENCIA'
  ],
  '4º Año Soc (Secundario)': [
    'QUÍMICA',
    'SOCIOLOGÍA',
    'PSICOLOGÍA',
    'CIENCIAS DE LA COMUNICACIÓN'
  ],
  '5º Unificado (Secundario)': [
    'FILOSOFÍA',
    'LENGUA Y LITERATURA',
    'EDUCACIÓN FÍSICA',
    'ESPACIO DE DESARROLLO DEL IDEARIO',
    'CONSTRUCCIÓN DE LA CIUDADANÍA Y DERECHO',
    'LENGUA EXTRANJERA (INGLÉS)',
    'MATEMÁTICA'
  ],
  '5º Año Nat (Secundario)': [
    'BIOLOGÍA',
    'ORIENTACIÓN CONTEXTOS LABORALES',
    'CIENCIAS DE LA TIERRA',
    'SALUD Y AMBIENTE',
    'QUÍMICA',
    'FÍSICA'
  ],
  '5º Año Soc (Secundario)': [
    'GEOGRAFÍA',
    'HISTORIA',
    'CIENCIAS POLÍTICAS',
    'ORIENTACIÓN CONTEXTOS LABORALES',
    'SEMINARIO DE INVESTIGACIÓN'
  ],
  'Sala de 3 Años (Inicial)': [
    'Espacio Curricular',
    'Expresión Corporal',
    'Música',
    'Juego y Desarrollo'
  ],
  'Sala de 4 Años (Inicial)': [
    'Espacio Curricular',
    'Expresión Corporal',
    'Música',
    'Juego y Desarrollo'
  ],
  'Sala de 5 Años (Inicial)': [
    'Espacio Curricular',
    'Expresión Corporal',
    'Música',
    'Juego y Desarrollo'
  ]
};

export function getSubjectsForCourse(courseName: string): string[] {
  if (!courseName) return SUBJECTS_BY_COURSE['1º Año A (Secundario)'];

  const lower = courseName.toLowerCase();

  // 3º Año
  if (lower.includes('3º') && (lower.includes('nat') || lower.includes('3n'))) {
    return SUBJECTS_BY_COURSE['3º Año Nat (Secundario)'];
  }
  if (lower.includes('3º') && (lower.includes('soc') || lower.includes('3s'))) {
    return SUBJECTS_BY_COURSE['3º Año Soc (Secundario)'];
  }
  if (lower.includes('3º') && lower.includes('unificado')) {
    return SUBJECTS_BY_COURSE['3º Unificado (Secundario)'];
  }

  // 4º Año
  if (lower.includes('4º') && (lower.includes('nat') || lower.includes('4n'))) {
    return SUBJECTS_BY_COURSE['4º Año Nat (Secundario)'];
  }
  if (lower.includes('4º') && (lower.includes('soc') || lower.includes('4s'))) {
    return SUBJECTS_BY_COURSE['4º Año Soc (Secundario)'];
  }
  if (lower.includes('4º') && lower.includes('unificado')) {
    return SUBJECTS_BY_COURSE['4º Unificado (Secundario)'];
  }

  // 5º Año
  if (lower.includes('5º') && (lower.includes('nat') || lower.includes('5n'))) {
    return SUBJECTS_BY_COURSE['5º Año Nat (Secundario)'];
  }
  if (lower.includes('5º') && (lower.includes('soc') || lower.includes('5s'))) {
    return SUBJECTS_BY_COURSE['5º Año Soc (Secundario)'];
  }
  if (lower.includes('5º') && lower.includes('unificado')) {
    return SUBJECTS_BY_COURSE['5º Unificado (Secundario)'];
  }

  if (SUBJECTS_BY_COURSE[courseName]) return SUBJECTS_BY_COURSE[courseName];

  if (lower.includes('inicial') || lower.includes('sala')) {
    return ['Espacio Curricular', 'Expresión Corporal', 'Música', 'Juego y Desarrollo'];
  }
  if (lower.includes('primario') || lower.includes('grado')) {
    return ['Ciencias Naturales', 'Ciencias Sociales', 'Educación Tecnológica', 'Lengua y Literatura', 'Matemática', 'Educación Física', 'Inglés', 'Música', 'Plástica'];
  }
  if (lower.includes('1º año') || lower.includes('1ºa') || lower.includes('1ºb')) {
    return SUBJECTS_BY_COURSE['1º Año A (Secundario)'];
  }
  if (lower.includes('2º año') || lower.includes('2ºa') || lower.includes('2ºb')) {
    return SUBJECTS_BY_COURSE['2º Año A (Secundario)'];
  }

  return SUBJECTS_BY_COURSE['1º Año A (Secundario)'];
}

export const OFFICIAL_SUBJECTS_BY_LEVEL: SubjectLevelGroup[] = [
  {
    level: 'NIVEL SECUNDARIO',
    subjects: [
      'ARTES VISUALES',
      'BIOLOGÍA',
      'CIUD. E IDENTIDAD',
      'CIUDAD. Y PART',
      'CONST. CIUD. Y DER',
      'CS DE LA COMUN',
      'CS. DE LA TIERRA',
      'CS. POLÍTICAS',
      'ECONOMIA',
      'ED.TECNOLOG.',
      'ESP. IDEARIO',
      'F. ETICA',
      'FEyC',
      'FILOSOFÍA',
      'FÍSICA',
      'FÍSICO-QUÍMICA',
      'GEOGRAFÍA',
      'HISTORIA',
      'IDEARIO',
      'INFORMÁTICA',
      'INGLÉS',
      'LENGUA',
      'LENGUA Y LITE',
      'MATEMÁTICA',
      'MÚSICA',
      'OCL',
      'PLASTICA',
      'PSICOLOGÍA',
      'QUÍMICA',
      'SALUD',
      'SEMINARIO',
      'SOCIOLOGÍA',
      'T.E.A.',
      'TALLER LENGUA',
      'TUTORÍA'
    ]
  },
  {
    level: 'NIVEL PRIMARIO',
    subjects: [
      'Ciencias Naturales',
      'Ciencias Sociales',
      'Educación Tecnológica',
      'Lengua y Literatura',
      'Matemática',
      'Saberes, Vidas y Mundos'
    ]
  },
  {
    level: 'NIVEL INICIAL',
    subjects: [
      'Espacio Curricular'
    ]
  }
];

// Horarios fijos institucionales recurrentes (módulos semanales obligatorios)
// 1 = Lunes, 2 = Martes, 3 = Miércoles, 4 = Jueves, 5 = Viernes
export const INITIAL_FIXED_SCHEDULES: FixedSchedule[] = [
  // Tecnología — 1º Año A: Jueves (4), Módulos 3 y 4 (Sala de Computación y Sala de Robótica)
  { id: 'fix-1', resourceId: 'sala_computacion', dayOfWeek: 4, timeSlotId: 3, subject: 'Tecnología', course: '1º Año A', notes: 'Clase curricular semanal fija' },
  { id: 'fix-2', resourceId: 'sala_robotica', dayOfWeek: 4, timeSlotId: 3, subject: 'Tecnología', course: '1º Año A', notes: 'Clase curricular semanal fija' },
  { id: 'fix-3', resourceId: 'sala_computacion', dayOfWeek: 4, timeSlotId: 4, subject: 'Tecnología', course: '1º Año A', notes: 'Clase curricular semanal fija' },
  { id: 'fix-4', resourceId: 'sala_robotica', dayOfWeek: 4, timeSlotId: 4, subject: 'Tecnología', course: '1º Año A', notes: 'Clase curricular semanal fija' },

  // Tecnología — 2º Año A: Miércoles (3), Módulos 3 y 4 (Sala de Computación y Sala de Robótica)
  { id: 'fix-5', resourceId: 'sala_computacion', dayOfWeek: 3, timeSlotId: 3, subject: 'Tecnología', course: '2º Año A', notes: 'Clase curricular semanal fija' },
  { id: 'fix-6', resourceId: 'sala_robotica', dayOfWeek: 3, timeSlotId: 3, subject: 'Tecnología', course: '2º Año A', notes: 'Clase curricular semanal fija' },
  { id: 'fix-7', resourceId: 'sala_computacion', dayOfWeek: 3, timeSlotId: 4, subject: 'Tecnología', course: '2º Año A', notes: 'Clase curricular semanal fija' },
  { id: 'fix-8', resourceId: 'sala_robotica', dayOfWeek: 3, timeSlotId: 4, subject: 'Tecnología', course: '2º Año A', notes: 'Clase curricular semanal fija' },

  // Tecnología — 2º Año B: Jueves (4), Módulos 1 y 2 (Sala de Computación y Sala de Robótica)
  { id: 'fix-9', resourceId: 'sala_computacion', dayOfWeek: 4, timeSlotId: 1, subject: 'Tecnología', course: '2º Año B', notes: 'Clase curricular semanal fija' },
  { id: 'fix-10', resourceId: 'sala_robotica', dayOfWeek: 4, timeSlotId: 1, subject: 'Tecnología', course: '2º Año B', notes: 'Clase curricular semanal fija' },
  { id: 'fix-11', resourceId: 'sala_computacion', dayOfWeek: 4, timeSlotId: 2, subject: 'Tecnología', course: '2º Año B', notes: 'Clase curricular semanal fija' },
  { id: 'fix-12', resourceId: 'sala_robotica', dayOfWeek: 4, timeSlotId: 2, subject: 'Tecnología', course: '2º Año B', notes: 'Clase curricular semanal fija' },

  // Matemática — 3º Año: Viernes (5), Módulos 1 y 2 (Sala de Computación)
  { id: 'fix-13', resourceId: 'sala_computacion', dayOfWeek: 5, timeSlotId: 1, subject: 'Matemática', course: '3° Año', notes: 'Clase curricular semanal fija' },
  { id: 'fix-14', resourceId: 'sala_computacion', dayOfWeek: 5, timeSlotId: 2, subject: 'Matemática', course: '3° Año', notes: 'Clase curricular semanal fija' },
];

// Helper to get current week's Monday in YYYY-MM-DD
export function getMondayOfCurrentWeek(d = new Date()): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function generateSampleReservationsForCurrentWeek(): Reservation[] {
  const monday = getMondayOfCurrentWeek();

  // Helper to add days to Monday
  const getDateStr = (addDays: number) => {
    const d = new Date(monday);
    d.setDate(d.getDate() + addDays);
    return formatDateToYYYYMMDD(d);
  };

  return [
    {
      id: 'res-102',
      resourceId: 'sala_computacion',
      date: getDateStr(2), // Miércoles
      dayOfWeek: 3,
      timeSlotId: 5,
      course: '3º Año Soc',
      subject: 'Matemática con GeoGebra',
      createdAt: new Date().toISOString(),
      notes: 'Modelado gráfico de funciones'
    }
  ];
}
