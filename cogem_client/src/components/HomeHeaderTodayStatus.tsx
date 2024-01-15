import React from 'react';
import {View, Text} from 'react-native';
import styled from '@emotion/native';

const HomeHeaderTodayStatus = () => {
  return (
    <HeaderMinorContainer>
      <TodayStatusContainer>
        <TodayStatusText>새로 완료한 설문</TodayStatusText>
        <TodayStatusText>1번째 리포트까지</TodayStatusText>
      </TodayStatusContainer>
      <TodayStatusContainer>
        <TodayStatusEquals>·</TodayStatusEquals>
        <TodayStatusEquals>·</TodayStatusEquals>
      </TodayStatusContainer>
      <TodayStatusResultContainer style={{marginRight: 18}}>
        <TodayStatusResultText>10</TodayStatusResultText>
        <TodayStatusResultText>190</TodayStatusResultText>
      </TodayStatusResultContainer>
    </HeaderMinorContainer>
  );
};

export default HomeHeaderTodayStatus;

const HeaderMinorContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TodayStatusContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
`;
const TodayStatusText = styled.Text`
  color: #acacac;
  font-family: AppleSDGothicNeoM00;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  padding: 1px;
`;
const TodayStatusEquals = styled.Text`
  color: #acacac;
  font-size: 11px;
  font-weight: 900;
  padding: 1px;
`;
const TodayStatusResultContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const TodayStatusResultText = styled.Text`
  color: #e8e8e8;
  font-family: AppleSDGothicNeoM00;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  padding: 1px;
`;
