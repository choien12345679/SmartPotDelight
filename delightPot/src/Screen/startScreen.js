import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import startImage from '../components/images/startImage.png';
import fullimageStyle from "../components/styles/fullimageStyle";

function StartScreen({ navigation }) {
  const handlePress = async () => {
    try {
      const name = await AsyncStorage.getItem('plantName');
      const date = await AsyncStorage.getItem('plantDate');

      if (name && date) {
        navigation.navigate('mainScreen');
      } else {
        navigation.navigate('startPlantInfoScreen');
      }
    } catch (e) {
      console.warn("저장된 식물 정보 확인 중 오류:", e);
      navigation.navigate('startPlantInfoScreen');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={startImage} style={fullimageStyle.image} />
      </TouchableOpacity>
    </View>
  );
}

export default StartScreen;
