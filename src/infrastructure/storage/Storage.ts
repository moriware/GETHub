import { KeyValueStorage } from '@/infrastructure/storage/Storage.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage implements KeyValueStorage {
  /**
   * Recupera um valor persistido em disco para a chave informada.
   */
  async getString(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  /**
   * Persiste em disco o valor informado para a chave.
   */
  async set(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  /**
   * Remove do armazenamento persistente a chave informada.
   */
  async delete(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
