import {Text, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ClickButtons from '../components/ClickButtons';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import styled from '@emotion/native';

// import axios from 'axios';
import axiosInstance from '../axiosInstance';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  justify-content: flex-start; // 컨텐츠를 위에서부터 시작
  padding-top: 136px; // 상단 패딩을 적용
`;

const QuestionContainer = styled.View`
  margin-top: 136px;
  width: 326px;
  flex-grow: 1;
`;

const QuestionText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  margin-bottom: 150px;
`;

const QuestionCounter = styled.Text`
  font-size: 16px;
  color: white;
  text-align: center;
  margin-bottom: 150px;
`;

const TOTAL_QUESTIONS = 12;

const TodaySurveyScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // props로 받아올 거임 나중에
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [isSurveyFinish, setIsSurveyFinish] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          'http://localhost:8080/survey',
        );
        const data = response.data;
        setSurveyQuestions(data);
        setIsLoading(false); // 로딩 완료
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelectRadioButton = useCallback(
    index => {
      if (!isButtonDisabled) {
        setSelectedButton(index);
        setIsButtonDisabled(true);
        setTimeout(() => {
          if (currentQuestion < TOTAL_QUESTIONS) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedButton(null); // 다음 문제를 위해 선택된 버튼 초기화
            setIsButtonDisabled(false); // 버튼 다시 활성화
          } else {
            // 모든 문제가 완료되었을 때 로직 처리
            setIsSurveyFinish(true);
          }
        }, 1000);
      }
    },
    [currentQuestion, isButtonDisabled, isSurveyFinish],
  );

  if (isLoading) {
    return <CustomActivityIndicator size="large" color="#7240FF" />;
  }

  return (
    <Container>
      {!isSurveyFinish ? (
        <>
          <QuestionContainer>
            <QuestionText>{surveyQuestions[currentQuestion - 1]}</QuestionText>
          </QuestionContainer>
          <ButtonContainer>
            <ClickButtons
              selected={selectedButton}
              onSelect={handleSelectRadioButton}
              disabled={isButtonDisabled}
            />
          </ButtonContainer>
          <QuestionCounter>
            {currentQuestion}/{TOTAL_QUESTIONS}
          </QuestionCounter>
        </>
      ) : (
        <QuestionText>FINISH!!</QuestionText>
      )}
    </Container>
  );
};
export default TodaySurveyScreen;
