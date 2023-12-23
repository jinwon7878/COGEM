import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NbackProblemComponent from './NbackProblemComponent';

const generateSequence = length => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let newSequence = [];
  for (let i = 0; i < length; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    newSequence.push(char);
  }
  return newSequence;
};

const getColorForLevel = level => {
  const colors = ['black', 'green', 'blue', 'red', 'purple'];
  return colors[level - 1];
};

const NBackTask = ({route, navigation}) => {
  const {nLevel} = route.params;
  const [currentColor, setCurrentColor] = useState('');
  const [sequence, setSequence] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0); // 현재 시퀀스 위치
  const [userResponse, setUserResponse] = useState([]); // 사용자 반응(결과) 배열

  useEffect(() => {
    const newSequence = generateSequence(20); // 64개 수정 필요
    setSequence(newSequence);
    setCurrentColor(getColorForLevel(nLevel)); // 색상 설정과 함께 rerendering (newSequence 적용)
  }, []);

  const handleUserTimeOver = (position, startTime) => {
    const endTime = Date.now();
    const reactionTime = endTime - startTime; // 반응 시간 계산
    setUserResponse([
      ...userResponse,
      {
        char: sequence[position],
        response: null,
        reactionTime: reactionTime,
        correct: false,
        timeover: true,
      },
    ]);
    console.log(
      'timeover!! position: ',
      position,
      'spend-time: ',
      reactionTime,
    );
  };

  const handleUserResponse = (position, response, startTime) => {
    const endTime = Date.now();
    const reactionTime = endTime - startTime; // 반응 시간 계산
    const correct = isResponseCorrect(
      response,
      currentPosition,
      nLevel,
      sequence,
    );
    console.log('Nback answer!! : ', correct);

    // 사용자 반응을 배열에 추가합니다.
    setUserResponse([
      ...userResponse,
      {
        char: sequence[currentPosition],
        response,
        reactionTime,
        correct,
        timeover: false,
      },
    ]);
    if (correct) {
      console.log(
        'CORRECT!! position: ',
        position,
        'reactionTime: ',
        reactionTime,
      );
    } else {
      console.log(
        'INCORRECT!! position: ',
        position,
        'reactionTime: ',
        reactionTime,
      );
    }
    setCurrentPosition(currentPosition + 1); // currentPositioin 업데이트
  };

  // 사용자의 응답이 정답인지 검사
  const isResponseCorrect = (response, position, level, seq) => {
    if (position < level) {
      return false;
    } // 아직 n-back 조건을 만족하지 않는 경우
    return response === (seq[position - level] === seq[position]);
  };

  const endTask = () => {
    // Task 끝났을 때 필요한 처리
    // 예를 들어, 정확도를 계산하고 결과 화면으로 네비게이트 할 수 있습니다.
    const correctResponses = userResponse.filter(r => r.correct).length;
    navigation.navigate('NbackResult', {
      accuracy: (correctResponses / sequence.length) * 100,
      nLevel: nLevel,
    });
    // 결과 화면으로 navigation
  };

  return (
    <View style={styles.container}>
      <NbackProblemComponent
        sequence={sequence}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        color={currentColor}
        onUserResponse={handleUserResponse}
        onUserTimeOver={handleUserTimeOver}
        endTask={endTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  charContainer: {
    padding: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  charText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default NBackTask;
