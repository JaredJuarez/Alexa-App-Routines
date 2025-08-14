import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { authService } from '../services/authService';

export default function SplashScreen() {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Simular tiempo de carga mínimo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const isAuthenticated = await authService.isAuthenticated();
      
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo o icono de la app */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🎙️</Text>
        </View>
        
        {/* Título de la app */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Alexa Routines
          </Text>
          <Text style={styles.subtitle}>
            Gestiona tus rutinas de manera inteligente
          </Text>
        </View>

        {/* Indicador de carga */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>
            Iniciando aplicación...
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>
          Versión 1.0.0
        </Text>
        <Text style={styles.creditText}>
          UTEZ - Desarrollo para Dispositivos Inteligentes
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#667eea',
  },
  content: {
    alignItems: 'center',
    gap: 32,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  logoEmoji: {
    fontSize: 48,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 16,
    marginTop: 32,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 64,
    alignItems: 'center',
  },
  versionText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  creditText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    marginTop: 4,
  },
});
