import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import startImage from '../components/images/startImage.png';
import fullimageStyle from "../components/styles/fullimageStyle";

function startScreen({ navigation }) {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate('mainScreen')}>
            <Image
                source={startImage}
                style={fullimageStyle.image}
            />
        </TouchableOpacity>
      </View>
    );
}

export default startScreen;