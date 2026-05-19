import AsyncStorage from '@react-native-async-storage/async-storage';

export interface KeyValueStorage {
  getString(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

export class MMKVStorage implements KeyValueStorage {
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
