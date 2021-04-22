import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;

const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imageButtonBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;
const ButtonIcon = styled(MaterialIcons).attrs({
  name: "photo-camera",
  size: 22,
})`
  color: ${({ theme }) => theme.imageButtonIcon};
`;

const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

const Image = ({ url, imageStyle, rounded, showButton, onChangeImage }) => {
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === "ios") {
          const { status } = await Permissions.askAsync(
            Permissions.MEDIA_LIBRARY
          );
          if (status !== "granted") {
            Alert.alert("Photo Permisson");
          }
        }
      } catch (e) {
        Alert.alert("Photo Permission Error", e.message);
      }
    })();
  }, []);

  const _handleEditButton = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      //mediaTypes: 조회하는 자료의 타입
      //allowsEditing: 이미지 선택 후 편집할껀지
      //aspect(안드로이드용): 이미지 편집 시 사각형 비율
      //quality: 압축 품질을 의미 1이 최대 품질
      if (!result.cancelled) {
        //cancelled로 결과의 선택 여부 확인
        onChangeImage(result.uri);
      }
    } catch (e) {
      Alert.alert("Photo Error", e.message);
    }
  };

  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded} />
      {showButton && <PhotoButton onPress={_handleEditButton} />}
    </Container>
  );
};

Image.defaultProps = {
  rounded: false,
  showButton: false,
  onChangeImage: () => {},
};

Image.prototype = {
  uri: PropTypes.string,
  imageStyle: PropTypes.object,
  rounded: PropTypes.bool,
  showButton: PropTypes.bool,
  onChangeImage: PropTypes.func,
};

export default Image;
