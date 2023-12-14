import {View} from 'react-native';
import React, {useState} from 'react';
import styled from '@emotion/native';

import HomeHeaderProfile from '../components/HomeHeaderProfile';

import HomeHeaderTodayStatus from '../components/HomeHeaderTodayStatus';
import HomeResultBox from '../components/HomeResultBox';

// Header
const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

// ResultContainer
const ResultContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

// Button
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => (props.active ? '#060419' : 'transparent')};
  padding-vertical: 10px;
  padding-horizontal: 30px;
  border-radius: 20px;
  margin: 10px;
`;

const ButtonText = styled.Text`
  color: ${props => (props.active ? '#fff' : '#E8E8E866')};
  text-align: center;
  font-family: AppleSDGothicNeoM00;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
`;

// ResultBox - 인지만(감정은 component)
const CognitionComponent = styled.View`
  background-color: #989898;
  width: 330px;
  height: 450px;
  margin-top: 20px;
  border-radius: 20px;
`;

// Main Function
const HomeScreen = () => {
  const [selectedButton, setSelectedButton] = useState('emotion');

  const handlePress = button => {
    setSelectedButton(button);
  };
  return (
    <View>
      <HeaderContainer>
        <HomeHeaderProfile />
        <HomeHeaderTodayStatus />
      </HeaderContainer>
      <ResultContainer>
        <ButtonContainer>
          <Button
            active={selectedButton === 'emotion'}
            onPress={() => handlePress('emotion')}>
            <ButtonText active={selectedButton === 'emotion'}>감정</ButtonText>
          </Button>
          <Button
            active={selectedButton === 'cognition'}
            onPress={() => handlePress('cognition')}>
            <ButtonText active={selectedButton === 'cognition'}>
              인지
            </ButtonText>
          </Button>
        </ButtonContainer>
        {selectedButton === 'emotion' && <HomeResultBox />}
        {selectedButton === 'cognition' && <CognitionComponent />}
      </ResultContainer>
    </View>
  );
};

export default HomeScreen;
