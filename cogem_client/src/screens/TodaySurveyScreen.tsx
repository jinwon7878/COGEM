import {Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import SurveyClickButtons from '../components/SurveyClickButtons';
import SurveySkipButton from '../components/SurveySkipButton';
import styled from '@emotion/native';
import {
  getLastQuestionData,
  setLastQuestionData,
} from '../utils/LastQuestionData';
import surveyData from '../assets/surveyData.json';
import {toKoreaISOString} from '../utils/KoreaTime';
import axiosInstance from '../axiosInstance';

// import axios from 'axios';
// import CustomActivityIndicator from '../components/CustomActivityIndicator';

const TOTAL_QUESTIONS = 12;

const getQuestionText = (questionId, surveyQuestions) => {
  const question = surveyQuestions.find(q => q.question_id === questionId);
  return question ? question.question_val : '';
};

const TodaySurveyScreen = () => {
  const [questionId, setQuestionId] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(1);
  const [showTime, setShowTime] = useState(null); // 문제 나타난 시간 (Date.now() -> ms 단위로 저장)
  const questionText = getQuestionText(questionId, surveyData);

  // UI update
  const [selectedButton, setSelectedButton] = useState(null); // null -> 0~5, 'skip_next', 'skip_no'
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  // const [isSurveyFinish, setIsSurveyFinish] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const initializeSurvey = async () => {
      // setIsLoading(true);
      let fetchedData = await getLastQuestionData();
      const todayTime = toKoreaISOString(new Date()); // 'YYYY-MM-DD:mm:ss:sss+09:000
      const todayDate = todayTime.slice(0, 10); // 'YYYY-MM-DD'
      setShowTime(Date.now()); // ms 단위로 저장, reaction time 계산용

      console.log('TodaySurvey Rendering! ', fetchedData);
      console.log('todayTime(show) is ', todayTime);
      console.log('todayDate(show) is ', todayDate);
      if (fetchedData.lastEnterDate !== todayDate) {
        await setLastQuestionData(
          fetchedData.lastQuestionId || 1,
          todayDate,
          1,
        ); // 최근 접속이 오늘이 아니면, 날짜 업데이트 + 현재 문제 1번째로 설정
        fetchedData = await getLastQuestionData();
      }
      // 최근 접속이 오늘이면 AsyncStorage 업데이트는 필요 X
      console.log(
        'update lastQuestionData (AsyncStorage & State)! ',
        fetchedData,
      );
      setQuestionId(fetchedData.lastQuestionId);
      setCurrentOrder(fetchedData.currentSurveyOrder);

      // setIsLoading(false); // 로딩 완료
    };

    initializeSurvey();
  }, [currentOrder]);

  const handleAnswer = async selectedAnswer => {
    if (!isButtonDisabled) {
      // setIsLoading(true);
      setSelectedButton(selectedAnswer); // 0~5 or 'skip_next/no'
      setIsButtonDisabled(true); // 버튼 비활성화
      // 현재 질문 번호와 날짜: currentOrder, questionId
      const currentTime = Date.now(); // ms 단위 (reaction time 계산용)
      const today = toKoreaISOString(new Date()); // 'YYYY-MM-DD:mm:ss:sss+09:000 (한국 날짜 및 시간)
      console.log('Today Click!! : ', today);
      const skip_no = selectedAnswer === 'skip_no';
      const skip_next = selectedAnswer === 'skip_next';
      const time_spend = currentTime - showTime; // ms 단위
      console.log('user spend time for solving!! (ms) : ', time_spend);
      try {
        // 답변 전송
        await axiosInstance.post('http://localhost:8080/answer', {
          question_id: questionId,
          skip_next: skip_next,
          skip_no: skip_no,
          answer: skip_no || skip_next ? null : selectedAnswer,
          time_ans: today,
          time_spend: time_spend, // ms 단위
          // user_id 추가 필요
        });
        console.log('[req] question_id: ', questionId);
        console.log('[req] skip_next: ', skip_next);
        console.log('[req] skip_no: ', skip_no);
        console.log(
          '[req] answer: ',
          `${skip_no || skip_next ? null : selectedAnswer}`,
        );
        console.log('[req] time_ans: ', today);
        console.log('[req] time_spend: ', time_spend);
        // 답변 성공 후 다음 질문으로 이동하기 위한 상태 업데이트
        const nextQuestionId = questionId + 1; // 로직 수정 필요 (카테고리 골고루)
        const nextQuestionNumber = currentOrder + 1;
        await setLastQuestionData(
          nextQuestionId,
          today.slice(0, 10), // XXXX-XX-XX
          nextQuestionNumber,
        ); // 다음 질문 ID로 업데이트
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => {
        setSelectedButton(null); // 다음 문제를 위해 선택된 버튼 초기화
        setIsButtonDisabled(false); // 버튼 다시 활성화
        setCurrentOrder(currentOrder + 1); // useEffect 사용
      }, 1000);
      // setIsLoading(false);
    }
  };

  // if (isLoading) {
  //   return <CustomActivityIndicator size="large" color="#7240FF" />;
  // }

  return (
    <Container>
      <QuestionContainer width={windowWidth * 0.85}>
        <QuestionText>{questionText}</QuestionText>
      </QuestionContainer>
      <ButtonContainer marginBottom={windowHeight * 0.1}>
        <SurveyClickButtons
          selected={selectedButton}
          onSelect={handleAnswer}
          disabled={isButtonDisabled}
          width={windowWidth * 0.72}
        />
      </ButtonContainer>
      <QuestionCounterContainer marginBottom={windowHeight * 0.08}>
        <CurrentOrderText isCompleted={currentOrder > TOTAL_QUESTIONS}>
          {currentOrder}
        </CurrentOrderText>
        {currentOrder <= TOTAL_QUESTIONS && (
          <TotalQuestionsText>/{TOTAL_QUESTIONS}</TotalQuestionsText>
        )}
      </QuestionCounterContainer>
      <SkipContainer
        marginBottom={windowHeight * 0.15}
        marginRight={windowWidth * 0.05}>
        <SurveySkipButton
          onSelect={() => handleAnswer('skip_next')}
          skipType={'skip_next'}
          selected={selectedButton}
          disabled={isButtonDisabled}
        />
        <SurveySkipButton
          onSelect={() => handleAnswer('skip_no')}
          skipType={'skip_no'}
          selected={selectedButton}
          disabled={isButtonDisabled}
        />
      </SkipContainer>
    </Container>
  );
};
export default TodaySurveyScreen;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const QuestionContainer = styled.View`
  margin: 100px 0;
  width: ${props => props.width}px;
  flex-grow: 1;
  justify-content: center;
`;

const QuestionText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: white;
  text-align: center;
`;

const ButtonContainer = styled.View`
  margin-bottom: ${props => props.marginBottom}px;
`;

const QuestionCounterContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${props => props.marginBottom}px;
`;

const SkipContainer = styled.View`
  height: 72px;
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
  align-self: flex-end;
  margin-right: ${props => props.marginRight}px;
  margin-bottom: ${props => props.marginBottom}px;
`;

const CurrentOrderText = styled.Text`
  font-size: 30px;
  color: ${props => (props.isCompleted ? '#FAAE1B' : 'white')};
  text-align: center;
  margin-right: 5px;
`;

const TotalQuestionsText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-bottom: 5px;
`;