import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from '@emotion/native';

const Container = styled.View`
  height: 100%;
  padding-top: 100px;
  padding-bottom: 300px;
  align-items: center;
  justify-content: space-between;
`;

const NbackText = styled.Text`
  color: white;
  font-size: 32px;
  text-align: center;
  margin: 50px;
`;

const AccuracyText = styled.Text`
  color: white;
  font-size: 24px;
  text-align: center;
`;

const SubText = styled.Text`
  color: white;
  font-size: 14px;
  text-align: center;
  margin-top: 40px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: white;
  width: 350px;
  height: 60px;
  border-radius: 24px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  text-align: center;
  font-weight: 400;
`;

export default function NbackResult({navigation, route}) {
  const {accuracy, nLevel, userResponse} = route.params;
  console.log('accuracy is ', accuracy);
  console.log('userResponse: ', userResponse);
  const roundedAccuracy = Math.round(accuracy * 10) / 10;
  return (
    <Container>
      <NbackText>{nLevel} - back</NbackText>
      <AccuracyText>당신의 정확도는 {roundedAccuracy} % 입니다!</AccuracyText>
      {accuracy < 50 && (
        <SubText>
          정확도가 50% 이상이어야, 다음 n-back에 도전할 수 있어요!
        </SubText>
      )}
      <StyledButton onPress={() => navigation.navigate('Home')}>
        <ButtonText>이제 홈으로 갈래요!</ButtonText>
      </StyledButton>
      {nLevel < 5 && accuracy >= 50 && (
        <StyledButton
          onPress={() =>
            navigation.navigate('NbackTask', {nLevel: nLevel + 1})
          }>
          <ButtonText>다음 {nLevel + 1}-back 에 도전할래요!</ButtonText>
        </StyledButton>
      )}
    </Container>
  );
}
