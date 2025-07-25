import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { loadPlantInfo, savePlantInfo } from '../../components/plantStorage';

function NameSetScreen({ navigation }) {
  const inputRef = useRef('');
  const [confirmedName, setConfirmedName] = useState('기쁨이');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { name, date } = await loadPlantInfo();
      setConfirmedName(name);
      setDate(date);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    const name = inputRef.current?.trim() || confirmedName;
    setConfirmedName(name);
    await savePlantInfo(name, date);
    navigation.goBack(); 
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이름 / D+day 설정</Text>

      <TextInput
        placeholder={`${confirmedName} (최대 20자)`}
        maxLength={20}
        style={styles.input}
        onChangeText={(text) => (inputRef.current = text)}
      />

      <TouchableOpacity
        onPress={() => setDatePickerVisibility(true)}
        style={styles.dateBox}
      >
        <Text style={styles.dateText}>
          🌱 {confirmedName}을 처음 만난 날은 ~!!
        </Text>
        <Text style={styles.dateValue}>{date.toDateString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
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
        <Text style={styles.confirmText}>확인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>뒤로 가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, backgroundColor: "#fff7eb" },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 40, fontFamily: 'BMJUA', marginTop: 40, },
  input: {
    width: '90%', height: 50, borderColor: '#aaa', borderWidth: 1,
    borderRadius: 8, paddingHorizontal: 10, fontSize: 16, marginBottom: 30,
    backgroundColor: '#fff',
    fontFamily: 'BMJUA',
  },
  dateBox: {
    width: '90%', alignItems: 'center', paddingVertical: 20,
    paddingHorizontal: 15, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 12, marginBottom: 30,
    backgroundColor: '#fff',
  },
  dateText: { fontSize: 16, marginBottom: 5, fontFamily: 'BMJUA' },
  dateValue: { fontSize: 16, color: '#333', fontFamily: 'BMJUA' },
  confirmButton: {
    width: '50%', height: 50, backgroundColor: '#4CAF50',
    justifyContent: 'center', alignItems: 'center', borderRadius: 10,
    borderWidth: 1,
    borderColor: '#222',
  },
  confirmText: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'BMJUA' },
  backButton: {
    width: '50%', height: 50, backgroundColor: '#ffeddd',
    justifyContent: 'center', alignItems: 'center', borderRadius: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  backText: {
    color: '#333', fontSize: 18, fontWeight: 'bold', fontFamily: 'BMJUA'
  },
});

export default NameSetScreen;