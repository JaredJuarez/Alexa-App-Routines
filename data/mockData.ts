import { Activity, Exercise, Routine, UserProfile, WeekActivity } from '../types/training';

// Datos hardcodeados del usuario
export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan.perez@email.com',
  age: 28,
  height: 175,
  weight: 70,
  fitnessLevel: 'intermediate',
  goals: ['Perder peso', 'Ganar músculo', 'Mejorar resistencia'],
  preferences: {
    workoutTypes: ['cardio', 'strength'],
    availableTime: 60,
    workoutDays: ['lunes', 'miércoles', 'viernes', 'sábado']
  },
  createdAt: '2024-01-15T08:00:00Z',
  updatedAt: '2024-12-01T10:30:00Z'
};

// Ejercicios base
const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Flexiones',
    description: 'Ejercicio básico de empuje para pecho y tríceps',
    sets: 3,
    reps: 15,
    restTime: 60,
    instructions: ['Colócate en posición de plancha', 'Baja el pecho hasta casi tocar el suelo', 'Empuja hacia arriba']
  },
  {
    id: '2',
    name: 'Sentadillas',
    description: 'Ejercicio para piernas y glúteos',
    sets: 3,
    reps: 20,
    restTime: 90,
    instructions: ['Pies separados al ancho de hombros', 'Baja como si fueras a sentarte', 'Sube explosivamente']
  },
  {
    id: '3',
    name: 'Plancha',
    description: 'Ejercicio isométrico para el core',
    duration: 60,
    sets: 3,
    restTime: 60,
    instructions: ['Posición de flexión pero apoyado en antebrazos', 'Mantén el cuerpo recto', 'Respira normalmente']
  }
];

// Actividades de la semana actual
export const mockCurrentWeekActivities: Activity[] = [
  {
    id: '1',
    title: 'Rutina matutina de cardio',
    description: 'Corrida ligera en el parque con Alexa',
    duration: 30,
    calories: 250,
    date: '2025-08-11T07:00:00Z',
    type: 'cardio',
    completed: true,
    source: 'alexa'
  },
  {
    id: '2',
    title: 'Entrenamiento de fuerza',
    description: 'Rutina de pesas en casa guiada por Alexa',
    duration: 45,
    calories: 180,
    date: '2025-08-09T18:30:00Z',
    type: 'strength',
    completed: true,
    source: 'alexa'
  },
  {
    id: '3',
    title: 'Yoga relajante',
    description: 'Sesión de yoga agregada manualmente',
    duration: 25,
    calories: 80,
    date: '2025-08-08T19:00:00Z',
    type: 'flexibility',
    completed: true,
    source: 'manual'
  },
  {
    id: '4',
    title: 'Entrenamiento HIIT',
    description: 'Sesión de alta intensidad programada con Alexa',
    duration: 20,
    calories: 200,
    date: '2025-08-12T17:00:00Z',
    type: 'cardio',
    completed: false,
    source: 'alexa'
  }
];

// Datos históricos
export const mockHistoricalData: WeekActivity[] = [
  {
    week: '2025-32',
    startDate: '2025-08-04',
    endDate: '2025-08-10',
    activities: [
      {
        id: '5',
        title: 'Caminata matutina',
        description: 'Caminata de 45 minutos',
        duration: 45,
        calories: 200,
        date: '2025-08-04T07:00:00Z',
        type: 'cardio',
        completed: true,
        source: 'alexa'
      },
      {
        id: '6',
        title: 'Entrenamiento de core',
        description: 'Rutina específica para abdominales',
        duration: 30,
        calories: 150,
        date: '2025-08-06T18:00:00Z',
        type: 'strength',
        completed: true,
        source: 'alexa'
      }
    ],
    totalDuration: 75,
    totalCalories: 350,
    completedActivities: 2
  },
  {
    week: '2025-31',
    startDate: '2025-07-28',
    endDate: '2025-08-03',
    activities: [
      {
        id: '7',
        title: 'Natación',
        description: 'Sesión de natación libre',
        duration: 60,
        calories: 400,
        date: '2025-07-30T16:00:00Z',
        type: 'cardio',
        completed: true,
        source: 'manual'
      }
    ],
    totalDuration: 60,
    totalCalories: 400,
    completedActivities: 1
  }
];

// Rutinas recomendadas por Alexa
export const mockRecommendedRoutines: Routine[] = [
  {
    id: '1',
    name: 'Rutina Matutina Energizante',
    description: 'Rutina perfecta para comenzar el día con energía',
    exercises: mockExercises,
    estimatedDuration: 25,
    difficulty: 'beginner',
    category: 'Full Body',
    recommendedBy: 'alexa',
    createdAt: '2025-08-10T08:00:00Z'
  },
  {
    id: '2',
    name: 'HIIT Quema Grasas',
    description: 'Entrenamiento de alta intensidad para quemar calorías',
    exercises: [
      {
        id: '4',
        name: 'Burpees',
        description: 'Ejercicio explosivo de cuerpo completo',
        sets: 4,
        reps: 10,
        restTime: 30,
        instructions: ['Posición de pie', 'Baja a plancha', 'Haz flexión', 'Salta explosivamente']
      },
      {
        id: '5',
        name: 'Mountain Climbers',
        description: 'Ejercicio cardiovascular intenso',
        duration: 30,
        sets: 4,
        restTime: 30,
        instructions: ['Posición de plancha', 'Alterna rodillas al pecho rápidamente', 'Mantén el core activo']
      }
    ],
    estimatedDuration: 20,
    difficulty: 'intermediate',
    category: 'Cardio',
    recommendedBy: 'alexa',
    createdAt: '2025-08-11T09:00:00Z'
  },
  {
    id: '3',
    name: 'Fuerza para Principiantes',
    description: 'Rutina básica para desarrollar fuerza gradualmente',
    exercises: mockExercises.slice(0, 2),
    estimatedDuration: 35,
    difficulty: 'beginner',
    category: 'Strength',
    recommendedBy: 'alexa',
    createdAt: '2025-08-09T14:00:00Z'
  }
];

// Semana actual
export const mockCurrentWeek: WeekActivity = {
  week: '2025-33',
  startDate: '2025-08-11',
  endDate: '2025-08-17',
  activities: mockCurrentWeekActivities,
  totalDuration: mockCurrentWeekActivities.reduce((sum, activity) => sum + activity.duration, 0),
  totalCalories: mockCurrentWeekActivities.reduce((sum, activity) => sum + activity.calories, 0),
  completedActivities: mockCurrentWeekActivities.filter(activity => activity.completed).length
};
