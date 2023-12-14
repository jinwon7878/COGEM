import React from 'react';
import {TouchableOpacity} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import UncheckedButton from '../assets/svg/radio_unchecked.svg';
import CheckedButton from '../assets/svg/radio_checked.svg';
import styled from '@emotion/native';

const TouchableButton = styled.TouchableOpacity`
  align-items: center;
  justify-contetn: center;
`;

const RadioButton = ({isSelected, onPress, disabled, strokeColor}) => {
  const animatedStyles = useAnimatedStyle(() => {
    const buttonSize = isSelected ? 34 : disabled ? 24 : 26;
    return {
      width: withTiming(buttonSize, {duration: 300}),
      height: withTiming(buttonSize, {duration: 300}),
    };
  }, [isSelected, disabled]);
  return (
    <TouchableButton onPress={onPress} disabled={disabled}>
      <Animated.View style={animatedStyles}>
        {isSelected ? (
          <CheckedButton
            width={animatedStyles.width}
            height={animatedStyles.height}
            fill={strokeColor}
          />
        ) : (
          <UncheckedButton
            width={animatedStyles.width}
            height={animatedStyles.height}
            stroke={strokeColor}
          />
        )}
      </Animated.View>
    </TouchableButton>
  );
};

export default RadioButton;
