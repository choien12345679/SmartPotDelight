// ✅ plantStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePlantInfo = async (name, date) => {
  try {
    await AsyncStorage.setItem('plantName', name);
    await AsyncStorage.setItem('plantDate', date.toISOString());
  } catch (e) {
    console.error('🛑 Failed to save plant info:', e);
  }
};

export const loadPlantInfo = async () => {
  try {
    const name = await AsyncStorage.getItem('plantName');
    const date = await AsyncStorage.getItem('plantDate');
    return {
      name: name || '기쁨이',
      date: date ? new Date(date) : new Date(),
    };
  } catch (e) {
    console.error('🛑 Failed to load plant info:', e);
    return { name: '기쁨이', date: new Date() };
  }
};

export const isFirstTimeUser = async () => {
  const status = await AsyncStorage.getItem('plantStatus');
  if (status === null) {
    await AsyncStorage.setItem('plantStatus', 'true');
    return true;
  }
  return false;
};