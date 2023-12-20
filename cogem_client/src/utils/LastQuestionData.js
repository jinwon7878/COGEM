import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage에 저장된 마지막 문제 ID와 날짜, 현재 문제 번호
export const getLastQuestionData = async () => {
  try {
    const lastQuestionId = await AsyncStorage.getItem('lastQuestionId');
    const lastEnterDate = await AsyncStorage.getItem('lastEnterDate');
    const currentQuestion = await AsyncStorage.getItem('currentQuestion');
    return {
      lastQuestionId:
        lastQuestionId ? parseInt(lastQuestionId, 10) : null,
      lastEnterDate: lastEnterDate ? lastEnterDate : null,
      currentQuestion:
        currentQuestion ? parseInt(currentQuestion, 10) : 1,
    };
  } catch (error) {
    console.error(error);
  }
};

// 마지막 문제 ID와 날짜, 현재 문제 번호를 AsyncStorage에 저장
export const setLastQuestionData = async (
  questionId,
  date,
  nextQuestion,
) => {
  try {
    await AsyncStorage.setItem('lastQuestionId', questionId.toString());
    await AsyncStorage.setItem('lastEnterDate', date);
    await AsyncStorage.setItem('currentQuestion', nextQuestion.toString());
  } catch (error) {
    console.error(error);
  }
};
