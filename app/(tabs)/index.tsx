import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { WeekStats } from '@/components/WeekStats';
import { getFullUrl } from '@/constants/Config';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { authService } from '../../services/authService';

interface Rutina {
  id: number;
  ejercicio: string;
  type: string;
  calorias: number;
  description: string;
}

interface RutinasResponse {
  message: string;
  data: Rutina[];
  error: boolean;
  status: string;
}

interface NewRoutine {
  ejercicio: string;
  type: string;
  calorias: string;
  description: string;
}

export default function CurrentWeekScreen() {
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRutina, setSelectedRutina] = useState<Rutina | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [newRoutine, setNewRoutine] = useState<NewRoutine>({
    ejercicio: '',
    type: '',
    calorias: '',
    description: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      loadRutinas();
    }
  }, [userId]);

  const loadUserData = async () => {
    const role = await authService.getRole();
    const id = await authService.getUserId();
    setUserRole(role);
    setUserId(id);
  };

  const loadRutinas = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const url = getFullUrl('/api/rutinas/All');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });

      const data: RutinasResponse = await response.json();

      if (data.error === false && data.data) {
        setRutinas(data.data);
      } else {
        console.error('Error loading rutinas:', data.message);
      }
    } catch (error) {
      console.error('Error fetching rutinas:', error);
      Alert.alert('Error', 'No se pudieron cargar las rutinas');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoutine = async () => {
    if (!newRoutine.ejercicio.trim() || !newRoutine.type.trim()) {
      Alert.alert('Error', 'Por favor completa al menos el ejercicio y el tipo');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'No se pudo obtener el ID del usuario');
      return;
    }

    try {
      const url = getFullUrl(`/api/rutinas/${userId}`);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ejercicio: newRoutine.ejercicio,
          type: newRoutine.type,
          calorias: parseFloat(newRoutine.calorias) || 0,
          description: newRoutine.description
        }),
      });

      if (response.ok) {
        setNewRoutine({ ejercicio: '', type: '', calorias: '', description: '' });
        setShowAddModal(false);
        Alert.alert('¡Éxito!', 'Rutina agregada correctamente');
        // Recargar las rutinas
        loadRutinas();
      } else {
        Alert.alert('Error', 'No se pudo agregar la rutina');
      }
    } catch (error) {
      console.error('Error adding routine:', error);
      Alert.alert('Error', 'No se pudo agregar la rutina');
    }
  };

  const handleDeleteRutina = async (rutinaId: number) => {
    if (!userId) {
      Alert.alert('Error', 'No se pudo obtener el ID del usuario');
      return;
    }

    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta rutina?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const url = getFullUrl(`/api/rutinas/${rutinaId}`);
              const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (response.ok) {
                setShowDetailModal(false);
                setSelectedRutina(null);
                Alert.alert('¡Éxito!', 'Rutina eliminada correctamente');
                // Recargar las rutinas
                loadRutinas();
              } else {
                Alert.alert('Error', 'No se pudo eliminar la rutina');
              }
            } catch (error) {
              console.error('Error deleting routine:', error);
              Alert.alert('Error', 'No se pudo eliminar la rutina');
            }
          },
        },
      ]
    );
  };

  const handleRutinaPress = (rutina: Rutina) => {
    setSelectedRutina(rutina);
    setShowDetailModal(true);
  };

  // Calcular estadísticas de las rutinas
  const totalCalories = rutinas.reduce((sum: number, rutina: Rutina) => sum + rutina.calorias, 0);
  const totalRoutines = rutinas.length;

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>Cargando rutinas...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.title}>
            Mis Rutinas
          </ThemedText>
          <ThemedText style={styles.dateRange}>
            Gestiona tus rutinas de entrenamiento
          </ThemedText>
          {userRole && (
            <ThemedText style={styles.userInfo}>
              Rol: {userRole}
            </ThemedText>
          )}
          {userId && (
            <ThemedText style={styles.userInfo}>
              ID Usuario: {userId}
            </ThemedText>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WeekStats
          totalDuration={0} // No tenemos duración en rutinas
          totalCalories={totalCalories}
          completedActivities={totalRoutines}
          totalActivities={totalRoutines}
        />

        <View style={styles.activitiesHeader}>
          <ThemedText style={styles.activitiesTitle}>Rutinas</ThemedText>
          <Pressable 
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <IconSymbol name="plus.circle.fill" size={24} color="#007AFF" />
          </Pressable>
        </View>

        {rutinas.length === 0 ? (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>No tienes rutinas aún</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Presiona el botón + para crear tu primera rutina
            </ThemedText>
          </View>
        ) : (
          rutinas.map((rutina) => (
            <Pressable 
              key={rutina.id} 
              style={styles.rutinaCard}
              onPress={() => handleRutinaPress(rutina)}
            >
              <View style={styles.rutinaHeader}>
                <ThemedText style={styles.rutinaTitle}>{rutina.ejercicio}</ThemedText>
                <ThemedText style={styles.rutinaType}>{rutina.type}</ThemedText>
              </View>
              <ThemedText style={styles.rutinaDescription}>{rutina.description}</ThemedText>
              <View style={styles.rutinaStats}>
                <View style={styles.rutinaStat}>
                  <IconSymbol name="flame" size={16} color="#FF6B35" />
                  <ThemedText style={styles.rutinaStatText}>{rutina.calorias} cal</ThemedText>
                </View>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>

      {/* Modal para agregar rutina */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Nueva Rutina</Text>
            <Pressable onPress={handleAddRoutine}>
              <Text style={styles.saveButton}>Guardar</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.modalScrollView}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Ejercicio *</Text>
              <TextInput
                style={styles.textInput}
                value={newRoutine.ejercicio}
                onChangeText={(text) => setNewRoutine({...newRoutine, ejercicio: text})}
                placeholder="Ej. Flexiones"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Descripción</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newRoutine.description}
                onChangeText={(text) => setNewRoutine({...newRoutine, description: text})}
                placeholder="Describe tu rutina..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroupFlex}>
                <Text style={styles.inputLabel}>Calorías *</Text>
                <TextInput
                  style={styles.textInput}
                  value={newRoutine.calorias}
                  onChangeText={(text) => setNewRoutine({...newRoutine, calorias: text})}
                  placeholder="200"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tipo de Rutina</Text>
              <View style={styles.activityTypes}>
                {(['cardio', 'strength', 'flexibility', 'sports', 'other'] as const).map((type) => (
                  <Pressable
                    key={type}
                    style={[
                      styles.activityTypeButton,
                      newRoutine.type === type ? styles.activityTypeButtonSelected : null
                    ]}
                    onPress={() => setNewRoutine({...newRoutine, type})}
                  >
                    <Text style={[
                      styles.activityTypeText,
                      newRoutine.type === type ? styles.activityTypeTextSelected : null
                    ]}>
                      {type === 'cardio' ? 'Cardio' :
                       type === 'strength' ? 'Fuerza' :
                       type === 'flexibility' ? 'Flexibilidad' :
                       type === 'sports' ? 'Deportes' : 'Otro'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>
        </ThemedView>
      </Modal>

      {/* Modal para ver detalles y eliminar rutina */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowDetailModal(false)}>
              <Text style={styles.cancelButton}>Cerrar</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Detalle de Rutina</Text>
            <Pressable 
              onPress={() => selectedRutina && handleDeleteRutina(selectedRutina.id)}
              style={styles.deleteButtonContainer}
            >
              <Text style={styles.deleteButton}>Eliminar</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.modalScrollView}>
            {selectedRutina && (
              <>
                <View style={styles.detailCard}>
                  <View style={styles.detailHeader}>
                    <ThemedText style={styles.detailTitle}>{selectedRutina.ejercicio}</ThemedText>
                    <View style={styles.detailTypeContainer}>
                      <ThemedText style={styles.detailType}>{selectedRutina.type}</ThemedText>
                    </View>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Descripción:</Text>
                    <ThemedText style={styles.detailText}>
                      {selectedRutina.description || 'Sin descripción'}
                    </ThemedText>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Calorías quemadas:</Text>
                    <View style={styles.caloriesContainer}>
                      <IconSymbol name="flame" size={20} color="#FF6B35" />
                      <ThemedText style={styles.caloriesText}>{selectedRutina.calorias} cal</ThemedText>
                    </View>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>ID de rutina:</Text>
                    <ThemedText style={styles.detailText}>#{selectedRutina.id}</ThemedText>
                  </View>
                </View>

                <View style={styles.warningCard}>
                  <IconSymbol name="exclamationmark.triangle" size={24} color="#FF6B35" />
                  <ThemedText style={styles.warningText}>
                    Al eliminar esta rutina, se perderá toda la información asociada y no se podrá recuperar.
                  </ThemedText>
                </View>
              </>
            )}
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
    padding: 5,
    paddingTop: 80,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateRange: {
    fontSize: 16,
    opacity: 0.7,
  },
  userInfo: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  activitiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  activitiesTitle: {
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
    borderBottomColor: '#D1D5DB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    color: '#EF4444',
    fontSize: 16,
  },
  saveButton: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  modalScrollView: {
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
  inputGroupFlex: {
    flex: 1,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    height: 80,
  },
  activityTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  activityTypeButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  activityTypeText: {
    fontSize: 14,
    color: '#374151',
  },
  activityTypeTextSelected: {
    color: 'white',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.6,
  },
  rutinaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rutinaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rutinaTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  rutinaType: {
    fontSize: 12,
    backgroundColor: '#E5F3FF',
    color: '#0066CC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    textTransform: 'capitalize',
  },
  rutinaDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  rutinaStats: {
    flexDirection: 'row',
  },
  rutinaStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rutinaStatText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
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
  deleteButtonContainer: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    marginRight: 12,
  },
  detailTypeContainer: {
    backgroundColor: '#E5F3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  detailType: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  detailSection: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3F2',
    padding: 12,
    borderRadius: 8,
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#DC2626',
  },
  warningCard: {
    backgroundColor: '#FEF3F2',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
    color: '#DC2626',
  },
});
