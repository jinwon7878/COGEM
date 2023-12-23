import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const NbackProblemComponent = ({
  sequence,
  currentPosition,
  setCurrentPosition,
  color,
  onUserResponse,
  onUserTimeOver,
  endTask,
}) => {
  const currentChar = sequence[currentPosition]; // 보여줄 알파벳
  const startTime = Date.now(); // 문제 보여지는 시각 (ms단위)

  console.log(
    'NbackComponent Rendering!! currentPosition is ',
    currentPosition,
  );

  useEffect(() => {
    if (currentPosition < sequence.length) {
      const timer = setTimeout(() => {
        onUserTimeOver(currentPosition, startTime);
        setCurrentPosition(currentPosition + 1); // 다음 문자로 이동
      }, 2000); // 2초 후엔 timeover 정보 부모로 보냄 + 다음 문자로 이동

      return () => clearTimeout(timer);
    } else if (sequence.length !== 0 && currentPosition === sequence.length) {
      endTask();
    }
  }, [currentPosition, sequence]);

  return (
    <View style={styles.charContainer}>
      <Text style={[styles.charText, {color: color}]}>{currentChar}</Text>
      <View style={styles.responseContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onUserResponse(currentPosition, true, startTime)}>
          <Text>Match</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onUserResponse(currentPosition, false, startTime)}>
          <Text>Non-Match</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  charContainer: {
    padding: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'white',
  },
  charText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  responseContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default NbackProblemComponent;
