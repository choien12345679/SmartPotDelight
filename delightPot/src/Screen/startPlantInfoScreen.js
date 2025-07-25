// ✅ startPlantInfoScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { savePlantInfo } from '../components/plantStorage';

function StartPlantInfoScreen({ navigation }) {
  const [plantName, setPlantName] = useState('');
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  const handleSave = async () => {
    if (!plantName.trim()) {
      Alert.alert('입력 오류', '화분 이름을 입력해주세요.');
      return;
    }
    if (!date) {
      Alert.alert('입력 오류', '날짜를 선택해주세요.');
      return;
    }
    await savePlantInfo(plantName.trim(), date);
    navigation.reset({ index: 0, routes: [{ name: 'mainScreen' }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>화분 정보 등록</Text>

      <TextInput
        placeholder="화분에게 이름을 지어줘 (20자 이내)"
        maxLength={20}
        value={plantName}
        onChangeText={setPlantName}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.dateBox}>
        <Text style={styles.dateText}>
          {date ? `처음 만난 날: ${date.toDateString()}` : '화분과 처음 만난 날짜를 입력해줘'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(selectedDate) => {
          const today = new Date();
          today.setHours(0,0,0,0);
          const picked = new Date(selectedDate);
          picked.setHours(0,0,0,0);
          if (picked > today) {
            Alert.alert('입력 오류', '미래의 날짜는 선택할 수 없습니다.');
            setDatePickerVisibility(false);
            return;
          }
          setDate(selectedDate);
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
        locale="ko-KR"
      />

      <TouchableOpacity onPress={handleSave} style={styles.confirmButton}>
        <Text style={styles.confirmText}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff7eb', alignItems: 'center', paddingTop: 60 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 40, fontFamily: 'BMJUA' },
  input: {
    width: '90%', height: 50, borderColor: '#aaa', borderWidth: 1,
    borderRadius: 8, paddingHorizontal: 10, fontSize: 16, marginBottom: 30,
    fontFamily: 'BMJUA', backgroundColor: '#fff'
  },
  dateBox: {
    width: '90%', alignItems: 'center', paddingVertical: 20,
    paddingHorizontal: 15, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 12, marginBottom: 30, backgroundColor: '#fff'
  },
  dateText: { fontSize: 16, color: '#555', fontFamily: 'BMJUA', backgroundColor: '#fff' },
  confirmButton: {
    width: '60%', height: 50, backgroundColor: '#4CAF50',
    justifyContent: 'center', alignItems: 'center', borderRadius: 10
  },
  confirmText: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'BMJUA' },
});

export default StartPlantInfoScreen;
