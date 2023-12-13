import React from 'react';
import {TouchableOpacity} from 'react-native';
import UncheckedButton from '../assets/svg/radio_unchecked.svg';
import CheckedButton from '../assets/svg/radio_checked.svg';

const RadioButton = ({isSelected, onPress, disabled, strokeColor}) => {
  const ButtonIcon = isSelected ? CheckedButton : UncheckedButton;
  const size = isSelected ? 32 : 26;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <ButtonIcon
        width={size}
        height={size}
        stroke={strokeColor}
        fill={isSelected ? strokeColor : 'none'}
      />
    </TouchableOpacity>
  );
};

export default RadioButton;
