import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Activity } from '../types/training';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface ActivityCardProps {
  activity: Activity;
  onPress?: () => void;
  showSource?: boolean;
}

export function ActivityCard({ activity, onPress, showSource = true }: ActivityCardProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'cardio':
        return 'heart.fill';
      case 'strength':
        return 'dumbbell.fill';
      case 'flexibility':
        return 'figure.yoga';
      case 'sports':
        return 'soccerball';
      default:
        return 'figure.walk';
    }
  };

  const getTypeColor = (type: Activity['type']) => {
    switch (type) {
      case 'cardio':
        return '#FF6B6B';
      case 'strength':
        return '#4ECDC4';
      case 'flexibility':
        return '#45B7D1';
      case 'sports':
        return '#96CEB4';
      default:
        return '#FFEAA7';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.card,
      pressed && styles.cardPressed
    ]}>
      <ThemedView style={styles.cardContent}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: getTypeColor(activity.type) }]}>
            <IconSymbol 
              name={getActivityIcon(activity.type)} 
              size={24} 
              color="white" 
            />
          </View>
          <View style={styles.headerText}>
            <ThemedText style={styles.title}>{activity.title}</ThemedText>
            <ThemedText style={styles.date}>{formatDate(activity.date)}</ThemedText>
          </View>
          {activity.completed && (
            <View style={styles.completedBadge}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#4CAF50" />
            </View>
          )}
        </View>
        
        <ThemedText style={styles.description}>{activity.description}</ThemedText>
        
        <View style={styles.stats}>
          <View style={styles.stat}>
            <IconSymbol name="clock" size={16} color="#666" />
            <ThemedText style={styles.statText}>{activity.duration} min</ThemedText>
          </View>
          <View style={styles.stat}>
            <IconSymbol name="flame" size={16} color="#FF6B6B" />
            <ThemedText style={styles.statText}>{activity.calories} cal</ThemedText>
          </View>
          {showSource && (
            <View style={styles.stat}>
              <IconSymbol 
                name={activity.source === 'alexa' ? 'speaker.wave.2' : 'hand.raised'} 
                size={16} 
                color="#007AFF" 
              />
              <ThemedText style={styles.statText}>
                {activity.source === 'alexa' ? 'Alexa' : 'Manual'}
              </ThemedText>
            </View>
          )}
        </View>
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
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
  },
  completedBadge: {
    marginLeft: 8,
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
});
