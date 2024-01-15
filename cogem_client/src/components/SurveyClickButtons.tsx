import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styled from '@emotion/native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import SurveyRadioButton from './SurveyRadioButton';

const ButtonsView = styled.View`
  display: flex;
  flex-direction: row;
  width: ${props => props.width}px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
`;

const LabelsView = styled.View`
  width: ${props => props.width}px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const SurveyClickButtons = ({selected, onSelect, disabled, width}) => {
  const colors = [
    '#7240FF',
    '#865BFF',
    '#AB8EFF',
    '#9FC4D0',
    '#63DAFF',
    '#00C0FC',
  ];
  const labels = [
    '전혀 아니다',
    '아니다',
    '약간 아니다',
    '약간 그렇다',
    '그렇다',
    '매우 그렇다',
  ];

  // LabelsView의 Animated 스타일을 정의
  const animatedLabelsStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(selected === null ? 1 : 0, {duration: 300}),
      height: withTiming(selected === null ? 20 : 20, {duration: 300}), // 높이 고정시켜 버튼 이동 방지
    };
  }, [selected]);

  return (
    <>
      <ButtonsView width={width}>
        {colors.map((color, index) => (
          <SurveyRadioButton
            key={index}
            isSelected={selected === index}
            onPress={() => onSelect(index)}
            disabled={disabled}
            strokeColor={color}
            label={labels[index]}
          />
        ))}
      </ButtonsView>
      <Animated.View
        style={[
          animatedLabelsStyle,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            bottom: -10,
          },
        ]}>
        <Text style={{color: '#8155FF'}}>{'전혀 아니다'}</Text>
        <Text style={{color: '#00C0FC'}}>{'매우 그렇다'}</Text>
      </Animated.View>
    </>
  );
};

export default SurveyClickButtons;
