import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from "react-native";
import { IP } from '../Config/ipConfig';
import Header from '../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

function MainScreen({ navigation }) {
  const [waterLevel, setWaterLevel] = useState(60);
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [lightLevel, setLightLevel] = useState(50);
  const [abnormalSensors, setAbnormalSensors] = useState(0);
  const [plantName, setPlantName] = useState('기쁨이');
  const [plantDate, setPlantDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      const loadPlantInfo = async () => {
        try {
          const name = await AsyncStorage.getItem('plantName');
          const dateStr = await AsyncStorage.getItem('plantDate');
          if (name) setPlantName(name);
          if (dateStr) setPlantDate(new Date(dateStr));
        } catch (e) {
          console.warn('저장된 화분 정보를 불러오는 중 오류 발생:', e);
        }
      };
      loadPlantInfo();
    }, [])
  );

  const dday = Math.floor((new Date() - new Date(plantDate)) / (1000 * 60 * 60 * 24)) + 1;

  const getWaterImage = () => {
    console.log('수위 센서 값:', waterLevel);
    if (waterLevel < 5) {
      console.log('수위 이미지: 71-100%');
      return require('../components/images/mainIcon/water_tank_71_100.png');
    }
    if (waterLevel < 15) {
      console.log('수위 이미지: 51-70%');
      return require('../components/images/mainIcon/water_tank_51_70.png');
    }
    if (waterLevel < 20) {
      console.log('수위 이미지: 26-50%');
      return require('../components/images/mainIcon/water_tank_26_50.png');
    }
    console.log('수위 이미지: 0-25%');
    return require('../components/images/mainIcon/water_tank_0_25.png');
  };

  const getSoilMoistureImage = () => {
    console.log('토양 수분 센서 값:', soilMoisture);
    if (soilMoisture <= 25) {
      console.log('토양 수분 이미지: 0-25%');
      return require('../components/images/mainIcon/water_0_25.png');
    }
    if (soilMoisture <= 50) {
      console.log('토양 수분 이미지: 26-50%');
      return require('../components/images/mainIcon/water_26_50.png');
    }
    if (soilMoisture <= 70) {
      console.log('토양 수분 이미지: 51-70%');
      return require('../components/images/mainIcon/water_51_70.png');
    }
    console.log('토양 수분 이미지: 71-100%');
    return require('../components/images/mainIcon/water_71_100.png');
  };

  const getPlantStatusImage = () => {
    if (abnormalSensors === 0) return require('../components/images/mainIcon/status_normal.png');
    if (abnormalSensors === 1) return require('../components/images/mainIcon/status_1.png');
    if (abnormalSensors === 2) return require('../components/images/mainIcon/status_2.png');
    return require('../components/images/mainIcon/status_3.png');
  };

  const getLightImage = () => {
    console.log('조도 센서 값:', lightLevel);
    if (lightLevel <= 100) {
      console.log('조도 이미지: 어두움');
      return require('../components/images/mainIcon/sun_low.png');
    }
    if (lightLevel <= 500) {
      console.log('조도 이미지: 보통');
      return require('../components/images/mainIcon/sun_normal.png');
    }
    console.log('조도 이미지: 밝음');
    return require('../components/images/mainIcon/sun_high.png');
  };

  const handleWatering = async () => {
    try {
      console.log('워터펌프 작동 요청 시작');
      
      const response = await fetch(`${IP}/api/watering/start`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('워터펌프 작동 응답:', result);
      
      if (result.status === 'success') {
        Alert.alert("물주기", "화분에 물주기가 시작되었습니다.");
      } else {
        Alert.alert("물주기", "물주기 요청이 실패했습니다.");
      }
      
    } catch (error) {
      console.error('워터펌프 작동 요청 중 오류 발생:', error.message);
      Alert.alert("물주기", "물주기 요청 중 오류가 발생했습니다.");
    }
  };

  const fetchSensorData = async () => {
    try {
      console.log('센서 데이터 요청 시작:', `${IP}/api/sensors/current`);
      
      const response = await fetch(`${IP}/api/sensors/current`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('받은 센서 데이터:', data);
      
      // 센서 데이터 업데이트
      if (data.moisture !== undefined) {
        console.log('토양 수분 업데이트:', data.moisture);
        setSoilMoisture(data.moisture);
      }
      if (data.waterLevel !== undefined) {
        console.log('수위 업데이트:', data.waterLevel);
        setWaterLevel(data.waterLevel);
      }
      if (data.lightLevel !== undefined) {
        console.log('조도 업데이트:', data.lightLevel);
        setLightLevel(data.lightLevel);
      }
      
    } catch (error) {
      console.error('센서 데이터를 가져오는 중 오류 발생:', error.message);
    }
  };

  // 센서 데이터 상태 변경 감지
  useEffect(() => {
    console.log('현재 센서 상태:', {
      soilMoisture,
      waterLevel,
      lightLevel
    });
  }, [soilMoisture, waterLevel, lightLevel]);

  // 센서 데이터 가져오기
  useEffect(() => {
    // 초기 데이터 로드
    fetchSensorData();

    // 5초마다 데이터 업데이트
    const intervalId = setInterval(fetchSensorData, 5000);

    // 컴포넌트 언마운트 시 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Header 
        title={`${plantName}와 함께한 지 D+${dday}`}
        onSettingPress={() => navigation.navigate('settingScreen')}
        onPlantInfoPress={() => navigation.navigate('plantListScreen')}
        onBackPress={() => navigation.navigate('startScreen')}
      />

      <View style={styles.bodyContainer}>
        {/* 햇빛 말풍선 */}
        <Image
          source={require('../components/images/mainIcon/sun_speech_balloon.png')}
          style={styles.sunSpeechBubble}
        />
        {/* 햇빛 아이콘 - 우측 상단 */}
        <Image source={getLightImage()} style={styles.sunIcon} />

        {/* 물통 말풍선 */}
        <Image
          source={require('../components/images/mainIcon/delight_speech_balloons.png')}
          style={styles.waterSpeechBubble}
        />
        {/* 물통 + 화분 상태 이미지 (겹치기, 크기 더 줄임) */}
        <View style={styles.statusRow}>
          <View style={styles.overlayContainer}>
            <Image source={getWaterImage()} style={styles.waterImageOverlay} />
            <Image source={getPlantStatusImage()} style={styles.statusImageOverlay} />

            {/* 물주기 버튼 - 대각선 상단 */}
            <TouchableOpacity onPress={handleWatering} style={styles.waterButton}>
              <Image 
                source={require('../components/images/mainIcon/wateringIcon.png')} 
                style={styles.wateringIcon} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 토양수분 말풍선 */}
        <Image
          source={require('../components/images/mainIcon/soil_speech_balloon.png')}
          style={styles.soilSpeechBubble}
        />
        {/* 토양수분 */}
        <View style={styles.soilMoistureContainer}>
          <Image source={getSoilMoistureImage()} style={styles.soilMoistureIcon} />
        </View>

        {/* 물주기 버튼 말풍선 */}
        <Image
          source={require('../components/images/mainIcon/watering_speech_balloon.png')}
          style={styles.wateringSpeechBubble}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff7eb" },
  bodyContainer: { 
    flex: 1, 
    paddingTop: 110,
    position: 'relative',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  sunIcon: {
    position: 'absolute',
    top: 15,
    right: 5,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  tempIcon: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  statusRow: {
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight * 0.35,
    marginTop: 120,
  },
  overlayContainer: {
    position: 'relative',
    width: screenHeight * 0.25,
    height: screenHeight * 0.25,
  },
  statusImageOverlay: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    top : '200',
    right: 0,
  },
  waterImageOverlay: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    position: 'absolute',
    left: -60,
    top: '122%',
  },
  waterButton: {
    position: 'absolute',
    top: -100,
    right: -35,
  },
  wateringIcon: {
    position: 'absolute',
    top: 100,
    right: -35,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  soilMoistureContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  soilMoistureIcon: {
    position: 'absolute',
    bottom: 410,
    left: 20,
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  // 햇빛(조도) 말풍선
  sunSpeechBubble: {
    position: 'absolute',
    top: 5,
    right: 20,
    width: 400,
    height: 130,
    resizeMode: 'contain',
    zIndex: 2,
  },
  // 물통(워터탱크) 말풍선
  waterSpeechBubble: {
    position: 'absolute',
    top: 310,
    left: -80,
    width: 400,
    height: 200,
    resizeMode: 'contain',
    zIndex: 2,
  },
  // 토양수분 말풍선
  soilSpeechBubble: {
    position: 'absolute',
    top: 120,
    left: -60,
    width: 500,
    height: 110,
    resizeMode: 'contain',
    zIndex: 2,
  },
  // 물주기 버튼 말풍선
  wateringSpeechBubble: {
    position: 'absolute',
    top: 230,
    left: -70,
    width: 500,
    height: 100,
    resizeMode: 'contain',
    zIndex: 2,
  },
});

export default MainScreen;
