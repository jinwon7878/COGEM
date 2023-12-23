import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
// import ArrowIcon from '../assets/svg/training_go_icon.svg';
import MemoryIcon from '../assets/svg/training_memory_icon.svg';
import AttentionIcon from '../assets/svg/training_attention_icon.svg';
import EmotionIcon from '../assets/svg/training_emotion_icon.svg';
import LanguageIcon from '../assets/svg/training_language_icon.svg';
import MetaIcon from '../assets/svg/training_meta_icon.svg';
import ControlIcon from '../assets/svg/training_control_icon.svg';

const icons = {
  memory: MemoryIcon,
  attention: AttentionIcon,
  emotion: EmotionIcon,
  language: LanguageIcon,
  meta: MetaIcon,
  control: ControlIcon,
};

const CognitiveTrainingButton = ({iconName, title, color, onPress}) => {
  const IconComponent = icons[iconName];
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      {IconComponent ? <IconComponent style={styles.icon} /> : null}
      <Text style={styles.buttonText}>{title}</Text>
      {/* <ArrowIcon style={styles.arrowIcon} /> */}
    </TouchableOpacity>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  button: {
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  icon: {
    width: 44,
    height: 44,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '500',
    color: 'white',
  },
  arrowIcon: {
    width: 32,
    height: 21,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default CognitiveTrainingButton;
