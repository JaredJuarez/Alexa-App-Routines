import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface WeekStatsProps {
  totalDuration: number;
  totalCalories: number;
  completedActivities: number;
  totalActivities: number;
}

export function WeekStats({ 
  totalDuration, 
  totalCalories, 
  completedActivities, 
  totalActivities 
}: WeekStatsProps) {
  const completionPercentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Resumen de la Semana</ThemedText>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#4CAF50' }]}>
            <IconSymbol name="checkmark.circle" size={24} color="white" />
          </View>
          <ThemedText style={styles.statValue}>{completedActivities}/{totalActivities}</ThemedText>
          <ThemedText style={styles.statLabel}>Completadas</ThemedText>
        </View>

        {totalDuration > 0 && (
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#2196F3' }]}>
              <IconSymbol name="clock" size={24} color="white" />
            </View>
            <ThemedText style={styles.statValue}>{totalDuration}min</ThemedText>
            <ThemedText style={styles.statLabel}>Tiempo Total</ThemedText>
          </View>
        )}

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#FF6B6B' }]}>
            <IconSymbol name="flame" size={24} color="white" />
          </View>
          <ThemedText style={styles.statValue}>{totalCalories}</ThemedText>
          <ThemedText style={styles.statLabel}>Calorías</ThemedText>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#FF9800' }]}>
            <IconSymbol name="chart.line.uptrend.xyaxis" size={24} color="white" />
          </View>
          <ThemedText style={styles.statValue}>{completionPercentage}%</ThemedText>
          <ThemedText style={styles.statLabel}>Progreso</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  statCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
});
