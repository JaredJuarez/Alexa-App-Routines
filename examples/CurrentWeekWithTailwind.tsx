import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Pressable, View } from 'react-native';

// Ejemplo: Convertir el header de la pantalla principal usando NativeWind

export default function CurrentWeekScreenWithTailwind() {
  return (
    <ThemedView className="flex-1">
      {/* Header con Tailwind - antes usaba styles.header */}
      <View className="px-5 pt-20 pb-4 items-center">
        <ThemedText className="text-3xl font-bold mb-1">
          Semana Actual
        </ThemedText>
        <ThemedText className="text-base opacity-70">
          2025-08-11 - 2025-08-17
        </ThemedText>
      </View>

      {/* Sección con botón de agregar - antes usaba styles.sectionHeader */}
      <View className="flex-row justify-between items-center mx-4 my-4">
        <ThemedText className="text-xl font-semibold">
          Actividades
        </ThemedText>
        <Pressable className="p-1">
          <IconSymbol name="plus.circle.fill" size={24} color="#007AFF" />
        </Pressable>
      </View>

      {/* Ejemplo de tarjeta usando Tailwind */}
      <View className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mx-4 mb-4">
        <View className="flex-row items-center mb-2">
          <View className="w-12 h-12 bg-red-500 rounded-full items-center justify-center mr-3">
            <IconSymbol name="heart.fill" size={24} color="white" />
          </View>
          <View className="flex-1">
            <ThemedText className="text-base font-semibold mb-1">
              Rutina matutina de cardio
            </ThemedText>
            <ThemedText className="text-sm opacity-70">
              Lun, 11 Aug
            </ThemedText>
          </View>
          <View className="bg-green-500 rounded-full p-1">
            <IconSymbol name="checkmark.circle.fill" size={20} color="white" />
          </View>
        </View>
        
        <ThemedText className="text-sm opacity-80 mb-3 leading-5">
          Corrida ligera en el parque con Alexa
        </ThemedText>
        
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <IconSymbol name="clock" size={16} color="#666" />
            <ThemedText className="text-xs ml-1 opacity-80">30 min</ThemedText>
          </View>
          <View className="flex-row items-center">
            <IconSymbol name="flame" size={16} color="#FF6B6B" />
            <ThemedText className="text-xs ml-1 opacity-80">250 cal</ThemedText>
          </View>
          <View className="flex-row items-center">
            <IconSymbol name="speaker.wave.2" size={16} color="#007AFF" />
            <ThemedText className="text-xs ml-1 opacity-80">Alexa</ThemedText>
          </View>
        </View>
      </View>

      {/* Ejemplo de botón primario */}
      <View className="mx-4">
        <Pressable className="bg-blue-500 active:bg-blue-600 rounded-lg py-3 px-6 items-center">
          <ThemedText className="text-white text-base font-semibold">
            Agregar Nueva Actividad
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

/*
COMPARACIÓN: ANTES vs AHORA

ANTES (con StyleSheet):
const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

AHORA (con Tailwind):
<View className="px-5 pt-20 pb-4 items-center">
<ThemedText className="text-3xl font-bold mb-1">
<View className="flex-row justify-between items-center mx-4 my-4">

BENEFICIOS:
✅ Menos líneas de código
✅ Clases reutilizables
✅ No hay que inventar nombres para los estilos
✅ Responsive automático
✅ Soporte para modo oscuro con dark: prefix
✅ Consistencia visual automática
*/
