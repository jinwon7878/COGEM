import React, {useState} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';
import RadioButton from './RadioButton';

const ButtonsView = styled.View`
  display: flex;
  flex-direction: row;
  width: 266px;
  height: auto;
  justify-content: space-between;
  align-items: center;
`;

const ClickButtons = ({selected, onSelect}) => {
  const colors = [
    '#7240FF',
    '#865BFF',
    '#AB8EFF',
    '#9FC4D0',
    '#63DAFF',
    '#00C0FC',
  ];

  return (
    <ButtonsView>
      {colors.map((color, index) => (
        <RadioButton
          key={index}
          isSelected={selected === index}
          onPress={() => onSelect(index)}
          strokeColor={color}
        />
      ))}
    </ButtonsView>
  );
};

export default ClickButtons;
