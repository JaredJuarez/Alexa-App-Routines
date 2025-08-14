import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { authService } from '../services/authService';
import { ApiError, RegisterData } from '../types/auth';

export default function RegisterScreen() {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    phone: '',
    email: '',
    password: '',
    rol: {
      id: 1,
    },
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Omit<RegisterData, 'rol'>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Omit<RegisterData, 'rol'>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Teléfono inválido (10 dígitos)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authService.register(formData);
      
      if (response) {
        Alert.alert(
          'Éxito', 
          'Cuenta creada exitosamente', 
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(tabs)/../login' as any),
            },
          ]
        );
      }
    } catch (error) {
      const apiError = error as ApiError;
      Alert.alert('Error', apiError.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof Omit<RegisterData, 'rol'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Crear Cuenta
            </Text>
            <Text style={styles.subtitle}>
              Completa los datos para registrarte
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Nombre Completo
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.name ? styles.inputError : null
                ]}
                placeholder="Ingresa tu nombre completo"
                value={formData.name}
                onChangeText={(text) => updateFormData('name', text)}
                autoCapitalize="words"
                editable={!loading}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Teléfono
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.phone ? styles.inputError : null
                ]}
                placeholder="Ingresa tu teléfono"
                value={formData.phone}
                onChangeText={(text) => updateFormData('phone', text)}
                keyboardType="phone-pad"
                editable={!loading}
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.email ? styles.inputError : null
                ]}
                placeholder="Ingresa tu email"
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!loading}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Contraseña
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.password ? styles.inputError : null
                ]}
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChangeText={(text) => updateFormData('password', text)}
                secureTextEntry
                editable={!loading}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                loading ? styles.registerButtonDisabled : null
              ]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.registerButtonText}>
                  Crear Cuenta
                </Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity 
                onPress={() => router.push('/(tabs)/../login' as any)}
                disabled={loading}
              >
                <Text style={styles.loginLink}>
                  Iniciar Sesión
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#1f2937',
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  registerButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 24,
  },
  registerButtonDisabled: {
    backgroundColor: '#86efac',
  },
  registerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#6b7280',
  },
  loginLink: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
