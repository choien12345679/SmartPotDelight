import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import startScreen from './src/Screen/startScreen';
import mainScreen from './src/Screen/mainScreen';


export default function App() {
  const Stack = createStackNavigator();
  const [value, setValue] = useState('안녕');
  const getRepotNo = async () => {
    try {
      console.log("fetch 요청 전");
  
      const response = await fetch('http://192.168.0.3:8000/items/7?name=item_name', {
        method: 'GET',
      });
  
      console.log("fetch 요청 후", response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseJson = await response.json();
      console.log("응답 받은 JSON:", responseJson);
  
      setValue(responseJson.name);
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };
  
  
  useEffect(()=> {
    console.log("getRepotNo 호출 전에");

    getRepotNo();
    console.log("getRepotNo 호출 GN에");

  }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="startScreen">
        <Stack.Screen
          name="startScreen" 
          component={startScreen}
          options={{headerShown: false}} /> 
        <Stack.Screen 
          name="mainScreen" 
          component={mainScreen}
          options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

