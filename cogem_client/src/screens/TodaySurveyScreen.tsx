import {Text, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import ClickButtons from '../components/ClickButtons';

const TOTAL_QUESTIONS = 12;

const TodaySurveyScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // props로 받아올 거임 나중에
  const [isSurveyFinish, setIsSurveyFinish] = useState(false);

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
            setIsSurveyFinish(false);
          }
        }, 1000);
      }
    },
    [currentQuestion, isButtonDisabled, isSurveyFinish],
  );

  // const handleSelectMore = 

  return (
    <View>
      {isSurveyFinish ? (
        <>
          <Text>
            Question {currentQuestion}/{TOTAL_QUESTIONS}
          </Text>
          <ClickButtons
            selected={selectedButton}
            onSelect={handleSelectRadioButton}
            disabled={isButtonDisabled}
          />
        </>
      ) : (
        <>
          <Text>FINISH!!</Text>
          <Text>
            Question {currentQuestion}/{TOTAL_QUESTIONS}
          </Text>
          <ClickButtons
            selected={selectedButton}
            onSelect={handleSelectRadioButton}
            disabled={isButtonDisabled}
          />
        </>
      )}
    </View>
  );
};

export default TodaySurveyScreen;
