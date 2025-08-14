import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const ROLE_KEY = 'user_role';
const USER_ID_KEY = 'user_id';

export class StorageService {
  static async saveToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
      throw new Error('No se pudo guardar el token');
    }
  }

  static async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  static async removeToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  static async saveRole(role: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(ROLE_KEY, role);
    } catch (error) {
      console.error('Error saving role:', error);
    }
  }

  static async getRole(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(ROLE_KEY);
    } catch (error) {
      console.error('Error getting role:', error);
      return null;
    }
  }

  static async removeRole(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(ROLE_KEY);
    } catch (error) {
      console.error('Error removing role:', error);
    }
  }

  static async saveUserId(userId: number): Promise<void> {
    try {
      await SecureStore.setItemAsync(USER_ID_KEY, userId.toString());
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  }

  static async getUserId(): Promise<number | null> {
    try {
      const userIdString = await SecureStore.getItemAsync(USER_ID_KEY);
      return userIdString ? parseInt(userIdString, 10) : null;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  }

  static async removeUserId(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(USER_ID_KEY);
    } catch (error) {
      console.error('Error removing user ID:', error);
    }
  }

  static async clearAll(): Promise<void> {
    await Promise.all([
      this.removeToken(),
      this.removeRole(),
      this.removeUserId()
    ]);
  }
}
