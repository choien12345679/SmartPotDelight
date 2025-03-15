import { StyleSheet } from 'react-native';

const fullimageStyle = StyleSheet.create({
  container: {
    flex: 1,  // 부모 컨테이너가 전체 화면을 차지하도록 설정
    justifyContent: 'center',  // 수직 가운데 정렬
    alignItems: 'center',  // 수평 가운데 정렬
  },
  image: {
    width: '100%',   // 화면 너비에 맞게 이미지 크기 설정
    height: '100%',  // 화면 높이에 맞게 이미지 크기 설정
    resizeMode: 'cover',  // 이미지가 화면을 덮게 설정, 비율을 유지하면서 크기 맞추기
  },
});

export default fullimageStyle;