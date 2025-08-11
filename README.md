# Alexa App Routines 🎙️

Una aplicación móvil desarrollada con **React Native** y **Expo** que permite gestionar rutinas de Alexa de manera intuitiva y moderna.

## 🚀 Características

- ✨ **React Native** con **TypeScript** para desarrollo multiplataforma
- 🎨 **NativeWind** (Tailwind CSS para React Native) para estilos modernos
- 📱 Compatible con **Android** e **iOS**
- 🌐 Soporte para **Web** durante desarrollo
- 🔧 Configuración con **Expo** para desarrollo rápido

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene incluido con Node.js)

## 🛠️ Instalación

### 1. Clona el repositorio
```bash
git clone https://github.com/JaredJuarez/Alexa-App-Routines.git
cd Alexa-App-Routines
```

### 2. Instala Expo CLI globalmente
```bash
npm install -g @expo/cli
```

### 3. Instala las dependencias del proyecto
```bash
npm install
```

### 4. Instala NativeWind y Tailwind CSS
```bash
npm install nativewind
npm install --save-dev tailwindcss
```

## 🚀 Ejecutar la aplicación

### Iniciar el servidor de desarrollo
```bash
npx expo start
```

### Opciones de visualización

Una vez que el servidor esté ejecutándose, tendrás estas opciones:

- **📱 Móvil**: Escanea el código QR con:
  - **Android**: App Expo Go
  - **iOS**: App Cámara o Expo Go
- **🌐 Web**: Presiona `w` o visita `http://localhost:8081`
- **📱 Android**: Presiona `a` (requiere Android Studio/emulador)
- **🍎 iOS**: Presiona `i` (requiere macOS y Xcode)

## 📱 Apps necesarias para testing

### Expo Go
- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

## 🔧 Scripts disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en Web
npm run web

# Limpiar y resetear proyecto
npm run reset-project

# Ejecutar linter
npm run lint
```

## 📁 Estructura del proyecto

```
Alexa-App-Routines/
├── app/                    # Páginas y navegación principal
│   ├── (tabs)/            # Navegación por pestañas
│   ├── _layout.tsx        # Layout principal
│   └── +not-found.tsx     # Página 404
├── components/             # Componentes reutilizables
│   ├── ui/                # Componentes base de UI
│   ├── ActivityCard.tsx   # Card de actividades
│   ├── AlexaStatus.tsx    # Estado de Alexa
│   ├── RoutineCard.tsx    # Card de rutinas
│   └── WeekStats.tsx      # Estadísticas semanales
├── constants/              # Constantes y configuraciones
├── data/                  # Datos mock y ejemplos
├── hooks/                 # Custom hooks
├── services/              # Servicios (API de Alexa)
├── types/                 # Tipos de TypeScript
├── assets/                # Imágenes y recursos estáticos
├── package.json           # Dependencias y scripts
├── app.json              # Configuración de Expo
├── tailwind.config.js    # Configuración de Tailwind CSS
└── tsconfig.json         # Configuración de TypeScript
```

## 🎨 Tecnologías utilizadas

- **[React Native](https://reactnative.dev/)** - Framework para desarrollo móvil
- **[Expo](https://expo.dev/)** - Plataforma de desarrollo
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS para React Native
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - Navegación basada en archivos
- **[React Navigation](https://reactnavigation.org/)** - Navegación nativa

## 🚨 Solución de problemas

### Error: "Expo CLI not found"
```bash
npm install -g @expo/cli
```

### Error: "Module not found"
```bash
npm install
```

### Error: "NativeWind styles not working"
```bash
npm install nativewind
npm install --save-dev tailwindcss
```

### Puerto en uso
Si el puerto 8081 está ocupado, Expo automáticamente usará otro puerto disponible.

### Error de compilación TypeScript
```bash
# Limpiar caché de Metro
npx expo start --clear
```

### Problemas con dependencias
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

## 📦 Dependencias principales

### Producción
- `expo` - Plataforma de desarrollo
- `react-native` - Framework móvil
- `expo-router` - Navegación
- `nativewind` - Estilos con Tailwind CSS
- `@react-navigation/*` - Navegación nativa

### Desarrollo
- `typescript` - Tipado estático
- `tailwindcss` - Framework de CSS
- `eslint` - Linter de código
- `@babel/core` - Compilador JavaScript
