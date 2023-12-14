import React, {useState} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';
import RadioButton from './RadioButton';

const ButtonsView = styled.View`
  display: flex;
  flex-direction: row;
  width: ${props => props.width}px;
  height: 34px;
  justify-content: space-between;
  align-items: center;
`;

const ClickButtons = ({selected, onSelect, disabled, width}) => {
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
        <RadioButton
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

export default ClickButtons;
