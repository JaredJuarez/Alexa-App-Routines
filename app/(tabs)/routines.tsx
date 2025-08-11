import { RoutineCard } from '@/components/RoutineCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { mockRecommendedRoutines } from '@/data/mockData';
import { Exercise, Routine } from '@/types/training';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function RoutinesScreen() {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);

  const startRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
    setCurrentExerciseIndex(0);
    setIsWorkoutActive(true);
    setWorkoutTimer(0);
  };

  const finishWorkout = () => {
    Alert.alert(
      '¡Rutina Completada!',
      `Has completado la rutina "${selectedRoutine?.name}". ¡Excelente trabajo!`,
      [
        {
          text: 'Guardar',
          onPress: () => {
            // Aquí se guardaría la actividad completada
            setSelectedRoutine(null);
            setIsWorkoutActive(false);
            setCurrentExerciseIndex(0);
            setWorkoutTimer(0);
          }
        }
      ]
    );
  };

  const nextExercise = () => {
    if (selectedRoutine && currentExerciseIndex < selectedRoutine.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      finishWorkout();
    }
  };

  const formatExerciseInstructions = (exercise: Exercise) => {
    if (exercise.sets && exercise.reps) {
      return `${exercise.sets} series de ${exercise.reps} repeticiones`;
    } else if (exercise.duration) {
      return `Mantener por ${exercise.duration} segundos`;
    }
    return 'Sigue las instrucciones';
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Rutinas</ThemedText>
        <ThemedText style={styles.subtitle}>Recomendaciones de Alexa</ThemedText>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="speaker.wave.2.fill" size={24} color="#007AFF" />
            <ThemedText style={styles.sectionTitle}>Recomendadas por Alexa</ThemedText>
          </View>
          
          {mockRecommendedRoutines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onPress={() => {
                Alert.alert(
                  routine.name,
                  `${routine.description}\n\nDificultad: ${routine.difficulty}\nDuración estimada: ${routine.estimatedDuration} minutos\nEjercicios: ${routine.exercises.length}`
                );
              }}
              onStart={() => startRoutine(routine)}
            />
          ))}
        </View>

        {mockRecommendedRoutines.length === 0 && (
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="figure.strengthtraining.traditional" size={64} color="#ccc" />
            <ThemedText style={styles.emptyTitle}>Sin rutinas aún</ThemedText>
            <ThemedText style={styles.emptyText}>
              Alexa te recomendará rutinas personalizadas basadas en tu progreso
            </ThemedText>
          </ThemedView>
        )}
      </ScrollView>

      {/* Modal de ejercicio activo */}
      <Modal
        visible={isWorkoutActive && selectedRoutine !== null}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ThemedView style={styles.workoutContainer}>
          <View style={styles.workoutHeader}>
            <Pressable 
              style={styles.closeButton}
              onPress={() => {
                Alert.alert(
                  'Cancelar Rutina',
                  '¿Estás seguro de que quieres cancelar la rutina?',
                  [
                    { text: 'Continuar', style: 'cancel' },
                    { 
                      text: 'Cancelar', 
                      style: 'destructive',
                      onPress: () => {
                        setSelectedRoutine(null);
                        setIsWorkoutActive(false);
                        setCurrentExerciseIndex(0);
                      }
                    }
                  ]
                );
              }}
            >
              <IconSymbol name="xmark" size={24} color="#FF3B30" />
            </Pressable>
            
            <View style={styles.workoutHeaderInfo}>
              <ThemedText style={styles.workoutTitle}>{selectedRoutine?.name}</ThemedText>
              <ThemedText style={styles.workoutProgress}>
                Ejercicio {currentExerciseIndex + 1} de {selectedRoutine?.exercises.length}
              </ThemedText>
            </View>
          </View>

          {selectedRoutine && (
            <ScrollView style={styles.exerciseContainer}>
              <View style={styles.exerciseContent}>
                <ThemedText style={styles.exerciseName}>
                  {selectedRoutine.exercises[currentExerciseIndex]?.name}
                </ThemedText>
                
                <ThemedText style={styles.exerciseDescription}>
                  {selectedRoutine.exercises[currentExerciseIndex]?.description}
                </ThemedText>

                <View style={styles.exerciseDetails}>
                  <ThemedText style={styles.exerciseFormat}>
                    {formatExerciseInstructions(selectedRoutine.exercises[currentExerciseIndex])}
                  </ThemedText>
                  
                  {selectedRoutine.exercises[currentExerciseIndex]?.restTime && (
                    <ThemedText style={styles.restTime}>
                      Descanso: {selectedRoutine.exercises[currentExerciseIndex].restTime} segundos
                    </ThemedText>
                  )}
                </View>

                <View style={styles.instructionsContainer}>
                  <ThemedText style={styles.instructionsTitle}>Instrucciones:</ThemedText>
                  {selectedRoutine.exercises[currentExerciseIndex]?.instructions.map((instruction, index) => (
                    <View key={index} style={styles.instructionItem}>
                      <View style={styles.instructionNumber}>
                        <ThemedText style={styles.instructionNumberText}>{index + 1}</ThemedText>
                      </View>
                      <ThemedText style={styles.instructionText}>{instruction}</ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}

          <View style={styles.workoutActions}>
            <Pressable 
              style={styles.nextButton}
              onPress={nextExercise}
            >
              <ThemedText style={styles.nextButtonText}>
                {selectedRoutine && currentExerciseIndex === selectedRoutine.exercises.length - 1 
                  ? 'Finalizar Rutina' 
                  : 'Siguiente Ejercicio'
                }
              </ThemedText>
              <IconSymbol 
                name={selectedRoutine && currentExerciseIndex === selectedRoutine.exercises.length - 1 
                  ? "checkmark" 
                  : "arrow.right"
                } 
                size={20} 
                color="white" 
              />
            </Pressable>
          </View>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 80, // Aumentado de 60 a 80 para más espacio
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Espacio para la barra de navegación
  },
  section: {
    margin: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 48,
    margin: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 24,
  },
  workoutContainer: {
    flex: 1,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  closeButton: {
    padding: 8,
  },
  workoutHeaderInfo: {
    flex: 1,
    alignItems: 'center',
    marginRight: 32,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  workoutProgress: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  exerciseContainer: {
    flex: 1,
  },
  exerciseContent: {
    padding: 24,
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  exerciseDescription: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 24,
    lineHeight: 24,
  },
  exerciseDetails: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  exerciseFormat: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  restTime: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  instructionsContainer: {
    marginTop: 8,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  workoutActions: {
    padding: 24,
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});
