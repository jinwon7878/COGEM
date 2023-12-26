import {View, ScrollView} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import CognitiveTrainingTodayButton from '../components/CognitiveTrainingTodayButton';
import CognitiveTrainingButton from '../components/CognitiveTrainingButton';

const RowContainer = styled.View`
  flex-direction: row; // 가로 방향으로 아이템들을 배치
  justify-content: space-around; // 아이템들 사이에 균등한 간격을 둠
`;

export default function CognitiveTrainingScreen({navigation}) {
  const handlePressTodayMission = () => {
    navigation.navigate('NbackDescription', {nLevel: 1});
  };
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <CognitiveTrainingTodayButton onPress={handlePressTodayMission} />
      <RowContainer>
        <CognitiveTrainingButton
          iconName={'memory'}
          title={'기억력'}
          color={'#FAAE1B'}
        />
        <CognitiveTrainingButton
          iconName={'attention'}
          title={'주의력'}
          color={'#FA8315'}
        />
      </RowContainer>
      <RowContainer>
        <CognitiveTrainingButton
          iconName={'emotion'}
          title={'감정인식'}
          color={'#5B5EEF'}
        />
        <CognitiveTrainingButton
          iconName={'language'}
          title={'언어능력'}
          color={'#3378EA'}
        />
      </RowContainer>
      <RowContainer>
        <CognitiveTrainingButton
          iconName={'meta'}
          title={'메타인지'}
          color={'#14B8A6'}
        />
        <CognitiveTrainingButton
          iconName={'control'}
          title={'인지제어'}
          color={'#F15C5C'}
        />
      </RowContainer>
    </ScrollView>
  );
}
