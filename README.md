# 어린이를 위한 스마트화분 기쁨이

# 🌱 DelightPot - 스마트 화분 관리 앱

> IoT 기반 스마트 화분과 연동하여 식물을 더욱 쉽고 재미있게 키울 수 있는 모바일 애플리케이션

## 📱 주요 기능

### 🏠 메인 대시보드
- **실시간 식물 상태 모니터링**
  - 토양 습도, 온도, 조도 실시간 확인
  - 식물 건강 상태를 한눈에 파악
- **직관적인 UI/UX**
  - 사용자 친화적인 인터페이스
  - 식물별 맞춤 아이콘 및 시각적 표현

### 🌿 식물 정보 관리
- **다양한 식물 지원**
  - 바질(Basil) 재배 가이드
  - 민트(Mint) 관리 정보
  - 식물별 특성에 맞는 맞춤 케어 팁
- **식물 리스트 관리**
  - 내가 키우는 식물들을 한 곳에서 관리
  - 각 식물의 성장 기록 추적

### ⚙️ 스마트 설정
- **개인화 설정**
  - 사용자 이름 및 프로필 설정
  - 알림 및 케어 스케줄 커스터마이징
- **스피커 연동**
  - 음성 알림 및 가이드
  - 볼륨 조절 및 음성 설정
- **수면 모드**
  - 야간 시간대 알림 제어
  - 에너지 절약 모드

### 🔧 고급 기능
- **데이터 관리**
  - 식물 데이터 백업 및 복원
  - 성장 기록 데이터 분석
- **IoT 연동**
  - 스마트 화분과 실시간 통신
  - 자동 물주기 및 환경 조절

## 🛠️ 기술 스택

- **Frontend**: React Native
- **Backend**: FastAPI (Python)
- **Database**: 로컬 스토리지 + 클라우드 연동
- **IoT Communication**: WiFi 기반 실시간 데이터 전송
- **UI Framework**: 커스텀 컴포넌트 + 네이티브 애니메이션

## 📂 프로젝트 구조

```
src/
├── Screen/           # 화면 컴포넌트
│   ├── mainScreen.js
│   ├── startScreen.js
│   ├── plantInfo/    # 식물 정보 화면들
│   └── setting/      # 설정 화면들
├── components/       # 재사용 가능한 컴포넌트
│   ├── header.js
│   └── images/       # 아이콘 및 이미지 리소스
├── Config/           # 설정 파일
└── delectData.js     # 데이터 관리 유틸리티
```

## 🌟 특징
- **🎨 직관적인 디자인**: 사용자 경험을 최우선으로 한 깔끔한 UI
- **📊 실시간 모니터링**: IoT 센서를 통한 실시간 식물 상태 추적
- **📱 크로스 플랫폼**: iOS/Android 동시 지원

---

[어린이를 위한 스마트화분 최종 발표.pdf](https://github.com/user-attachments/files/21427699/default.pdf)
