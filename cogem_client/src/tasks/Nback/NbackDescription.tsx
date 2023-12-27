import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {getColorForLevel} from './NbackService';

const Container = styled.View`
  margin: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.TouchableOpacity`
  margin-bottom: 20px;
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

const DescriptionContainer = styled.View`
  background-color: #fff;
  padding: 24px;
  border-radius: 24px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
`;

const SubText = styled.Text`
  font-size: 15px;
  color: #333;
  margin-bottom: 10px;
`;

const InstructionText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const NumberText = styled.Text`
  font-weight: bold;
`;

const HighlightText = styled.Text(props => ({
  fontWeight: 'bold',
  color: props.color || '#2a9d8f',
}));

export default function NbackDescription({navigation, route}) {
  const {nLevel, sequenceLength, sequenceType} = route.params;
  const color = getColorForLevel(nLevel);
  const handleTask = () => {
    navigation.navigate('NbackTask', {
      nLevel: nLevel,
      sequenceLength: sequenceLength,
      sequenceType: sequenceType,
    });
  };
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Container>
        <StyledButton onPress={handleTask}>
          <ButtonText>{nLevel} back 시도하기!</ButtonText>
        </StyledButton>
        <DescriptionContainer>
          <Title>{nLevel}-Back 테스트 설명</Title>
          <SubText>
            {'\n'}
            <HighlightText color={color}>{nLevel}-Back 테스트</HighlightText>는,
            화면에 나타나는 문자가 {nLevel}번째 이전의 문자와 일치하는지
            판단하는 테스트입니다.
            {'\n'}
          </SubText>
          <InstructionText>
            <NumberText>1.</NumberText>
            {'\n\n'}처음 {nLevel} 개의 제시되는 문자를 기억합니다.{'\n'}
          </InstructionText>
          <InstructionText>
            <NumberText>2.</NumberText>
            {'\n\n'}
            {nLevel + 1}번째 제시되는 문자부터, 제시되는 문자가 {nLevel}번째
            전의 문자와 같은지 판단합니다.{'\n'}
          </InstructionText>
          <InstructionText>
            <NumberText>3.</NumberText>
            {'\n\n'}제시된 문자가 {nLevel}번째 이전의 문자와 {'\n'}
            같다면 <HighlightText color={color}>'O' 버튼</HighlightText>,{'\n'}
            같지 않다면 <HighlightText color={color}>'X' 버튼</HighlightText>을
            누르세요!
            {'\n'}
          </InstructionText>
          <InstructionText>
            <NumberText>4.</NumberText>
            {'\n\n'}총 {sequenceLength + nLevel} 개의 문자가 제시되며, 버튼을
            누르는 문제는{' '}
            <HighlightText color={color}>{sequenceLength} 개</HighlightText>{' '}
            제시됩니다. 문자는{' '}
            <HighlightText color={color}>
              {sequenceType === 'E-a'
                ? '영어 알파벳'
                : sequenceType === 'K-a'
                ? '한글'
                : sequenceType === 'K-c'
                ? '한글 자음'
                : sequenceType === 'K-v'
                ? '한글 모음'
                : sequenceType === 'N'
                ? '숫자'
                : sequenceType === 'E-a:K-a'
                ? '영어 알파벳 + 한글'
                : sequenceType === 'E-a:K-c'
                ? '영어 알파벳 + 한글 자음'
                : sequenceType === 'E-a:K-v'
                ? '영어 알파벳 + 한글 모음'
                : sequenceType === 'E-a:N'
                ? '영어 알파벳 + 숫자'
                : '알파벳'}
            </HighlightText>{' '}
            형태로 제공됩니다.{'\n'}
          </InstructionText>
          <InstructionText>
            <NumberText>5.</NumberText>
            {'\n\n'}1 문자당 제한 시간은{' '}
            <HighlightText color={color}>2초</HighlightText>이며, 다음 문자로
            넘어가기 전, 1초의 일시정지 시간이 존재합니다.
          </InstructionText>
        </DescriptionContainer>
      </Container>
    </ScrollView>
  );
}
