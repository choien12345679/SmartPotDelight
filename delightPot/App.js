import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
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
    <View style={styles.container}>
      <Text>{value}</Text>
      <StatusBar style="auto" />
    </View>
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

