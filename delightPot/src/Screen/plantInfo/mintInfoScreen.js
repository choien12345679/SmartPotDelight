import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

function MintInfoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>나는... "애플 민트"!</Text>
      <Image
        source={require("../../components/images/mint_icon.png")}
        style={styles.image}
      />
      <Text style={styles.description}>
        애플 민트는 상쾌한 향을 가진 허브로 음료와 디저트에 많이 활용되며, 햇빛과 물을 잘 흡수합니다.
      </Text>

      <Text style={styles.sectionHeader}>애플민트 키우는 방법</Text>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>1. 햇빛과 그늘 반반 좋아요!</Text>
          <Text style={styles.bullet}>• 너무 뜨거운 햇빛보다, 부드러운 햇빛이 좋아요.</Text>
          <Text style={styles.bullet}>• 바람도 잘 통하는 곳이면 더 좋아요.</Text>

          <Text style={styles.sectionTitle}>2. 흙이 촉촉할 때 물 주기</Text>
          <Text style={styles.bullet}>• 매일 주지 말고, 흙이 마르면 물을 주세요.</Text>
          <Text style={styles.bullet}>• 물을 줄 땐 화분 아래로 물이 나올 만큼 충분히 주세요.</Text>

          <Text style={styles.sectionTitle}>3. 잎이 많아지면 조금 잘라주기</Text>
          <Text style={styles.bullet}>• 너무 빽빽하면 숨이 막혀요!</Text>
          <Text style={styles.bullet}>• 잘라준 잎은 차로 마시거나 꾸미기에 써요.</Text>

          <Text style={styles.sectionTitle}>4. 겨울엔 따뜻하게 해줘요</Text>
          <Text style={styles.bullet}>• 추운 바람을 맞으면 힘들어요.</Text>
          <Text style={styles.bullet}>• 실내에 넣어주고 햇빛을 쬐게 해줘요.</Text>

          <Text style={styles.bigSectionTitle}>애플민트, 나중에 어디에 쓰일까?</Text>
          <Text style={styles.sectionTitle}>1. 민트 차 만들기</Text>
          <Text style={styles.bullet}>• 잎을 따서 따뜻한 물에 넣으면 상큼한 차가 돼요.</Text>
          <Text style={styles.sectionTitle}>2. 냄새 잡는 주머니 만들기</Text>
          <Text style={styles.bullet}>• 말린 민트를 천에 담아서 신발장이나 가방에 넣으면 냄새가 사라져요.</Text>
        </ScrollView>
      </View>

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
  title: { top: 10, fontSize: 24, fontWeight: "bold", marginBottom: 10, fontFamily: 'BMJUA' },
  image: { top: 20, width: 300, height: 250, resizeMode: "contain", marginBottom: 10 },
  description: { marginTop: 20, fontSize: 16, paddingHorizontal: 20, textAlign: "center", marginBottom: 18, color: "#444", fontFamily: 'BMJUA' },
  sectionHeader: {marginTop: 20, fontSize: 20, fontWeight: "bold", marginBottom: 8, color: "#2a7", fontFamily: 'BMJUA' },
  scrollWrapper: {
    width: "80%",
    height: screenHeight / 3,
    alignSelf: "center",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  sectionTitle: { top: 20, fontSize: 18, fontWeight: "bold", marginTop: 18, marginBottom: 4, color: "#333", fontFamily: 'BMJUA' },
  bigSectionTitle: { top: 20, fontSize: 20, fontWeight: "bold", marginTop: 28, marginBottom: 8, color: "#2a7", fontFamily: 'BMJUA' },
  bullet: { top: 20, fontSize: 16, marginLeft: 10, marginBottom: 2, color: "#444", fontFamily: 'BMJUA' },
  backButton: {
    backgroundColor: "#ffeddd",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#222',
  },
  backText: { fontSize: 16, color: "#333", fontFamily: 'BMJUA' },
});

export default MintInfoScreen;
