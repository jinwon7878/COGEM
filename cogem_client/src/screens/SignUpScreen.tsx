import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import styled from '@emotion/native';
import CogemLogo from '../assets/svg/cogem_logo.svg';
import axiosInstance from '../axiosInstance';

const SignUpScreen = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(''); // 날짜 형식 "YYYY-MM-DD"
  const [gender, setGender] = useState(''); // '남' 또는 '여'
  const [isKAIST, setIsKAIST] = useState(null); // true: 카이스트 내부, false: 카이스트 외부

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const isPasswordMatch = password === confirmPassword;

  const handleSignUp = async () => {
    // 날짜 형식이 YYYY-MM-DD인지 확인하는 정규 표현식
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (
      !id ||
      !password ||
      !name ||
      !birthdate ||
      !gender ||
      isKAIST === null
    ) {
      Alert.alert(
        '',
        '모든 필드를 채워주세요.',
        [{text: '확인', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      return;
    } else if (!isPasswordMatch) {
      Alert.alert(
        '', // 제목 부분을 비워둠
        '비밀번호가 일치하지 않습니다.',
        [{text: '확인', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      return;
    } else if (!dateRegex.test(birthdate)) {
      Alert.alert(
        '',
        '생년월일 형식을 확인해주세요\n(YYYY-MM-DD).',
        [{text: '확인', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      return;
    } else {
      try {
        const response = await axiosInstance.post(
          'http://localhost:8080/user/signup',
          {
            id,
            password,
            name,
            birthdate,
            gender,
            isKAIST,
          },
        );
        if (response.status === 200) {
          // 회원가입 성공 처리
          Alert.alert(
            '',
            '회원가입이 완료되었습니다!',
            [{text: '확인', onPress: () => navigation.navigate('SignIn')}],
            {cancelable: false},
          );
        }
      } catch (error) {
        if (error.response) {
          // 서버에서 응답을 받았지만, 에러가 발생한 경우
          Alert.alert(
            '', // 제목 부분을 비워둠
            'Error: ' + error.response.data.message,
            [{text: '확인', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        } else if (error.request) {
          // 요청이 이루어졌으나 응답을 받지 못한 경우
          Alert.alert(
            '', // 제목 부분을 비워둠
            '서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.',
            [{text: '확인', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        } else {
          // 요청 설정 중 발생한 오류
          Alert.alert(
            '', // 제목 부분을 비워둠
            '오류 발생: ' + error.message,
            [{text: '확인', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      }
    }
  };

  return (
    <Container>
      <InputField
        marginTop={windowHeight * 0.12}
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
      <InputField
        marginBottom={windowHeight * 0.04}
        placeholder="비밀번호 확인"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        secureTextEntry={true}
        onChangeText={text => setConfirmPassword(text)}
      />
      <InputField
        marginBottom={windowHeight * 0.04}
        placeholder="이름 (닉네임)"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        onChangeText={text => setName(text)}
      />
      <InputField
        marginBottom={windowHeight * 0.04}
        placeholder="생년월일 (YYYY-MM-DD)"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        onChangeText={text => setBirthdate(text)}
      />
      <GenderContainer marginBottom={windowHeight * 0.04}>
        <GenderButton onPress={() => setGender('남')}>
          <GenderButtonText selected={gender === '남'}>남</GenderButtonText>
        </GenderButton>
        <GenderButton onPress={() => setGender('여')}>
          <GenderButtonText selected={gender === '여'}>여</GenderButtonText>
        </GenderButton>
      </GenderContainer>
      <AffiliationContainer marginBottom={windowHeight * 0.04}>
        <AffiliationButton onPress={() => setIsKAIST(true)}>
          <AffiliationButtonText selected={isKAIST === true}>
            카이스트 내부
          </AffiliationButtonText>
        </AffiliationButton>
        <AffiliationButton onPress={() => setIsKAIST(false)}>
          <AffiliationButtonText selected={isKAIST === false}>
            카이스트 외부
          </AffiliationButtonText>
        </AffiliationButton>
      </AffiliationContainer>
      <SignUpButton
        onPress={handleSignUp}
        style={{marginBottom: windowHeight * 0.2}}>
        <ButtonText>회원가입</ButtonText>
      </SignUpButton>
    </Container>
  );
};

export default SignUpScreen;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const InputField = styled.TextInput`
  width: 100%;
  height: 36px;
  color: white;
  border-bottom-color: white;
  border-bottom-width: 1px;
  font-size: 17px;
  margin-top: ${props => props.marginTop}px;
  margin-bottom: ${props => props.marginBottom}px;
`;

const GenderContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${props => props.marginBottom}px;
`;

const GenderButton = styled.TouchableOpacity`
  padding: 20px;
  margin-horizontal: 20px;
`;

const GenderButtonText = styled.Text`
  color: ${props => (props.selected ? '#f18d2e' : 'white')};
  font-weight: ${props => (props.selected ? '800' : '300')};
  font-size: 18px;
`;

const AffiliationContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${props => props.marginBottom}px;
`;

const AffiliationButton = styled.TouchableOpacity`
  padding: 10px;
  margin-horizontal: 10px;
`;

const AffiliationButtonText = styled.Text`
  color: ${props => (props.selected ? '#f18d2e' : 'white')};
  font-weight: ${props => (props.selected ? '800' : '300')};
  font-size: 16px;
`;
const SignUpButton = styled.TouchableOpacity`
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
