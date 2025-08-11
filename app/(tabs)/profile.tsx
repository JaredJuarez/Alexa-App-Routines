import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { mockUserProfile } from '@/data/mockData';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(mockUserProfile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(profile);

  const handleSaveProfile = () => {
    setProfile(editingProfile);
    setShowEditModal(false);
    Alert.alert('¡Perfil actualizado!', 'Los cambios han sido guardados correctamente.');
  };

  const getFitnessLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return level;
    }
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Bajo peso', color: '#FF9800' };
    if (bmi < 25) return { text: 'Normal', color: '#4CAF50' };
    if (bmi < 30) return { text: 'Sobrepeso', color: '#FF9800' };
    return { text: 'Obesidad', color: '#F44336' };
  };

  const bmi = parseFloat(calculateBMI(profile.weight, profile.height));
  const bmiCategory = getBMICategory(bmi);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <IconSymbol name="person.crop.circle.fill" size={80} color="#007AFF" />
        </View>
        <ThemedText style={styles.name}>{profile.name}</ThemedText>
        <ThemedText style={styles.email}>{profile.email}</ThemedText>
        <Pressable style={styles.editButton} onPress={() => setShowEditModal(true)}>
          <IconSymbol name="pencil" size={16} color="#007AFF" />
          <ThemedText style={styles.editButtonText}>Editar Perfil</ThemedText>
        </Pressable>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Información Personal */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información Personal</ThemedText>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <IconSymbol name="calendar" size={20} color="#666" />
              <View>
                <ThemedText style={styles.infoLabel}>Edad</ThemedText>
                <ThemedText style={styles.infoValue}>{profile.age} años</ThemedText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <IconSymbol name="ruler" size={20} color="#666" />
              <View>
                <ThemedText style={styles.infoLabel}>Altura</ThemedText>
                <ThemedText style={styles.infoValue}>{profile.height} cm</ThemedText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <IconSymbol name="scalemass" size={20} color="#666" />
              <View>
                <ThemedText style={styles.infoLabel}>Peso</ThemedText>
                <ThemedText style={styles.infoValue}>{profile.weight} kg</ThemedText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <IconSymbol name="heart.text.square" size={20} color="#666" />
              <View>
                <ThemedText style={styles.infoLabel}>IMC</ThemedText>
                <ThemedText style={[styles.infoValue, { color: bmiCategory.color }]}>
                  {bmi} - {bmiCategory.text}
                </ThemedText>
              </View>
            </View>
          </View>
        </ThemedView>

        {/* Nivel de Fitness */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Nivel de Fitness</ThemedText>
          <View style={styles.fitnessLevel}>
            <IconSymbol name="figure.strengthtraining.traditional" size={24} color="#007AFF" />
            <ThemedText style={styles.fitnessLevelText}>
              {getFitnessLevelText(profile.fitnessLevel)}
            </ThemedText>
          </View>
        </ThemedView>

        {/* Objetivos */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Objetivos</ThemedText>
          <View style={styles.goalsList}>
            {profile.goals.map((goal, index) => (
              <View key={index} style={styles.goalItem}>
                <IconSymbol name="target" size={16} color="#4CAF50" />
                <ThemedText style={styles.goalText}>{goal}</ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>

        {/* Preferencias */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Preferencias de Entrenamiento</ThemedText>
          
          <View style={styles.preferenceItem}>
            <ThemedText style={styles.preferenceLabel}>Tipos de ejercicio preferidos:</ThemedText>
            <View style={styles.preferenceList}>
              {profile.preferences.workoutTypes.map((type, index) => (
                <View key={index} style={styles.preferenceTag}>
                  <ThemedText style={styles.preferenceTagText}>
                    {type === 'cardio' ? 'Cardio' : type === 'strength' ? 'Fuerza' : type}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.preferenceItem}>
            <ThemedText style={styles.preferenceLabel}>Tiempo disponible por día:</ThemedText>
            <ThemedText style={styles.preferenceValue}>{profile.preferences.availableTime} minutos</ThemedText>
          </View>

          <View style={styles.preferenceItem}>
            <ThemedText style={styles.preferenceLabel}>Días de entrenamiento:</ThemedText>
            <View style={styles.preferenceList}>
              {profile.preferences.workoutDays.map((day, index) => (
                <View key={index} style={styles.preferenceTag}>
                  <ThemedText style={styles.preferenceTagText}>{day}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </ThemedView>

        {/* Conexión con Alexa */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Conexión con Alexa</ThemedText>
          <View style={styles.alexaStatus}>
            <IconSymbol name="speaker.wave.2.fill" size={24} color="#00A8CC" />
            <View style={styles.alexaInfo}>
              <ThemedText style={styles.alexaStatusText}>Conectado</ThemedText>
              <ThemedText style={styles.alexaStatusSubtext}>
                Tu perfil está sincronizado con Alexa
              </ThemedText>
            </View>
            <View style={styles.alexaIndicator} />
          </View>
        </ThemedView>
      </ScrollView>

      {/* Modal de edición */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowEditModal(false)}>
              <ThemedText style={styles.cancelButton}>Cancelar</ThemedText>
            </Pressable>
            <ThemedText style={styles.modalTitle}>Editar Perfil</ThemedText>
            <Pressable onPress={handleSaveProfile}>
              <ThemedText style={styles.saveButton}>Guardar</ThemedText>
            </Pressable>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Nombre</ThemedText>
              <TextInput
                style={styles.textInput}
                value={editingProfile.name}
                onChangeText={(text) => setEditingProfile({...editingProfile, name: text})}
                placeholder="Tu nombre"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Edad</ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={editingProfile.age.toString()}
                  onChangeText={(text) => setEditingProfile({...editingProfile, age: parseInt(text) || 0})}
                  placeholder="25"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Altura (cm)</ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={editingProfile.height.toString()}
                  onChangeText={(text) => setEditingProfile({...editingProfile, height: parseInt(text) || 0})}
                  placeholder="175"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Peso (kg)</ThemedText>
              <TextInput
                style={styles.textInput}
                value={editingProfile.weight.toString()}
                onChangeText={(text) => setEditingProfile({...editingProfile, weight: parseInt(text) || 0})}
                placeholder="70"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Tiempo disponible por día (minutos)</ThemedText>
              <TextInput
                style={styles.textInput}
                value={editingProfile.preferences.availableTime.toString()}
                onChangeText={(text) => setEditingProfile({
                  ...editingProfile, 
                  preferences: {
                    ...editingProfile.preferences,
                    availableTime: parseInt(text) || 0
                  }
                })}
                placeholder="60"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 80, // Aumentado de 60 a 80 para más espacio
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Espacio para la barra de navegación
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  fitnessLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fitnessLevelText: {
    fontSize: 18,
    fontWeight: '500',
  },
  goalsList: {
    gap: 12,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalText: {
    fontSize: 16,
  },
  preferenceItem: {
    marginBottom: 16,
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  preferenceValue: {
    fontSize: 16,
  },
  preferenceList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  preferenceTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  preferenceTagText: {
    fontSize: 14,
    color: '#1976D2',
  },
  alexaStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alexaInfo: {
    flex: 1,
  },
  alexaStatusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4CAF50',
  },
  alexaStatusSubtext: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  alexaIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
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
});
