import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import styled from '@emotion/native';

const TouchableSkip = styled.TouchableOpacity`
  justify-content: center;
  height: 30px;
`;

const SkipText = Animated.createAnimatedComponent(Text);

export default function SurveySkipButton({
  onSelect,
  skipType,
  selected,
  disabled,
}) {
  let skip_text;
  const isSelected = selected === skipType;
  console.log('selected ', selected);
  console.log('skipType ', selected);
  console.log('isSelected ', isSelected);
  if (skipType === 'skip_next') {
    skip_text = '다음에 풀게요';
  }
  if (skipType === 'skip_no') {
    skip_text = '도움 안되는 것 같아요';
  }
  const animatedStyles = useAnimatedStyle(() => {
    const fontSize = isSelected ? 15 : disabled ? 13 : 14;
    const fontColor = isSelected
      ? 'white'
      : disabled
      ? 'rgba(255,255,255,0.5)'
      : 'white';
    return {
      fontSize: withTiming(fontSize, {duration: 300}),
      color: withTiming(fontColor, {duration: 300}),
    };
  }, [isSelected, disabled]);
  return (
    <TouchableSkip onPress={onSelect} disabled={disabled}>
      <SkipText style={animatedStyles}>{skip_text}</SkipText>
    </TouchableSkip>
  );
}
