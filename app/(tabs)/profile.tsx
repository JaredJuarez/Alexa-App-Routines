import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getFullUrl } from '@/constants/Config';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { authService } from '../../services/authService';

interface UserProfile {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  status: boolean;
  rol: {
    id: number;
    name: string;
  };
}

interface UserProfileResponse {
  message: string;
  data: UserProfile;
  error: boolean;
  status: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userId = await authService.getUserId();
      if (!userId) {
        Alert.alert('Error', 'No se pudo obtener la información del usuario');
        return;
      }

      const url = getFullUrl(`/api/auth/${userId}`);
      const response = await fetch(url);
      const data: UserProfileResponse = await response.json();

      if (data.error === false && data.data) {
        setProfile(data.data);
      } else {
        Alert.alert('Error', data.message || 'No se pudo cargar el perfil');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'No se pudo cargar el perfil del usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    Alert.alert('Información', 'La funcionalidad de edición estará disponible próximamente');
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await authService.logout();
            router.replace('/login');
          },
        },
      ]
    );
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

  const bmi = 23.5; // Valor temporal hasta que tengamos weight/height del API
  const bmiCategory = getBMICategory(bmi);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>Cargando perfil...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (!profile) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>No se pudo cargar el perfil</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <IconSymbol name="person.crop.circle.fill" size={80} color="#007AFF" />
        </View>
        <ThemedText style={styles.name}>{profile.name}</ThemedText>
        <ThemedText style={styles.email}>{profile.email}</ThemedText>
        {/* <Pressable style={styles.editButton} onPress={() => setShowEditModal(true)}>
          <IconSymbol name="pencil" size={16} color="#007AFF" />
          <ThemedText style={styles.editButtonText}>Editar Perfil</ThemedText>
        </Pressable> */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol name="arrow.right.square" size={16} color="#FF3B30" />
          <ThemedText style={styles.logoutButtonText}>Cerrar Sesión</ThemedText>
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
              <IconSymbol name="person" size={20} color="#666" />
              <View>
                <ThemedText style={styles.infoLabel}>ID Usuario</ThemedText>
                <ThemedText style={styles.infoValue}>{profile.id}</ThemedText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <IconSymbol name="phone" size={20} color="#666" />
              <View>
                <ThemedText style={styles.infoLabel}>Teléfono</ThemedText>
                <ThemedText style={styles.infoValue}>{profile.phone}</ThemedText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <IconSymbol name="person.badge.shield.checkmark" size={20} color="#666" />
              <View>
                <ThemedText style={styles.infoLabel}>Rol</ThemedText>
                <ThemedText style={styles.infoValue}>{profile.rol.name}</ThemedText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <IconSymbol name="checkmark.circle" size={20} color="#666" />
              <View>
                <ThemedText style={styles.infoLabel}>Estado</ThemedText>
                <ThemedText style={[styles.infoValue, { color: profile.status ? '#4CAF50' : '#F44336' }]}>
                  {profile.status ? 'Activo' : 'Inactivo'}
                </ThemedText>
              </View>
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
                Tu perfil está sincronizado con Alexa para gestionar rutinas de entrenamiento
              </ThemedText>
            </View>
            <View style={styles.alexaIndicator} />
          </View>
          
          <View style={styles.alexaFeatures}>
            <ThemedText style={styles.alexaFeaturesTitle}>Funcionalidades disponibles:</ThemedText>
            <View style={styles.alexaFeatureItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color="#4CAF50" />
              <ThemedText style={styles.alexaFeatureText}>Crear rutinas por voz</ThemedText>
            </View>
            <View style={styles.alexaFeatureItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color="#4CAF50" />
              <ThemedText style={styles.alexaFeatureText}>Seguimiento de actividades</ThemedText>
            </View>
            <View style={styles.alexaFeatureItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color="#4CAF50" />
              <ThemedText style={styles.alexaFeatureText}>Recordatorios personalizados</ThemedText>
            </View>
          </View>
        </ThemedView>
      </ScrollView>

      {/* Modal simplificado para futuras funcionalidades */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowEditModal(false)}>
              <ThemedText style={styles.cancelButton}>Cerrar</ThemedText>
            </Pressable>
            <ThemedText style={styles.modalTitle}>Configuración</ThemedText>
            <View style={{ width: 60 }} />
          </View>
          
          <View style={styles.modalContent}>
            <ThemedText style={styles.comingSoonText}>
              La funcionalidad de edición de perfil estará disponible próximamente.
            </ThemedText>
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
    marginTop: 12,
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.7,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
  },
  alexaFeatures: {
    marginTop: 16,
  },
  alexaFeaturesTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    opacity: 0.8,
  },
  alexaFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  alexaFeatureText: {
    fontSize: 14,
    opacity: 0.8,
  },
  comingSoonText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
});
