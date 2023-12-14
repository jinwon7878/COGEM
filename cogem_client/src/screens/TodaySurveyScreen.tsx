import {Text, View, Dimensions} from 'react-native';
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
  color: white;
  text-align: center;
  margin-bottom: ${props => props.marginBottom}px;
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

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
            // 설문 완료
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
          <QuestionContainer width={windowWidth * 0.85}>
            <QuestionText>{surveyQuestions[currentQuestion - 1]}</QuestionText>
          </QuestionContainer>
          <ButtonContainer marginBottom={windowHeight * 0.2}>
            <ClickButtons
              selected={selectedButton}
              onSelect={handleSelectRadioButton}
              disabled={isButtonDisabled}
              width={windowWidth*0.72}
            />
          </ButtonContainer>
          <QuestionCounter marginBottom={windowHeight * 0.2}>
            {currentQuestion}/{TOTAL_QUESTIONS}
          </QuestionCounter>
        </>
      ) : (
        <QuestionContainer>
          <QuestionText>FINISH!!</QuestionText>
        </QuestionContainer>
      )}
    </Container>
  );
};
export default TodaySurveyScreen;
