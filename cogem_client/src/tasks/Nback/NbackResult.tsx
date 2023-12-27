import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  padding-top: 200px;
  padding-bottom: 200px;
  align-items: center;
  justify-content: center;
`;

const NbackText = styled.Text`
  color: white;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const AccuracyText = styled.Text`
  color: white;
  font-size: 20px;
  text-align: center;
`;

const HighlightText = styled.Text`
  color: white;
  font-size: 28px;
  font-weight: bold;
`;

const SubText = styled.Text`
  color: white;
  font-size: 14px;
  text-align: center;
  margin-top: 30px;
`;

const ButtonContainer = styled.View`
  margin-top: 60px;
  margin-bottom: 40px;
`;

const StyledButton = styled.TouchableOpacity`
  margin: 20px;
  background-color: #f18d2e;
  width: 350px;
  height: 60px;
  border-radius: 24px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
`;

export default function NbackResult({navigation, route}) {
  const {accuracy, nLevel, sequenceLength, sequenceType, userResponse} =
    route.params;
  console.log('accuracy is ', accuracy);
  console.log('userResponse: ', userResponse);
  const roundedAccuracy = Math.round(accuracy * 10) / 10;
  return (
    <Container>
      <NbackText>{nLevel} - back</NbackText>
      <AccuracyText>
        당신의 정확도는 <HighlightText>{roundedAccuracy} %</HighlightText>{' '}
        입니다!
      </AccuracyText>
      {accuracy < 50 && (
        <SubText>
          정확도가 50% 이상이어야, 다음 n-back에 도전할 수 있어요!
        </SubText>
      )}
      <ButtonContainer>
        <StyledButton onPress={() => navigation.navigate('Home')}>
          <ButtonText>이제 홈으로 갈래요!</ButtonText>
        </StyledButton>
        {nLevel < 5 && accuracy >= 50 && (
          <StyledButton
            onPress={() =>
              navigation.navigate('NbackDescription', {
                nLevel: nLevel + 1,
                sequenceLength: sequenceLength,
                sequenceType: sequenceType,
              })
            }>
            <ButtonText>{nLevel + 1}-back 에 도전할래요!</ButtonText>
          </StyledButton>
        )}
      </ButtonContainer>
    </Container>
  );
}
