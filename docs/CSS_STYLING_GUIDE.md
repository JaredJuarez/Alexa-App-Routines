# Guía de Estilos CSS - Alexa App Routines

Esta aplicación utiliza **NativeWind** (Tailwind CSS para React Native) para el styling, eliminando la necesidad de objetos `StyleSheet`.

## 🎨 **Ventajas de usar CSS sobre StyleSheet**

### ✅ **Beneficios:**
- **Más legible**: Clases CSS intuitivas
- **Menos código**: No necesidad de objetos StyleSheet separados
- **Consistencia**: Misma sintaxis que desarrollo web
- **Responsive**: Clases responsive integradas
- **Mantenimiento**: Más fácil de mantener y actualizar

### ❌ **StyleSheet (Antes):**
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8
  }
});

<View style={styles.container}>
  <TouchableOpacity style={styles.button}>
```

### ✅ **CSS con NativeWind (Ahora):**
```tsx
<View className="flex-1 bg-white">
  <TouchableOpacity className="bg-blue-600 px-5 py-3 rounded-lg">
```

## 📱 **Pantallas Actualizadas**

### **1. Login Screen (`app/login.tsx`)**
```css
/* Contenedor principal */
className="flex-1 bg-white"

/* Header */
className="items-center mb-8"
className="text-3xl font-bold text-gray-800 mb-2"

/* Inputs */
className="border rounded-lg px-4 py-3 text-gray-800"
className="border-red-500 bg-red-50" /* Estado de error */

/* Botones */
className="rounded-lg py-4 mt-6 bg-blue-600"
className="text-white text-center font-semibold text-lg"
```

### **2. Register Screen (`app/register.tsx`)**
```css
/* Misma estructura que Login con colores diferentes */
className="bg-green-600" /* Botón registro */
className="text-gray-700 text-sm font-medium mb-2" /* Labels */
```

### **3. Main Screen (`app/(tabs)/index.tsx`)**
```css
/* Header con usuario */
className="p-5 pt-20"
className="flex-row justify-between items-start"
className="text-2xl font-bold mb-1"

/* Sección de actividades */
className="flex-row justify-between items-center mx-4 my-4"
className="text-xl font-semibold"

/* Modal */
className="flex-row justify-between items-center p-4 pt-15 border-b border-gray-200"
className="flex-row gap-4 mb-5" /* Inputs en fila */
className="flex-row flex-wrap gap-2" /* Botones de tipo */
```

### **4. Splash Screen (`app/index.tsx`)**
```css
/* Fondo con gradiente */
className="flex-1 justify-center items-center"
style={{ backgroundColor: '#667eea' }} /* Fallback para gradiente */

/* Logo circular */
className="bg-white/20 p-8 rounded-full items-center justify-center"

/* Textos */
className="text-white text-3xl font-bold"
className="text-white/80 text-lg text-center"
```

## 🎯 **Clases CSS Más Utilizadas**

### **Layout:**
```css
flex-1          /* flex: 1 */
justify-center  /* justifyContent: 'center' */
items-center    /* alignItems: 'center' */
flex-row        /* flexDirection: 'row' */
```

### **Spacing:**
```css
p-4, px-4, py-4    /* padding */
m-4, mx-4, my-4    /* margin */
gap-4              /* gap entre elementos flex */
```

### **Colors:**
```css
bg-white, bg-blue-600, bg-gray-50
text-white, text-gray-800, text-red-500
border-gray-300, border-red-500
```

### **Typography:**
```css
text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl
font-medium, font-semibold, font-bold
```

### **Borders & Radius:**
```css
border, border-gray-300
rounded, rounded-lg, rounded-full
```

### **Effects:**
```css
opacity-70      /* opacity: 0.7 */
bg-white/20     /* backgroundColor con transparencia */
```

## 🔧 **Casos Especiales**

### **Propiedades no soportadas por NativeWind:**
Algunas propiedades específicas de React Native requieren `style` inline:
```tsx
// ✅ Para propiedades específicas de RN
<TextInput 
  className="border rounded-lg p-3"
  style={{ textAlignVertical: 'top' }} 
/>

// ✅ Para propiedades complejas
<ScrollView 
  className="flex-1"
  contentContainerStyle={{ paddingBottom: 100 }}
/>
```

## 🚀 **Best Practices**

1. **Usar className primero**, style solo cuando sea necesario
2. **Grupos de clases relacionadas**: `className="flex-1 bg-white p-4"`
3. **Estados condicionales**: 
   ```tsx
   className={`border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
   ```
4. **Mantener consistencia** en spacing y colores
5. **Aprovechar las utilidades** de Tailwind para responsive design

## 📚 **Referencias**

- [NativeWind Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Classes](https://tailwindcss.com/docs)
- [React Native Style Props](https://reactnative.dev/docs/style)

---

¡Ahora todas las pantallas usan CSS puro con NativeWind! 🎉
