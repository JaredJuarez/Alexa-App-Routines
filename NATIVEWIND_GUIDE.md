# Guía de NativeWind (Tailwind CSS) en React Native

## ¿Qué es NativeWind?
NativeWind permite usar clases de utilidad de Tailwind CSS directamente en componentes de React Native, eliminando la necesidad de escribir StyleSheet.

## Cómo usar NativeWind

### 1. Clases básicas de layout
```jsx
// Flexbox
<View className="flex-1 flex-row justify-center items-center">

// Padding y Margin
<View className="p-4 m-2 px-6 py-3">

// Tamaños
<View className="w-full h-20 w-32">
```

### 2. Colores y backgrounds
```jsx
// Backgrounds
<View className="bg-blue-500 bg-white bg-gray-100">

// Colores de texto
<Text className="text-blue-600 text-white text-gray-900">

// Opacidad
<View className="bg-black opacity-50">
```

### 3. Tipografía
```jsx
<Text className="text-xl font-bold text-center">
<Text className="text-sm font-medium">
<Text className="text-base font-normal">
```

### 4. Bordes y sombras
```jsx
<View className="rounded-lg border border-gray-300 shadow-lg">
<View className="rounded-xl border-2 border-blue-500">
```

### 5. Espaciado
```jsx
// Margin: m-0, m-1, m-2, m-3, m-4, m-5, m-6, m-8, m-10, m-12, m-16, etc.
// Padding: p-0, p-1, p-2, p-3, p-4, p-5, p-6, p-8, p-10, p-12, p-16, etc.

<View className="mt-4 mb-2 ml-3 mr-1">  // margin específico
<View className="pt-6 pb-4 pl-2 pr-2">  // padding específico
```

### 6. Modo oscuro
```jsx
<View className="bg-white dark:bg-gray-800">
<Text className="text-gray-900 dark:text-white">
```

## Equivalencias comunes

### StyleSheet -> Tailwind
```jsx
// ANTES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1f2937',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  }
});

// AHORA
<View className="flex-1 bg-white p-4 mx-4">
  <Text className="text-2xl font-bold text-center mb-4 text-gray-900">
    Título
  </Text>
  <Pressable className="bg-blue-500 px-4 py-3 rounded-lg items-center">
    <Text className="text-white text-base font-semibold">
      Botón
    </Text>
  </Pressable>
</View>
```

## Clases útiles para la app de fitness

### Cards
```jsx
<View className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 m-4">
```

### Botones primarios
```jsx
<Pressable className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg px-6 py-3">
  <Text className="text-white text-center font-semibold">Acción</Text>
</Pressable>
```

### Iconos con texto
```jsx
<View className="flex-row items-center space-x-2">
  <IconSymbol name="clock" size={16} />
  <Text className="text-sm text-gray-600">30 min</Text>
</View>
```

### Badges/Etiquetas
```jsx
<View className="bg-green-100 px-3 py-1 rounded-full">
  <Text className="text-green-800 text-xs font-medium">Completado</Text>
</View>
```

### Headers
```jsx
<View className="pt-20 pb-4 px-5 items-center">
  <Text className="text-3xl font-bold text-gray-900 mb-1">Título</Text>
  <Text className="text-base text-gray-600">Subtítulo</Text>
</View>
```

## Beneficios de usar NativeWind
- ✅ No más StyleSheet.create()
- ✅ Clases reutilizables y consistentes
- ✅ Soporte para modo oscuro automático
- ✅ Menos código CSS personalizado
- ✅ Desarrollo más rápido
- ✅ Fácil mantenimiento

## Notas importantes
- Usa `className` en lugar de `style` para NativeWind
- Puedes combinar `className` y `style` si es necesario
- El modo oscuro se activa automáticamente con `dark:` prefijo
- Todas las clases de Tailwind CSS están disponibles
