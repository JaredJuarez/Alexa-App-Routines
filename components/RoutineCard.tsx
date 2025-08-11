import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Routine } from '../types/training';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface RoutineCardProps {
  routine: Routine;
  onPress?: () => void;
  onStart?: () => void;
}

export function RoutineCard({ routine, onPress, onStart }: RoutineCardProps) {
  const getDifficultyColor = (difficulty: Routine['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getDifficultyText = (difficulty: Routine['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return 'Sin definir';
    }
  };

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.card,
      pressed && styles.cardPressed
    ]}>
      <ThemedView style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ThemedText style={styles.title}>{routine.name}</ThemedText>
            <ThemedText style={styles.category}>{routine.category}</ThemedText>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(routine.difficulty) }]}>
            <Text style={styles.difficultyText}>{getDifficultyText(routine.difficulty)}</Text>
          </View>
        </View>
        
        <ThemedText style={styles.description}>{routine.description}</ThemedText>
        
        <View style={styles.stats}>
          <View style={styles.stat}>
            <IconSymbol name="clock" size={16} color="#666" />
            <ThemedText style={styles.statText}>{routine.estimatedDuration} min</ThemedText>
          </View>
          <View style={styles.stat}>
            <IconSymbol name="figure.strengthtraining.traditional" size={16} color="#666" />
            <ThemedText style={styles.statText}>{routine.exercises.length} ejercicios</ThemedText>
          </View>
          <View style={styles.stat}>
            <IconSymbol 
              name={routine.recommendedBy === 'alexa' ? 'speaker.wave.2' : 'brain.head.profile'} 
              size={16} 
              color="#007AFF" 
            />
            <ThemedText style={styles.statText}>
              {routine.recommendedBy === 'alexa' ? 'Alexa' : 'Sistema'}
            </ThemedText>
          </View>
        </View>

        {onStart && (
          <Pressable 
            style={styles.startButton}
            onPress={onStart}
          >
            <IconSymbol name="play.fill" size={16} color="white" />
            <Text style={styles.startButtonText}>Iniciar Rutina</Text>
          </Pressable>
        )}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  cardContent: {
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    opacity: 0.7,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.8,
  },
  startButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});
