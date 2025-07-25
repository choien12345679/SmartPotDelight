import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

function SettingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>

      {/* 이름 / D+day 설정 */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("ALL_SET_SCREEN")}
      >
        <Image 
          source={require('../../components/images/name_icon.png')} 
          style={styles.icon} 
        />
        <Text style={styles.buttonText}>이름 / D+day 설정하기</Text>
      </TouchableOpacity>

      {/* 스피커 설정 */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("speakerSettingScreen")}
      >
        <Image 
          source={require('../../components/images/volume_icon.png')} 
          style={styles.icon} 
        />
        <Text style={styles.buttonText}>스피커 설정하기</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: "#ffcccc" }]} 
        onPress={async () => {
          try {
            await AsyncStorage.multiRemove(['plantStatus', 'plantName', 'plantDate']);
            alert("앱 데이터가 초기화되었습니다.");
        
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'startScreen' }],
              })
            );
          } catch (e) {
            console.error("초기화 실패", e);
            alert("초기화 도중 문제가 발생했지만 앱은 계속 작동합니다.");
          }
        }}        
      >
        <Image 
          source={require('../../components/images/reset_icon.png')} // 적절한 초기화 이미지 경로 설정
          style={styles.icon} 
        />
        <Text style={[styles.buttonText, { color: "#900" }]}>앱 데이터 초기화</Text>
      </TouchableOpacity>
      {/* 뒤로 가기 */}
      <TouchableOpacity 
        style={[styles.button, styles.backButton]} 
        onPress={() => navigation.goBack()}
        >
        <Text style={styles.buttonText}>뒤로 가기</Text>
      </TouchableOpacity>
    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7eb",
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 40,
    fontFamily: 'BMJUA',
  },
  button: {
    width: "85%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#222',
  },
  backButton: {
    backgroundColor: "#ffeddd",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    fontFamily: 'BMJUA',
  },
});

export default SettingScreen;
