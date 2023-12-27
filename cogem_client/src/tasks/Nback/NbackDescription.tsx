import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from '@emotion/native';

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

export default function NbackDescription({navigation, route}) {
  const {nLevel} = route.params;
  const handleTask = () => {
    navigation.navigate('NbackTask', {nLevel: nLevel});
  };
  return (
    <View>
      <StyledButton onPress={handleTask}>
        <ButtonText>{nLevel} back 시도</ButtonText>
      </StyledButton>
    </View>
  );
}
