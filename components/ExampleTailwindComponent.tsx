import { Text, View } from 'react-native';
import { ThemedView } from './ThemedView';

interface ExampleTailwindComponentProps {
  title: string;
  subtitle?: string;
}

export function ExampleTailwindComponent({ title, subtitle }: ExampleTailwindComponentProps) {
  return (
    <ThemedView className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 m-4">
      {/* Usando clases de Tailwind en lugar de StyleSheet */}
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </Text>
      
      {subtitle && (
        <Text className="text-base text-gray-600 dark:text-gray-300 opacity-70">
          {subtitle}
        </Text>
      )}
      
      {/* Ejemplo de layout con Flexbox usando Tailwind */}
      <View className="flex-row justify-between items-center mt-4">
        <View className="flex-1 bg-blue-100 dark:bg-blue-900 rounded-lg p-3 mr-2">
          <Text className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Con Tailwind
          </Text>
          <Text className="text-xs text-blue-600 dark:text-blue-300 mt-1">
            Más rápido de escribir
          </Text>
        </View>
        
        <View className="flex-1 bg-green-100 dark:bg-green-900 rounded-lg p-3 ml-2">
          <Text className="text-sm font-medium text-green-800 dark:text-green-200">
            Sin CSS puro
          </Text>
          <Text className="text-xs text-green-600 dark:text-green-300 mt-1">
            Clases de utilidad
          </Text>
        </View>
      </View>
      
      {/* Ejemplo de botón con hover y estados activos */}
      <View className="mt-4">
        <View className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg px-4 py-3">
          <Text className="text-white text-center font-semibold">
            Botón con Tailwind
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}

// Ejemplo de cómo convertir StyleSheet a clases de Tailwind:

// ANTES (con StyleSheet):
/*
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    opacity: 0.7,
  }
});
*/

// AHORA (con Tailwind):
/*
<View className="bg-white rounded-xl shadow-lg p-4 m-4">
  <Text className="text-2xl font-bold text-gray-900 mb-2">Título</Text>
  <Text className="text-base text-gray-600 opacity-70">Subtítulo</Text>
</View>
*/
