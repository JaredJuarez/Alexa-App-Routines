import { Activity, AlexaInteraction, Routine } from '../types/training';

// Simulador de comunicación con Alexa Skill
export class AlexaService {
  private static instance: AlexaService;
  private interactions: AlexaInteraction[] = [];

  public static getInstance(): AlexaService {
    if (!AlexaService.instance) {
      AlexaService.instance = new AlexaService();
    }
    return AlexaService.instance;
  }

  // Simular recepción de nueva actividad desde Alexa
  public async receiveActivityFromAlexa(): Promise<Activity | null> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockActivities: Partial<Activity>[] = [
      {
        title: 'Caminata con Alexa',
        description: 'Sesión de caminata guiada por voz',
        duration: 30,
        calories: 150,
        type: 'cardio'
      },
      {
        title: 'Rutina de fuerza matutina',
        description: 'Entrenamiento de fuerza recomendado por Alexa',
        duration: 25,
        calories: 180,
        type: 'strength'
      },
      {
        title: 'Sesión de estiramiento',
        description: 'Ejercicios de flexibilidad y relajación',
        duration: 15,
        calories: 60,
        type: 'flexibility'
      }
    ];

    // Simular que a veces no hay nuevas actividades
    if (Math.random() > 0.7) {
      return null;
    }

    const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
    
    const activity: Activity = {
      id: Date.now().toString(),
      title: randomActivity.title!,
      description: randomActivity.description!,
      duration: randomActivity.duration!,
      calories: randomActivity.calories!,
      date: new Date().toISOString(),
      type: randomActivity.type!,
      completed: false,
      source: 'alexa'
    };

    this.logInteraction('receive_activity', activity, true);
    return activity;
  }

  // Simular envío de rutina recomendada desde Alexa
  public async receiveRoutineFromAlexa(): Promise<Routine | null> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockRoutines: Partial<Routine>[] = [
      {
        name: 'Rutina Express de Alexa',
        description: 'Entrenamiento rápido y efectivo para días ocupados',
        estimatedDuration: 15,
        difficulty: 'beginner',
        category: 'Quick Workout'
      },
      {
        name: 'Cardio Intensivo Alexa',
        description: 'Sesión de cardio de alta intensidad',
        estimatedDuration: 30,
        difficulty: 'intermediate',
        category: 'Cardio'
      }
    ];

    if (Math.random() > 0.5) {
      return null;
    }

    const randomRoutine = mockRoutines[Math.floor(Math.random() * mockRoutines.length)];
    
    const routine: Routine = {
      id: Date.now().toString(),
      name: randomRoutine.name!,
      description: randomRoutine.description!,
      exercises: [], // En una implementación real, vendría con ejercicios
      estimatedDuration: randomRoutine.estimatedDuration!,
      difficulty: randomRoutine.difficulty!,
      category: randomRoutine.category!,
      recommendedBy: 'alexa',
      createdAt: new Date().toISOString()
    };

    this.logInteraction('receive_routine', routine, true);
    return routine;
  }

  // Simular envío de actividad completada a Alexa
  public async sendActivityToAlexa(activity: Activity): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simular posibles fallos de red
    const success = Math.random() > 0.1; // 90% de éxito

    this.logInteraction('send_activity', activity, success);
    return success;
  }

  // Simular obtención del estado de progreso desde Alexa
  public async getProgressFromAlexa(): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockProgress = {
      weeklyGoal: 150, // minutos
      currentProgress: 120,
      streakDays: 5,
      achievements: ['First Week Complete', 'Cardio Master'],
      recommendations: [
        'Intenta agregar más ejercicios de fuerza',
        'Has mejorado tu resistencia cardiovascular',
        'Considera aumentar la intensidad gradualmente'
      ]
    };

    this.logInteraction('get_progress', mockProgress, true);
    return mockProgress;
  }

  // Simular configuración de recordatorios en Alexa
  public async setReminderInAlexa(reminder: {
    time: string;
    message: string;
    days: string[];
  }): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const success = Math.random() > 0.05; // 95% de éxito
    this.logInteraction('set_reminder', reminder, success);
    return success;
  }

  // Obtener historial de interacciones con Alexa
  public getInteractionHistory(): AlexaInteraction[] {
    return [...this.interactions].reverse(); // Más recientes primero
  }

  // Simular estado de conexión con Alexa
  public async getConnectionStatus(): Promise<{
    connected: boolean;
    lastSync: string;
    skillVersion: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    return {
      connected: Math.random() > 0.1, // 90% de tiempo conectado
      lastSync: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Última sincronización en la última hora
      skillVersion: '2.1.0'
    };
  }

  // Método privado para registrar interacciones
  private logInteraction(action: string, data: any, success: boolean): void {
    const interaction: AlexaInteraction = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      data,
      success
    };

    this.interactions.push(interaction);

    // Mantener solo las últimas 50 interacciones
    if (this.interactions.length > 50) {
      this.interactions = this.interactions.slice(-50);
    }
  }

  // Simular comando de voz procesado por Alexa
  public async processVoiceCommand(command: string): Promise<{
    understood: boolean;
    response: string;
    action?: any;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = {
      'start workout': {
        understood: true,
        response: 'Perfecto, iniciando tu rutina de entrenamiento. ¿Prefieres cardio o fuerza hoy?',
        action: { type: 'suggest_routine', routineType: 'mixed' }
      },
      'log activity': {
        understood: true,
        response: 'Entendido. Registraré tu actividad. ¿Cuántos minutos entrenaste?',
        action: { type: 'log_activity_prompt' }
      },
      'show progress': {
        understood: true,
        response: 'Has completado 120 minutos esta semana de tu meta de 150. ¡Vas muy bien!',
        action: { type: 'show_progress' }
      },
      'default': {
        understood: false,
        response: 'No entendí completamente. ¿Podrías repetir tu solicitud sobre entrenamiento?'
      }
    };

    const response = responses[command as keyof typeof responses] || responses.default;
    
    this.logInteraction('voice_command', { command, response }, response.understood);
    return response;
  }
}

// Exportar instancia singleton
export const alexaService = AlexaService.getInstance();
