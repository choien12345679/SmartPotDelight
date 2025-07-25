import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

function BasilInfoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>나는... "스위트 바질"!</Text>
      <Image
        source={require("../../components/images/basil_icon.png")}
        style={styles.image}
      />
      <Text style={styles.description}>
        스위트 바질은 향긋한 허브로 요리에 자주 사용되며, 따뜻한 햇빛과 물을 좋아합니다.
      </Text>

      <Text style={styles.sectionHeader}>스위트 바질 키우는 방법</Text>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>1. 햇빛 좋아요</Text>
          <Text style={styles.bullet}>• 하루에 4~6시간 이상 햇빛을 쬐게 해줘요.</Text>
          <Text style={styles.bullet}>• 창가나 베란다가 좋아요.</Text>

          <Text style={styles.sectionTitle}>2. 물은 흙이 마르면 주세요</Text>
          <Text style={styles.bullet}>• 손가락으로 흙을 살짝 만져보고, 말랐으면 물을 줘요.</Text>
          <Text style={styles.bullet}>• 너무 자주 주면 안 돼요. 뿌리가 아파요.</Text>

          <Text style={styles.sectionTitle}>3. 잎이 자라면 살짝 따주기</Text>
          <Text style={styles.bullet}>• 가운데 줄기 끝을 살짝 따주면 옆으로도 가지가 많이 나와요.</Text>
          <Text style={styles.bullet}>• 더 풍성하게 자라요.</Text>

          <Text style={styles.sectionTitle}>4. 화분은 구멍이 뚫려 있어야 해요</Text>
          <Text style={styles.bullet}>• 물이 빠져나가야 뿌리가 썩지 않아요.</Text>

          <Text style={styles.sectionTitle}>5. 벌레가 생기면?</Text>
          <Text style={styles.bullet}>• 물을 너무 자주 주면 벌레가 생길 수 있어요.</Text>
          <Text style={styles.bullet}>• 잎을 자주 살펴보고, 이상하면 엄마나 선생님께 알려줘요.</Text>

          <Text style={styles.sectionTitle}>6. 바질 소스 만들기</Text>
          <Text style={styles.bullet}>→ 갈아서 파스타에 뿌리면 고소하고 맛있어요.</Text>

          <Text style={styles.bigSectionTitle}>스위트 바질, 나중에 어디에 쓰일까?</Text>
          <Text style={styles.sectionTitle}>1. 향기 나는 비누나 방향제 만들기</Text>
          <Text style={styles.bullet}>• 말린 바질을 넣어 만들면 향긋한 냄새가 나요.</Text>
          <Text style={styles.sectionTitle}>2. 관찰 일기 쓰기</Text>
          <Text style={styles.bullet}>• 바질이 자라는 모습을 매일 기록해보아요.</Text>
          <Text style={styles.sectionTitle}>3. 바질 소스 만들기</Text>
          <Text style={styles.bullet}>• 갈아서 파스타에 뿌리면 고소하고 맛있어요.</Text>
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
  sectionHeader: { marginTop: 10, fontSize: 20, fontWeight: "bold", marginBottom: 8, color: "#2a7", fontFamily: 'BMJUA' },
  scrollWrapper: {
    width: "80%",
    height: screenHeight / 3,
    alignSelf: "center",
    marginBottom: 0,
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

export default BasilInfoScreen;
