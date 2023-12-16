import {TouchableOpacity, Text} from 'react-native';
import React from 'react';

export default function SurveySkipButton({onSkip}) {
  return (
    <TouchableOpacity onPress={onSkip}>
      <Text style={{color: 'white'}}>도움 안되는 것 같아요</Text>
    </TouchableOpacity>
  );
}
