# API Endpoints Documentation

## Base URL
```
https://357h315x-8081.usw3.devtunnels.ms
```

## Authentication Endpoints

### Login
- **Endpoint:** `/api/auth`
- **Method:** POST
- **Headers:** 
  - Content-Type: application/json

#### Request Body
```json
{
  "email": "marmolejo@gmail.com",
  "password": "123456"
}
```

#### Success Response (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJtb2xlam9AZ21haWwuY29tIiwiZXhwIjoxNzU1MjI2MjQ5LCJpYXQiOjE3NTUxOTAyNDl9.kFqDSm6IjQnIcwJ_drDdKnzvdLe0jylFMBDVHImqBY0",
  "role": "CUSTOMER"
}
```

#### Error Response (400/401/500)
```json
{
  "message": "Credenciales inválidas"
}
```

### Register
- **Endpoint:** `/api/auth/register`
- **Method:** POST
- **Headers:** 
  - Content-Type: application/json

#### Request Body
```json
{
  "name": "string",
  "phone": "string", 
  "email": "string",
  "password": "string",
  "rol": {
    "id": 1
  }
}
```

#### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "user": {
    "id": 2,
    "name": "Nuevo Usuario",
    "email": "nuevo@gmail.com",
    "phone": "0987654321"
  }
}
```

#### Error Response (400/409/500)
```json
{
  "success": false,
  "message": "El email ya está registrado"
}
```

## Usage in App

The authentication is handled by the `authService` which includes:
- Automatic timeout handling (10 seconds)
- Error handling and user-friendly messages
- Proper JSON formatting
- Request/Response type safety with TypeScript

### Example Usage:
```typescript
import { authService } from '@/services/authService';

// Login
try {
  const response = await authService.login({
    email: 'user@gmail.com',
    password: '123456'
  });
  console.log('Login successful:', response);
} catch (error) {
  console.error('Login failed:', error.message);
}

// Register
try {
  const response = await authService.register({
    name: 'New User',
    phone: '1234567890',
    email: 'newuser@gmail.com',
    password: 'password123',
    rol: { id: 1 }
  });
  console.log('Registration successful:', response);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```
