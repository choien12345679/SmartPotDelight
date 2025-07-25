import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import Slider from '@react-native-community/slider';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from "../../Config/ipConfig";
import { loadPlantInfo } from "../../components/plantStorage";

function SpeakerSettingScreen({ navigation }) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [plantName, setPlantName] = useState("기쁨이");
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // 화분 이름 불러오기
        const { name } = await loadPlantInfo();
        setPlantName(name);

        // 저장된 스피커 설정 불러오기
        const savedStartTime = await AsyncStorage.getItem('speakerStartTime');
        const savedEndTime = await AsyncStorage.getItem('speakerEndTime');
        const savedVolume = await AsyncStorage.getItem('speakerVolume');

        if (savedStartTime) {
          setStartTime(new Date(savedStartTime));
        }
        if (savedEndTime) {
          setEndTime(new Date(savedEndTime));
        }
        if (savedVolume) {
          setVolume(parseInt(savedVolume));
        }

        console.log('저장된 설정 불러오기:', {
          startTime: savedStartTime,
          endTime: savedEndTime,
          volume: savedVolume
        });
      } catch (error) {
        console.error('설정 불러오기 실패:', error);
      }
    };

    loadSettings();
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const handleSave = async () => {
    try {
      console.log('스피커 설정 저장 시작');
      console.log('시작 시간 (원본):', startTime);
      console.log('종료 시간 (원본):', endTime);
      console.log('시작 시간 (로컬):', startTime.toLocaleString());
      console.log('종료 시간 (로컬):', endTime.toLocaleString());
      console.log('볼륨:', volume);
      
      // AsyncStorage에 설정 저장
      await AsyncStorage.setItem('speakerStartTime', startTime.toISOString());
      await AsyncStorage.setItem('speakerEndTime', endTime.toISOString());
      await AsyncStorage.setItem('speakerVolume', volume.toString());
      
      // 정확한 시간 추출 (HH:MM 형태)
      const startHours = startTime.getHours().toString().padStart(2, '0');
      const startMinutes = startTime.getMinutes().toString().padStart(2, '0');
      const startTimeLocal = `${startHours}:${startMinutes}`;
      
      const endHours = endTime.getHours().toString().padStart(2, '0');
      const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
      const endTimeLocal = `${endHours}:${endMinutes}`;
      
      console.log('추출된 시작 시간:', startTimeLocal);
      console.log('추출된 종료 시간:', endTimeLocal);
      
      // 시간 저장 (시간만 전송)
      const timeBody = {
        startTime: startTimeLocal,
        endTime: endTimeLocal,
      };
      console.log('시간 데이터 전송:', timeBody);
      
      const timeRes = await fetch(`${IP}/api/set-speaker-time`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timeBody),
      });
      
      console.log('시간 설정 응답 상태:', timeRes.status);
      
      // 응답이 JSON인지 확인
      const timeContentType = timeRes.headers.get('content-type');
      let timeResult = null;
      
      if (timeContentType && timeContentType.includes('application/json')) {
        timeResult = await timeRes.json();
        console.log('시간 설정 응답:', timeResult);
      } else {
        const textResponse = await timeRes.text();
        console.log('시간 설정 HTML 응답:', textResponse);
        throw new Error(`서버에서 JSON이 아닌 응답 반환 (상태: ${timeRes.status})`);
      }
      
      if (!timeRes.ok) throw new Error(`서버 응답 실패(시간): ${timeRes.status}`);

      // 볼륨 저장
      const volumeBody = { volume };
      console.log('볼륨 데이터 전송:', volumeBody);
      
      const volRes = await fetch(`${IP}/api/set-volume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volumeBody),
      });
      
      console.log('볼륨 설정 응답 상태:', volRes.status);
      
      // 응답이 JSON인지 확인
      const volContentType = volRes.headers.get('content-type');
      let volumeResult = null;
      
      if (volContentType && volContentType.includes('application/json')) {
        volumeResult = await volRes.json();
        console.log('볼륨 설정 응답:', volumeResult);
      } else {
        const textResponse = await volRes.text();
        console.log('볼륨 설정 HTML 응답:', textResponse);
        throw new Error(`서버에서 JSON이 아닌 응답 반환 (상태: ${volRes.status})`);
      }
      
      if (!volRes.ok) throw new Error(`서버 응답 실패(볼륨): ${volRes.status}`);

      Alert.alert("성공", "설정이 저장되었습니다.");
      navigation.goBack();
    } catch (error) {
      console.error("설정 저장 실패:", error);
      Alert.alert("에러", `설정 저장 중 오류 발생: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>스피커 설정</Text>
      <Text style={styles.subText}>🌙 {plantName}의 수면 시간을 정해줘</Text>

      <TouchableOpacity
        style={styles.timeBox}
        onPress={() => setStartPickerVisible(true)}
      >
        <Text style={styles.timeLabel}>AM - 시작 시간</Text>
        <Text style={styles.timeValue}>{formatTime(startTime)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.timeBox}
        onPress={() => setEndPickerVisible(true)}
      >
        <Text style={styles.timeLabel}>PM - 종료 시간</Text>
        <Text style={styles.timeValue}>{formatTime(endTime)}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="time"
        onConfirm={(date) => {
          setStartTime(date);
          setStartPickerVisible(false);
        }}
        onCancel={() => setStartPickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="time"
        onConfirm={(date) => {
          setEndTime(date);
          setEndPickerVisible(false);
        }}
        onCancel={() => setEndPickerVisible(false)}
      />

      {/* 볼륨 슬라이더 */}
      <View style={styles.sliderBox}>
        <Image source={require('../../components/images/volume_low.png')} style={styles.icon} />
        <Slider
          style={{ flex: 1 }}
          minimumValue={1}
          maximumValue={100}
          step={1}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#ccc"
        />
        <Image source={require('../../components/images/volume_high.png')} style={styles.icon} />
      </View>

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
  container: { flex: 1, alignItems: "center", paddingTop: 60, backgroundColor: "#fff7eb" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, fontFamily: 'BMJUA', marginTop: 40, },
  subText: { fontSize: 16, color: "#666", marginBottom: 40, fontFamily: 'BMJUA' },
  timeBox: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  timeLabel: { fontSize: 16, marginBottom: 5, color: "#444", fontFamily: 'BMJUA' },
  timeValue: { fontSize: 20, fontWeight: "bold", color: "#222", fontFamily: 'BMJUA' },
  sliderBox: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 40,
    marginTop: 10,
  },
  icon: {
    width: 30, height: 30, marginHorizontal: 10
  },
  confirmButton: {
    width: '50%', height: 50, backgroundColor: '#4CAF50',
    justifyContent: 'center', alignItems: 'center', borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#222',
  },
  confirmText: { fontSize: 18, fontWeight: "bold", color: "#fff", fontFamily: 'BMJUA' },
  backButton: {
    width: '50%', height: 50, backgroundColor: '#ffeddd',
    justifyContent: 'center', alignItems: 'center', borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  backText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    fontFamily: 'BMJUA'
  },
});

export default SpeakerSettingScreen;
