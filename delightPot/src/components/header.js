import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Header({ title, onSettingPress, onPlantInfoPress }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPlantInfoPress} style={styles.leftIcon}>
        <Image
          source={require('./images/plant_info_icon.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      {/* 타이틀 */}
      <Text style={styles.title}>{title}</Text>

      {/* 우측 설정 버튼 */}
      <TouchableOpacity onPress={onSettingPress} style={styles.rightIcon}>
        <Image
          source={require('./images/setting_icon.png')} 
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    fontFamily: 'BMJUA',
    backgroundColor: '#ffeddd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'BMJUA',
  },
  leftIcon: {
    position: 'absolute',
    left: 20,
    bottom: 12,
  },
  rightIcon: {
    position: 'absolute',
    right: 20,
    bottom: 12,
  },
});
