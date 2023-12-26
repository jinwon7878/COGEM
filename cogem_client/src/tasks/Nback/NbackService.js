// 길이에 맞는 무작위 알파벳 배열 생성 (+ 3초 카운트)
const generateSequence = (length, level) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'.split('');
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  // const characters = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'.split('');
  // const characters = 'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ'.split('');
  // const characters = '0123456789'.split('');
  let newSequence = [3, 2, 1]; // index 0, 1, 2는 문제 풀기 전 카운트 역할

  // 랜덤 알파벳 sequence 생성
  for (let i = 0; i < length + level; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    newSequence.push(char);
  }

  // 정답 쌍 생성
  let answerPairs = length / 4;
  let usedIndices = new Set(); // 이미 사용된 인덱스 추적

  while (answerPairs > 0) {
    let index = Math.floor(Math.random() * (length - level)) + level;
    if (!usedIndices.has(index)) {
      newSequence[index] = newSequence[index - level];
      usedIndices.add(index);
      answerPairs--;
    }
  }

  console.log('sequence is ', newSequence);
  return newSequence;
};

// nLevel에 대한 알파벳(문제) 색
const getColorForLevel = level => {
  const colors = ['black', 'green', 'blue', 'red', 'purple'];
  return colors[level - 1];
};

// 사용자의 응답이 정답인지 검사
const isResponseCorrect = (response, position, level, seq) => {
  if (position < level) {
    return false;
  } // 아직 n-back 조건을 만족하지 않는 경우
  return response === (seq[position - level] === seq[position]);
};

// userResponse state 처리 필요
// const endTask = () => {
//   // Task 끝났을 때 필요한 처리 (정확도 계산 + 결과 화면 네비게이션)
//   const correctResponses = userResponse.filter(r => r.correct).length;
//   navigation.navigate('NbackResult', {
//     accuracy: (correctResponses / sequence.length) * 100,
//     nLevel: nLevel,
//   });
// };

export {generateSequence, getColorForLevel, isResponseCorrect};
