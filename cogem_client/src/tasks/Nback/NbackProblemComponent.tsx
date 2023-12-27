import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import styled from '@emotion/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {isResponseCorrect} from './NbackService';

const Container = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const Title = styled.Text({
  height: 40,
  lineHeight: 50,
  fontSize: 24,
  fontWeight: 'bold',
  color: 'gray',
});

const ContentContainer = styled.View({
  marginBottom: 100,
  flex: 1,
  justifyContent: 'center', // 내부 컨텐츠를 중앙에 배치
  alignItems: 'center',
  width: '100%',
});

const PauseDescription = styled.Text({
  fontSize: 16,
  lineHeight: 20,
  fontWeight: '500',
  color: 'white',
  marginBottom: 30,
});

const PositionText = styled.Text({
  fontSize: 20,
  lineHeight: 20,
  fontWeight: '500',
  color: 'white',
  marginBottom: 30,
});

const ProgressBarContainer = styled.View(props => ({
  height: 10,
  width: props.width,
  borderColor: '#000',
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: '#E0E0E0', // 바의 배경색
}));

const ProgressBar = styled(Animated.View)(props => ({
  height: '100%',
  backgroundColor: props.color,
}));

const CharContainer = styled.View(props => ({
  width: props.width,
  height: props.height,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12, // 모서리 둥글게
  marginTop: 20,
  borderWidth: 2,
  borderColor: '#E0E0E0',
}));

const PauseText = styled.Text({
  fontSize: 32,
  fontWeight: '400',
  color: 'black',
});

const CharText = styled.Text(props => ({
  fontSize: 58,
  fontWeight: 'bold',
  color: props.color || 'black',
}));

const AnswerText = styled.Text({
  height: 30,
  fontSize: 24,
  fontWeight: '700',
  color: '#f18d2e',
  marginVertical: 15,
});

const ResponseContainer = styled.View({
  flexDirection: 'row',
});

const Button = styled.TouchableOpacity(props => ({
  paddingVertical: 12,
  paddingHorizontal: 20,
  margin: 10,
  backgroundColor: props.disabled ? '#CCC' : 'white',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
}));

const OXText = styled.Text({
  fontSize: 44,
  fontWeight: '600',
  margin: 20,
});

const ButtonText = styled.Text({
  fontSize: 15,
  fontWeight: '400',
  color: 'gray',
});

const NbackProblemComponent = ({
  sequenceLength,
  nLevel,
  sequence,
  isPaused,
  setIsPaused,
  currentPosition,
  setCurrentPosition,
  color,
  userResponse,
  setUserResponse,
  onUserTimeOver,
  isAnswered,
  setIsAnswered,
  answerText,
  setAnswerText,
  endTask,
}) => {
  const currentChar = sequence[currentPosition]; // 보여줄 알파벳
  const startTime = Date.now(); // 문제 보여지는 시각 (ms단위)
  const notCount = 3 + nLevel; // 사용자가 응답할 수 없는 sequence의 item 수
  // position과 같은 index계산할 땐 -1 필요

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // timer bar 너비를 관리하는 상태
  const progress = useSharedValue(0);

  // 타이머 바 스타일
  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const timerRef = useRef(); // 타이머 참조를 저장

  useEffect(() => {
    if (isPaused) {
      // 만약 일시정지 상태라면
      timerRef.current = setTimeout(async () => {
        setIsPaused(false); // 일시정지 해제
        setIsAnswered(false); // 버튼 클릭 가능하게
        setAnswerText(''); // 정답 텍스트 초기화
        setCurrentPosition(currentPosition + 1); // 문제 번호 +1
      }, 1000);
      return () => clearTimeout(timerRef);
    } else if (currentPosition < 3) {
      timerRef.current = setTimeout(() => {
        setCurrentPosition(currentPosition + 1);
      }, 1000);
      return () => clearTimeout(timerRef);
    } else if (currentPosition < sequence.length) {
      progress.value = 0; // 타이머 초기화
      progress.value = withTiming(1, {
        duration: 2000,
        easing: Easing.linear, // 균일한 속도로 애니메이션 진행
      }); // 2초 동안 가득 차게 애니메이션 적용
      timerRef.current = setTimeout(() => {
        onUserTimeOver(currentPosition, startTime);
        setIsPaused(true); // 일시 정지 상태로 전환
      }, 2000);
      return () => {
        // 컴포넌트가 언마운트되거나 currentPosition이 변경될 때 타이머 정리
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    } else if (sequence.length !== 0 && currentPosition === sequence.length) {
      endTask();
    }
  }, [currentPosition, sequence, isPaused]);

  const handleUserResponse = (position, response) => {
    const endTime = Date.now();
    const reactionTime = endTime - startTime; // 반응 시간 계산
    const correct = isResponseCorrect(
      response,
      currentPosition,
      nLevel,
      sequence,
    );
    // 사용자 반응을 배열에 추가
    setUserResponse([
      ...userResponse,
      {
        char: sequence[currentPosition],
        position: position - (notCount - 1),
        response,
        reactionTime,
        correct,
        timeover: false,
      },
    ]);
    if (correct) {
      console.log(
        `[${position - (notCount - 1)}] CORRECT!! reactionTime: `,
        reactionTime,
      );
    } else {
      console.log(
        `[${position - (notCount - 1)}] INCORRECT!! reactionTime: `,
        reactionTime,
      );
    }
    // 기존 timer 있으면 취소
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // 2초 후 타이머 재설정 (기존의 timer와 다른점: timeover 함수 X)
    timerRef.current = setTimeout(() => {
      setIsPaused(true); // 일시 정지 상태로
    }, 2000 - (Date.now() - startTime)); // 사용자 응답 시간 고려

    setIsAnswered(true); // 응답 상태 변환
    setAnswerText(correct ? '정답입니다' : '오답입니다');
  };

  return (
    <Container>
      <Title>{nLevel}-back</Title>
      <ContentContainer>
        {isPaused ? (
          <PauseDescription>잠깐 대기 (1s)</PauseDescription>
        ) : (
          <PositionText>
            {currentPosition > notCount - 1
              ? `${currentPosition - (notCount - 1)}/${sequenceLength}`
              : currentPosition > 2
              ? `${currentPosition - 2}번째 (곧 시작됩니다!)`
              : '준비'}
          </PositionText>
        )}
        {currentPosition > 2 && (
          <ProgressBarContainer width={windowWidth * 0.8}>
            <ProgressBar style={progressBarStyle} color={color} />
          </ProgressBarContainer>
        )}
        <CharContainer width={windowWidth * 0.8} height={windowHeight * 0.25}>
          {isPaused ? (
            <PauseText>+</PauseText>
          ) : (
            <CharText color={color}>{currentChar}</CharText>
          )}
        </CharContainer>
        <AnswerText>{answerText}</AnswerText>
        <ResponseContainer>
          <Button
            onPress={() => handleUserResponse(currentPosition, true)}
            disabled={isAnswered}>
            <OXText>O</OXText>
            <ButtonText>{nLevel}번 째 전과 일치</ButtonText>
          </Button>
          <Button
            onPress={() => handleUserResponse(currentPosition, false)}
            disabled={isAnswered}>
            <OXText>X</OXText>
            <ButtonText>{nLevel}번 째 전과 불일치</ButtonText>
          </Button>
        </ResponseContainer>
      </ContentContainer>
    </Container>
  );
};

export default NbackProblemComponent;
