import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * [AsyncStorage - Get] 풀어야 하는 문제 ID / 최근 접속 날짜 / 현재 문제 번호 / requestCount(server 보내기 위한)
 * @returns lastQuestionId, lastEnterDate, currentSurveyOrder, requestCount
 */
export const getLastQuestionData = async () => {
  try {
    const lastQuestionId = await AsyncStorage.getItem('@survey:lastQuestionId');
    const lastEnterDate = await AsyncStorage.getItem('@survey:lastEnterDate');
    const currentSurveyOrder = await AsyncStorage.getItem(
      '@survey:currentSurveyOrder',
    );
    const requestCount = await AsyncStorage.getItem('@survey:requestCount');
    return {
      lastQuestionId: lastQuestionId ? parseInt(lastQuestionId, 10) : null,
      lastEnterDate: lastEnterDate ? lastEnterDate : null,
      currentSurveyOrder: currentSurveyOrder
        ? parseInt(currentSurveyOrder, 10)
        : 1,
      requestCount: requestCount ? parseInt(requestCount, 10) : 1,
    };
  } catch (error) {
    console.error(error);
  }
};
/**
 * [AsyncStorage - Set] 풀어야 하는 문제 ID / 최근 접속 날짜 / 현재 문제 번호 / requestCount(server 보내기 위한)
 * @param {*} questionId '@survey:lastQuestionId' 저장
 * @param {*} date '@survey:lastEnterDate' 저장
 * @param {*} nextQuestion '@survey:currentSurveyOrder' 저장
 * @param {*} reqCount '@survey:requestCount' 저장
 */
export const setLastQuestionData = async (questionId, date, nextQuestion, reqCount) => {
  try {
    await AsyncStorage.setItem('@survey:lastQuestionId', questionId.toString());
    await AsyncStorage.setItem('@survey:lastEnterDate', date);
    await AsyncStorage.setItem(
      '@survey:currentSurveyOrder',
      nextQuestion.toString(),
    );
    await AsyncStorage.setItem('@survey:requestCount', reqCount.toString());
  } catch (error) {
    console.error(error);
  }
};
