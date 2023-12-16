import {Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ClickButtons from '../components/ClickButtons';
import styled from '@emotion/native';
import {
  getLastQuestionData,
  setLastQuestionData,
} from '../utils/LastQuestionData';
import surveyData from '../assets/surveyData.json';
import axiosInstance from '../axiosInstance';

// import axios from 'axios';
// import CustomActivityIndicator from '../components/CustomActivityIndicator';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
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
  // margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  margin-bottom: ${props => props.marginBottom}px;
`;

const QuestionCounter = styled.Text`
  font-size: 16px;
  color: ${props => (props.isCompleted ? 'blue' : 'white')};
  text-align: center;
  margin-bottom: ${props => props.marginBottom}px;
`;

const TOTAL_QUESTIONS = 12;

const getQuestionText = (questionId, surveyQuestions) => {
  const question = surveyQuestions.find(q => q.question_id === questionId);
  return question ? question.question_val : '';
};

const TodaySurveyScreen = () => {
  const [questionId, setQuestionId] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(1);
  const questionText = getQuestionText(questionId, surveyData);

  // UI update
  const [selectedButton, setSelectedButton] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  // const [isSurveyFinish, setIsSurveyFinish] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const initializeSurvey = async () => {
      // setIsLoading(true);
      let fetchedData = await getLastQuestionData();
      const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

      console.log('TodaySurvey Rendering! ', fetchedData);
      console.log('today is ', today);
      if (fetchedData.lastEnterDate !== today) {
        await setLastQuestionData(fetchedData.lastQuestionId || 1, today, 1); // 최근 접속이 오늘이 아니면, 날짜 업데이트 + 현재 문제 1번째로 설정
        fetchedData = await getLastQuestionData();
      }
      // 최근 접속이 오늘이면 AsyncStorage 업데이트는 필요 X
      console.log('update lastQuestionData! ', fetchedData);
      setQuestionId(fetchedData.lastQuestionId);
      setCurrentOrder(fetchedData.currentQuestion);

      // setIsLoading(false); // 로딩 완료
    };

    initializeSurvey();
  }, [currentOrder]);

  const handleAnswer = async selectedAnswer => {
    if (!isButtonDisabled) {
      // setIsLoading(true);
      setSelectedButton(selectedAnswer);
      setIsButtonDisabled(true); // 버튼 비활성화
      // 현재 질문 번호와 날짜: currentOrder, questionId
      const today = new Date().toISOString();
      console.log(today);
      try {
        // 답변 전송
        await axiosInstance.post('http://localhost:8080/answer', {
          question_id: questionId,
          answer: selectedAnswer || null,
          time_ans: today,
          // user_id, time_spend, time_over, skip_no, skip_next, ...
        });
        // 답변 성공 후 다음 질문으로 이동하기 위한 상태 업데이트
        const nextQuestionId = questionId + 1;
        const nextQuestionNumber = currentOrder + 1;
        await setLastQuestionData(nextQuestionId, today.slice(0, 10), nextQuestionNumber); // 다음 질문 ID로 업데이트
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
      <ButtonContainer marginBottom={windowHeight * 0.2}>
        <ClickButtons
          selected={selectedButton}
          onSelect={handleAnswer}
          disabled={isButtonDisabled}
          width={windowWidth * 0.72}
        />
      </ButtonContainer>
      <QuestionCounter
        marginBottom={windowHeight * 0.2}
        isCompleted={currentOrder > TOTAL_QUESTIONS}>
        {currentOrder}/{TOTAL_QUESTIONS}
      </QuestionCounter>
    </Container>
  );
};
export default TodaySurveyScreen;
