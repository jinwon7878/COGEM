import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styled from '@emotion/native';
import CogemLogo from '../assets/svg/cogem_logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../axiosInstance';

const SignInScreen = ({navigation, setIsSignedIn}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const handleSignIn = async () => {
    try {
      const response = await axiosInstance.post(
        'http://localhost:8080/user/signin',
        {
          id,
          password,
        },
      );
      const {userInfo, accessToken, refreshToken} = response.data; // 서버로부터 받은 user 데이터


      await AsyncStorage.setItem('@user:userInfo', JSON.stringify(userInfo));
      console.log('[SignIn] AsyncStorage: userInfo 저장 완료');
      console.log('[SignIn] userInfo = ', userInfo);

      await AsyncStorage.setItem('accessToken', accessToken);
      console.log('[SignIn] AsyncStorage: accessToken 저장 완료');
      console.log('[SignIn] accessToken = ', accessToken);

      await AsyncStorage.setItem('refreshToken', refreshToken);
      console.log('[SignIn] AsyncStorage: refreshToken 저장 완료');
      console.log('[SignIn] refreshToken = ', refreshToken);

      setIsSignedIn(true); // 상태 업데이트
      // navigation.navigate('Main');
    } catch (error) {
      console.error('[SignIn] 로그인 에러:', error);
    }
  };

  return (
    <Container>
      <LogoContainer marginBottom={windowHeight * 0.14}>
        <TitleText>쉽고 재밌는 인지 측정</TitleText>
        <CogemLogo width={160} />
      </LogoContainer>
      <InputField
        marginBottom={windowHeight * 0.04}
        placeholder="아이디"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        onChangeText={text => setId(text)}
      />
      <InputField
        marginBottom={windowHeight * 0.04}
        placeholder="비밀번호"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <SignInButton
        onPress={handleSignIn}
        style={{marginBottom: windowHeight * 0.2}}>
        <ButtonText>로그인</ButtonText>
      </SignInButton>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <SignUpText>COGEM이 처음이신가요? 가입하기</SignUpText>
      </TouchableOpacity>
    </Container>
  );
};

export default SignInScreen;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.marginBottom}px;
`;

const TitleText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
`;

const InputField = styled.TextInput`
  width: 100%;
  height: 36px;
  color: white;
  border-bottom-color: white;
  border-bottom-width: 1px;
  font-size: 17px;
  margin-bottom: ${props => props.marginBottom}px;
`;

const SignInButton = styled.TouchableOpacity`
  width: 100%;
  padding: 19px;
  background-color: #f18d2e;
  align-items: center;
  border-radius: 28px;
  margin-top: 28px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;

const SignUpText = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;
