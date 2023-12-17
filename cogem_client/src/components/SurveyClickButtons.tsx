import React, {useState} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';
import SurveyRadioButton from './SurveyRadioButton';

const ButtonsView = styled.View`
  display: flex;
  flex-direction: row;
  width: ${props => props.width}px;
  height: 34px;
  justify-content: space-between;
  align-items: center;
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

  return (
    <ButtonsView width={width}>
      {colors.map((color, index) => (
        <SurveyRadioButton
          key={index}
          isSelected={selected === index}
          onPress={() => onSelect(index)}
          disabled={disabled}
          strokeColor={color}
        />
      ))}
    </ButtonsView>
  );
};

export default SurveyClickButtons;
