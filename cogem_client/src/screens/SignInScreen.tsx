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

const SignInScreen = () => {
  const [Id, setId] = useState('');
  const [Password, setPassword] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
      <SignInButton style={{marginBottom: windowHeight * 0.2}}>
        <ButtonText>로그인</ButtonText>
      </SignInButton>
      <TouchableOpacity>
        <SignUpText>COGEM이 처음이신가요? 가입하기</SignUpText>
      </TouchableOpacity>
    </Container>
  );
};

export default SignInScreen;
