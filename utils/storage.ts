import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pos_keypad_last_value';

export async function saveLastValue(value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, value);
  } catch (error) {
    console.error('Error saving value:', error);
  }
}

export async function getLastValue(): Promise<string> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return value ?? '';
  } catch (error) {
    console.error('Error retrieving value:', error);
    return '';
  }
}

export async function clearStoredValue(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing value:', error);
  }
}
