import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

function PlantListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>나는 어떤 기쁨이 될까?</Text>

      {/* 바질 항목 */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("basilInfoScreen")}
      >
        <Image
          source={require("../../components/images/basil_icon.png")} // 실제 이미지 경로에 맞게 수정
          style={styles.icon}
        />
        <View>
          <Text style={styles.name}>스위트 바질</Text>
          <Text style={styles.description}>스위트 바질에 대한 설명 미리보기</Text>
        </View>
      </TouchableOpacity>

      {/* 애플 민트 항목 */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("mintInfoScreen")}
      >
        <Image
          source={require("../../components/images/mint_icon.png")} // 실제 이미지 경로에 맞게 수정
          style={styles.icon}
        />
        <View>
          <Text style={styles.name}>애플 민트</Text>
          <Text style={styles.description}>애플 민트에 대한 설명 미리보기</Text>
        </View>
      </TouchableOpacity>

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        style={[styles.card, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.name}>뒤로 가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff7eb", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
    alignSelf: "center",
    top: 60,
    fontFamily: 'BMJUA',
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    top: 60,
    borderWidth: 1,
    borderColor: '#222',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: 'BMJUA',
  },
  description: {
    fontSize: 14,
    color: "#666",
    fontFamily: 'BMJUA',
  },
  backButton: {
    justifyContent: "center",
    backgroundColor: "#ffeddd",
  },
});

export default PlantListScreen;
