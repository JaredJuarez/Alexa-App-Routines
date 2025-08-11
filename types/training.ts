export interface Activity {
  id: string;
  title: string;
  description: string;
  duration: number; // en minutos
  calories: number;
  date: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';
  completed: boolean;
  source: 'alexa' | 'manual';
}

export interface WeekActivity {
  week: string; // formato: "YYYY-WW"
  startDate: string;
  endDate: string;
  activities: Activity[];
  totalDuration: number;
  totalCalories: number;
  completedActivities: number;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  recommendedBy: 'alexa' | 'system';
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets?: number;
  reps?: number;
  duration?: number; // en segundos
  restTime?: number; // en segundos
  instructions: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  height: number; // en cm
  weight: number; // en kg
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferences: {
    workoutTypes: string[];
    availableTime: number; // minutos por día
    workoutDays: string[]; // días de la semana
  };
  createdAt: string;
  updatedAt: string;
}

export interface AlexaInteraction {
  id: string;
  timestamp: string;
  action: string;
  data: any;
  success: boolean;
}
