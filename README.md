# 👨‍💻 react-native-chat
<p>


## 📖설치한 라이브러리
--------------------------------------------------------
1. navigation에 관련된 라이브러리
> npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
2. navigation에 관련된 추가 라이브러리
> expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

expo를 이용해 진행하기 때문에 expo명령어로 설치

3. 스타일 관련 라이브러리
> npm install styled-components prop-types


4. 채팅 관련 라이브러리
 - npm install expo-image-picker: 기기 사진 영상 가져올 수 있도록 UI에 접근하는 기능
 - moment: 시간 관련 기능
 - react-native-keyboard-aware-scoll-View: 키보드가 화면을 가리는 불편한 점 해결
 - react-native-gifted-chat: 채팅화면을 쉽게 구현하도록 돕는 기능

5. 데이터베이스 관련 라이브러리
> expo install firebase

6. 로딩 관련 라이브러리
> expo install expo-app-loading

7. 키보드 설정 관련 라이브러리
> expo install react-native-keyboard-aware-scroll-View
다른 곳 터치하면 키보드 포커스 아웃과 키보드가 화면을 가리는 오류 해결
## 👷‍♂️사용하는 데이터베이스
 --------------
 여러 기능을 사용하기 위해 파이어베이스를 사용

## 파일 구조
---------------
1. assets: 이미지 관리
2. src: 전체 파일 관리
3. src안에 폴더
    1. components: 컴포넌트 파일 관리
    2. contexts: context API 파일 관리
    3. navigation: 내비게이션 파일 관리
    4. screens: 화면 파일 관리
    5. utils: 기타 기능 관리

