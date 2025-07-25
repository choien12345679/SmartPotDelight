import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NameSetScreen from './src/Screen/setting/nameSetScreen';
import StartScreen from './src/Screen/startScreen'
import StartPlantInfoScreen from './src/Screen/startPlantInfoScreen';
import MainScreen from './src/Screen/mainScreen';
import SettingScreen from './src/Screen/setting/settingScreen';
import PlantListScreen from './src/Screen/plantInfo/plantListScreen';
import SpeakerSettingScreen from './src/Screen/setting/speaker_setting';
import BasilInfoScreen from './src/Screen/plantInfo/basilInfoScreen';
import MintInfoScreen from './src/Screen/plantInfo/mintInfoScreen';
import * as Font from 'expo-font';
import { useState } from 'react';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'BMJUA': require('./assets/fonts/BMJUA.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="startScreen">
        <Stack.Screen
          name="startScreen" 
          component={StartScreen}
          options={{ headerShown: false }} 
        /> 
        <Stack.Screen 
          name="mainScreen" 
          component={MainScreen}
          options={{ title: '메인 화면' , headerShown: false }}
        />
        <Stack.Screen 
          name="settingScreen" 
          component={SettingScreen}
          options={{ title: '설정', headerShown: false }} 
        />
        <Stack.Screen
          name="plantListScreen"
          component={PlantListScreen}
          options={{ title: '식물 정보', headerShown: false}}
        />
        <Stack.Screen
          name="ALL_SET_SCREEN"
          component={NameSetScreen}
          options={{ title: '이름 설정', headerShown: false }}
        />
        <Stack.Screen
          name="startPlantInfoScreen"
          component={StartPlantInfoScreen}
          options={{ title: '화분 등록', headerShown: false }}
        />
        <Stack.Screen
          name="speakerSettingScreen"
          component={ SpeakerSettingScreen }
          options={{ title: '스피커 시간 설정', headerShown: false }}
        />
        <Stack.Screen
          name="basilInfoScreen"
          component={ BasilInfoScreen }
          options={{ title: ' 바질 정보 ', headerShown: false }}
        />
        <Stack.Screen
          name="mintInfoScreen"
          component={ MintInfoScreen }
          options={{ title: ' 민트 정보 ', headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
