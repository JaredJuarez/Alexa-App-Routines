import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getFullUrl } from '@/constants/Config';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

interface SugerenciaResponse {
  message: string;
  data: {
    extraDuracion: number;
    tipoEjercicio: string;
  };
  error: boolean;
  status: string;
}

interface Sugerencia {
  tipo: 'alto' | 'medio' | 'bajo';
  extraDuracion: number;
  tipoEjercicio: string;
}

export default function RoutinesScreen() {
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSugerencia, setSelectedSugerencia] = useState<Sugerencia | null>(null);

  useEffect(() => {
    loadSugerencias();
  }, []);

  const loadSugerencias = async () => {
    try {
      setLoading(true);
      const tipos: ('alto' | 'medio' | 'bajo')[] = ['alto', 'medio', 'bajo'];
      const sugerenciasData: Sugerencia[] = [];

      for (const tipo of tipos) {
        const url = getFullUrl(`/api/rutinas/sugerencia/${tipo}`);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data: SugerenciaResponse = await response.json();
          if (!data.error && data.data) {
            sugerenciasData.push({
              tipo,
              extraDuracion: data.data.extraDuracion,
              tipoEjercicio: data.data.tipoEjercicio,
            });
          }
        }
      }

      setSugerencias(sugerenciasData);
    } catch (error) {
      console.error('Error loading sugerencias:', error);
      Alert.alert('Error', 'No se pudieron cargar las sugerencias de rutinas');
    } finally {
      setLoading(false);
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'alto': return '#FF6B35';
      case 'medio': return '#FFA500';
      case 'bajo': return '#32CD32';
      default: return '#007AFF';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'alto': return 'Intensidad Alta';
      case 'medio': return 'Intensidad Media';
      case 'bajo': return 'Intensidad Baja';
      default: return tipo;
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>Cargando sugerencias...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Rutinas</ThemedText>
        <ThemedText style={styles.subtitle}>Sugerencias por intensidad</ThemedText>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="sparkles" size={24} color="#007AFF" />
            <ThemedText style={styles.sectionTitle}>Sugerencias de Alexa</ThemedText>
          </View>
          
          {sugerencias.map((sugerencia) => (
            <Pressable 
              key={sugerencia.tipo}
              style={styles.sugerenciaCard}
              onPress={() => setSelectedSugerencia(sugerencia)}
            >
              <View style={styles.sugerenciaHeader}>
                <View style={[styles.tipoBadge, { backgroundColor: getTipoColor(sugerencia.tipo) }]}>
                  <ThemedText style={styles.tipoText}>{getTipoLabel(sugerencia.tipo)}</ThemedText>
                </View>
                <View style={styles.duracionContainer}>
                  <IconSymbol name="clock" size={16} color="#666" />
                  <ThemedText style={styles.duracionText}>{sugerencia.extraDuracion} min</ThemedText>
                </View>
              </View>
              
              <ThemedText style={styles.ejercicioTitle}>{sugerencia.tipoEjercicio}</ThemedText>
              
              <View style={styles.cardFooter}>
                <ThemedText style={styles.tapToStart}>Toca para ver detalles</ThemedText>
                <IconSymbol name="chevron.right" size={16} color="#007AFF" />
              </View>
            </Pressable>
          ))}
        </View>

        {sugerencias.length === 0 && (
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="figure.strengthtraining.traditional" size={64} color="#ccc" />
            <ThemedText style={styles.emptyTitle}>Sin sugerencias disponibles</ThemedText>
            <ThemedText style={styles.emptyText}>
              No se pudieron cargar las sugerencias de rutinas en este momento
            </ThemedText>
          </ThemedView>
        )}
      </ScrollView>

      {/* Modal de detalle de sugerencia */}
      <Modal
        visible={selectedSugerencia !== null}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setSelectedSugerencia(null)}>
              <ThemedText style={styles.closeButton}>Cerrar</ThemedText>
            </Pressable>
            <ThemedText style={styles.modalTitle}>Detalle de Rutina</ThemedText>
            <View style={styles.placeholder} />
          </View>

          {selectedSugerencia && (
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View style={[styles.tipoBadgeLarge, { backgroundColor: getTipoColor(selectedSugerencia.tipo) }]}>
                    <ThemedText style={styles.tipoTextLarge}>{getTipoLabel(selectedSugerencia.tipo)}</ThemedText>
                  </View>
                </View>

                <ThemedText style={styles.detailTitle}>{selectedSugerencia.tipoEjercicio}</ThemedText>

                <View style={styles.detailSection}>
                  <ThemedText style={styles.detailLabel}>Duración estimada:</ThemedText>
                  <View style={styles.duracionDetailContainer}>
                    <IconSymbol name="clock" size={20} color="#007AFF" />
                    <ThemedText style={styles.duracionDetailText}>{selectedSugerencia.extraDuracion} minutos</ThemedText>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <ThemedText style={styles.detailLabel}>Tipo de intensidad:</ThemedText>
                  <ThemedText style={styles.detailText}>
                    {selectedSugerencia.tipo === 'alto' && 'Rutina de alta intensidad para máximo rendimiento'}
                    {selectedSugerencia.tipo === 'medio' && 'Rutina de intensidad moderada para equilibrio'}
                    {selectedSugerencia.tipo === 'bajo' && 'Rutina de baja intensidad para principiantes'}
                  </ThemedText>
                </View>

                <View style={styles.infoCard}>
                  <IconSymbol name="info.circle" size={24} color="#007AFF" />
                  <ThemedText style={styles.infoText}>
                    Esta rutina ha sido generada por Alexa basándose en recomendaciones de ejercicio para tu nivel.
                  </ThemedText>
                </View>
              </View>
            </ScrollView>
          )}
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
    paddingTop: 80,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
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
  sugerenciaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sugerenciaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tipoText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  duracionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  duracionText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  ejercicioTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tapToStart: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
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
  closeButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 60,
  },
  modalScrollView: {
    flex: 1,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tipoBadgeLarge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tipoTextLarge: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  detailSection: {
    marginBottom: 20,
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
  duracionDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5F3FF',
    padding: 12,
    borderRadius: 8,
  },
  duracionDetailText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#007AFF',
  },
  infoCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
    color: '#1F2937',
  },
});
