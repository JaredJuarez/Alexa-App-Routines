import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { alexaService } from '../services/alexaService';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface AlexaStatusProps {
  style?: any;
}

export function AlexaStatus({ style }: AlexaStatusProps) {
  const [connectionStatus, setConnectionStatus] = useState({
    connected: false,
    lastSync: '',
    skillVersion: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkConnection();
    // Verificar conexión cada 30 segundos
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    try {
      const status = await alexaService.getConnectionStatus();
      setConnectionStatus(status);
    } catch (error) {
      console.error('Error checking Alexa connection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await checkConnection();
  };

  const handleViewHistory = () => {
    const history = alexaService.getInteractionHistory();
    const recentInteractions = history.slice(0, 5);
    
    const historyText = recentInteractions.length > 0 
      ? recentInteractions.map(interaction => 
          `• ${interaction.action} - ${interaction.success ? 'Éxito' : 'Fallo'} (${new Date(interaction.timestamp).toLocaleTimeString()})`
        ).join('\n')
      : 'No hay interacciones recientes';

    Alert.alert(
      'Historial de Alexa',
      `Últimas interacciones:\n\n${historyText}`,
      [{ text: 'Entendido', style: 'default' }]
    );
  };

  const formatLastSync = (syncTime: string) => {
    const diff = Date.now() - new Date(syncTime).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Hace un momento';
    if (minutes < 60) return `Hace ${minutes} min`;
    if (minutes < 1440) return `Hace ${Math.floor(minutes / 60)} h`;
    return 'Hace más de 24h';
  };

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, style]}>
        <IconSymbol name="speaker.wave.2" size={16} color="#999" />
        <ThemedText style={styles.loadingText}>Verificando conexión...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <Pressable 
      style={[styles.container, style]}
      onLongPress={handleViewHistory}
    >
      <View style={styles.statusRow}>
        <IconSymbol 
          name={connectionStatus.connected ? "speaker.wave.2.fill" : "speaker.slash.fill"} 
          size={16} 
          color={connectionStatus.connected ? "#00A8CC" : "#FF3B30"} 
        />
        <ThemedText style={[
          styles.statusText,
          { color: connectionStatus.connected ? "#00A8CC" : "#FF3B30" }
        ]}>
          {connectionStatus.connected ? 'Alexa Conectada' : 'Alexa Desconectada'}
        </ThemedText>
        <Pressable style={styles.refreshButton} onPress={handleRefresh}>
          <IconSymbol name="arrow.clockwise" size={14} color="#666" />
        </Pressable>
      </View>
      
      {connectionStatus.connected && (
        <ThemedText style={styles.syncText}>
          Última sync: {formatLastSync(connectionStatus.lastSync)}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
    flex: 1,
  },
  loadingText: {
    fontSize: 14,
    opacity: 0.7,
    marginLeft: 6,
  },
  syncText: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
    marginLeft: 22,
  },
  refreshButton: {
    padding: 4,
  },
});
