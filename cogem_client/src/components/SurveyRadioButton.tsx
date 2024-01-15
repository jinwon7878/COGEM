import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import UncheckedButton from '../assets/svg/radio_unchecked.svg';
import CheckedButton from '../assets/svg/radio_checked.svg';
import styled from '@emotion/native';

const TouchableButton = styled.TouchableOpacity`
  align-items: center;
  justify-contetn: center;
`;

const LabelText = styled.Text`
  color: ${props => props.color};
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const SurveyRadioButton = ({
  isSelected,
  onPress,
  disabled,
  strokeColor,
  label,
}) => {
  // 버튼 크기를 결정하는 animated style
  const buttonStyle = useAnimatedStyle(() => {
    const buttonSize = isSelected ? 34 : disabled ? 24 : 26;
    return {
      width: withTiming(buttonSize, {duration: 300}),
      height: withTiming(buttonSize, {duration: 300}),
      position: 'absolute', // 절대 위치 사용
      top: isSelected ? withTiming(-5, {duration: 300}) : 0, // 선택된 경우 size 변화만큼 위로 이동
    };
  }, [isSelected, disabled]);
  // 라벨 투명도 결정 animated style
  const labelStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSelected ? 1 : 0, {duration: 300}),
    };
  }, [isSelected]);
  return (
    <View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableButton onPress={onPress} disabled={disabled}>
        <Animated.View style={buttonStyle}>
          {isSelected ? (
            <CheckedButton
              width={buttonStyle.width}
              height={buttonStyle.height}
              fill={strokeColor}
            />
          ) : (
            <UncheckedButton
              width={buttonStyle.width}
              height={buttonStyle.height}
              stroke={strokeColor}
            />
          )}
        </Animated.View>
        <Animated.View
          style={[labelStyle, {position: 'absolute', bottom: -10}]}>
          <LabelText color={strokeColor}>{label}</LabelText>
        </Animated.View>
      </TouchableButton>
    </View>
  );
};

export default SurveyRadioButton;
