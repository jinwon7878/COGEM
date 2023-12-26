import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {generateSequence, getColorForLevel} from './NbackService';
import NbackProblemComponent from './NbackProblemComponent';

const NBackScreen = ({route, navigation}) => {
  const {nLevel} = route.params;
  const [currentColor, setCurrentColor] = useState('');
  const [sequence, setSequence] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0); // 현재 시퀀스 위치
  const [userResponse, setUserResponse] = useState([]); // 사용자 반응(결과) 배열
  const [isAnswered, setIsAnswered] = useState(false); // 사용자가 응답된 상태인지 확인
  const [answerText, setAnswerText] = useState(''); // 사용자가 정답인지 아닌지 알림
  const [isPaused, setIsPaused] = useState(false); // 일시정지(문제 사이) 상태인지 확인

  const problemLength = 20; // 사용자가 푸는 문제 개수 (64로 수정 필요)
  const notCount = 3 + nLevel; // 사용자가 응답할 수 없는 sequence의 item 수
  // position과 같은 index계산할 땐 -1 필요

  useEffect(() => {
    const newSequence = generateSequence(problemLength, nLevel); // 문제 알파벳 sequence 생성(카운트 포함)
    setSequence(newSequence);
    setCurrentColor(getColorForLevel(nLevel)); // 색상 설정과 함께 rerendering (newSequence 적용)
    // nLevel update되었을 때, 상태 초기화
    setCurrentPosition(0);
    setUserResponse([]);
    setIsAnswered(false);
    setAnswerText('');
  }, [nLevel]);

  const handleUserTimeOver = (position, startTime) => {
    // nLevel 번 째 이상부터 체크
    if (position > 2 + nLevel) {
      const endTime = Date.now();
      const reactionTime = endTime - startTime; // over 시간 계산
      setUserResponse([
        ...userResponse,
        {
          char: sequence[position],
          position: position - (notCount - 1),
          response: null,
          reactionTime: reactionTime,
          correct: false,
          timeover: true,
        },
      ]);
      console.log(
        `[${position - (notCount - 1)}] timeover!! spend-time:`,
        reactionTime,
      );
      setAnswerText('시간 초과입니다');
    }
  };

  const endTask = () => {
    // Task 끝났을 때 필요한 처리 (정확도 계산 + 결과 화면 네비게이션)
    const correctResponses = userResponse.filter(r => r.correct).length;
    navigation.navigate('NbackResult', {
      accuracy: (correctResponses / sequence.length) * 100,
      nLevel: nLevel,
      userResponse: userResponse,
    });
  };

  return (
    <NbackProblemComponent
      problemLength={problemLength}
      nLevel={nLevel}
      sequence={sequence}
      isPaused={isPaused}
      setIsPaused={setIsPaused}
      currentPosition={currentPosition}
      setCurrentPosition={setCurrentPosition}
      color={currentColor}
      userResponse={userResponse}
      setUserResponse={setUserResponse}
      onUserTimeOver={handleUserTimeOver}
      isAnswered={currentPosition < notCount || isPaused ? true : isAnswered} // nLever번째 전까진 버튼 클릭 X
      setIsAnswered={setIsAnswered}
      answerText={answerText}
      setAnswerText={setAnswerText}
      endTask={endTask}
    />
  );
};

export default NBackScreen;
