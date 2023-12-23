import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function CognitiveTrainingTodayButton({onPress}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: '#11214C',
        },
      ]}
      onPress={onPress}>
      <Text style={styles.mainText}>오늘의 훈련</Text>
      <Text style={styles.subText}>
        오늘의 훈련을 통해 인지를 강화하세요.{'\n'}매일, 하루에 몇 번이든
        좋습니다.
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 360,
    height: 170,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
    margin: 5,
  },
  mainText: {
    fontSize: 25,
    fontWeight: '500',
    color: 'white',
    margin: 23,
  },
  subText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
    marginLeft: 23,
  },
});
