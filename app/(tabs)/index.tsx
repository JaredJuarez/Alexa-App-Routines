import { ActivityCard } from '@/components/ActivityCard';
import { AlexaStatus } from '@/components/AlexaStatus';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { WeekStats } from '@/components/WeekStats';
import { mockCurrentWeek } from '@/data/mockData';
import { Activity } from '@/types/training';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function CurrentWeekScreen() {
  const [activities, setActivities] = useState(mockCurrentWeek.activities);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    duration: '',
    calories: '',
    type: 'cardio' as Activity['type']
  });

  const handleAddActivity = () => {
    if (!newActivity.title.trim() || !newActivity.duration) {
      Alert.alert('Error', 'Por favor completa al menos el título y la duración');
      return;
    }

    const activity: Activity = {
      id: Date.now().toString(),
      title: newActivity.title,
      description: newActivity.description,
      duration: parseInt(newActivity.duration) || 0,
      calories: parseInt(newActivity.calories) || 0,
      date: new Date().toISOString(),
      type: newActivity.type,
      completed: true,
      source: 'manual'
    };

    setActivities([...activities, activity]);
    setNewActivity({ title: '', description: '', duration: '', calories: '', type: 'cardio' });
    setShowAddModal(false);
    Alert.alert('¡Éxito!', 'Actividad agregada correctamente');
  };

  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
  const totalCalories = activities.reduce((sum, activity) => sum + activity.calories, 0);
  const completedActivities = activities.filter(activity => activity.completed).length;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Semana Actual</ThemedText>
        <ThemedText style={styles.weekRange}>
          {mockCurrentWeek.startDate} - {mockCurrentWeek.endDate}
        </ThemedText>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AlexaStatus style={styles.alexaStatus} />
        
        <WeekStats
          totalDuration={totalDuration}
          totalCalories={totalCalories}
          completedActivities={completedActivities}
          totalActivities={activities.length}
        />

        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Actividades</ThemedText>
          <Pressable 
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <IconSymbol name="plus.circle.fill" size={24} color="#007AFF" />
          </Pressable>
        </View>

        {activities.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity}
            onPress={() => {
              Alert.alert(
                activity.title,
                `${activity.description}\n\nDuración: ${activity.duration} minutos\nCalorías: ${activity.calories}\nFuente: ${activity.source === 'alexa' ? 'Alexa' : 'Manual'}`
              );
            }}
          />
        ))}
      </ScrollView>

      {/* Modal para agregar actividad */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowAddModal(false)}>
              <ThemedText style={styles.cancelButton}>Cancelar</ThemedText>
            </Pressable>
            <ThemedText style={styles.modalTitle}>Nueva Actividad</ThemedText>
            <Pressable onPress={handleAddActivity}>
              <ThemedText style={styles.saveButton}>Guardar</ThemedText>
            </Pressable>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Título *</ThemedText>
              <TextInput
                style={styles.textInput}
                value={newActivity.title}
                onChangeText={(text) => setNewActivity({...newActivity, title: text})}
                placeholder="Ej. Rutina matutina"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Descripción</ThemedText>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newActivity.description}
                onChangeText={(text) => setNewActivity({...newActivity, description: text})}
                placeholder="Describe tu actividad..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Duración (min) *</ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={newActivity.duration}
                  onChangeText={(text) => setNewActivity({...newActivity, duration: text})}
                  placeholder="30"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Calorías</ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={newActivity.calories}
                  onChangeText={(text) => setNewActivity({...newActivity, calories: text})}
                  placeholder="200"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Tipo de Actividad</ThemedText>
              <View style={styles.typeButtons}>
                {(['cardio', 'strength', 'flexibility', 'sports', 'other'] as const).map((type) => (
                  <Pressable
                    key={type}
                    style={[
                      styles.typeButton,
                      newActivity.type === type && styles.typeButtonActive
                    ]}
                    onPress={() => setNewActivity({...newActivity, type})}
                  >
                    <ThemedText style={[
                      styles.typeButtonText,
                      newActivity.type === type && styles.typeButtonTextActive
                    ]}>
                      {type === 'cardio' ? 'Cardio' :
                       type === 'strength' ? 'Fuerza' :
                       type === 'flexibility' ? 'Flexibilidad' :
                       type === 'sports' ? 'Deportes' : 'Otro'}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>
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
  weekRange: {
    fontSize: 16,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Espacio para la barra de navegación
  },
  alexaStatus: {
    margin: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  addButton: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    color: '#FF3B30',
    fontSize: 16,
  },
  saveButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 14,
  },
  typeButtonTextActive: {
    color: 'white',
  },
});
