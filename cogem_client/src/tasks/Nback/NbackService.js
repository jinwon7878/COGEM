// 길이에 맞는 무작위 알파벳 배열 생성 (+ 3초 카운트)
const generateSequence = (level, length, sType) => {
  let characters;
  switch (sType) {
    case 'E-a':
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      break;
    case 'K-a':
      characters = '가나다라마바사아자차카타파하'.split('');
      break;
    case 'K-c':
      characters = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'.split('');
      break;
    case 'K-v':
      characters = 'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ'.split('');
      break;
    case 'N':
      characters = '0123456789'.split('');
      break;
    case 'E-a:K-a':
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ가나다라마바사아자차카타파하'.split('');
      break;
    case 'E-a:K-c':
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'.split('');
      break;
    case 'E-a:K-v':
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ'.split('');
      break;
    case 'E-a:N':
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
      break;
    default:
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }

  let newSequence = [3, 2, 1]; // index 0, 1, 2는 문제 풀기 전 카운트 역할
  const countdownLength = 3; // 카운트다운 부분의 길이

  // 랜덤 알파벳 sequence 생성
  for (let i = 0; i < length + level; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    newSequence.push(char);
  }

  // 정답 쌍 생성
  let answerPairs = Math.floor(length / 4); // answer 비율 (최소 보장 비율)
  let usedIndices = new Set(); // 정답과 미끼 인덱스 추적
  let answerOriginIndices = new Set(); // 정답 쌍(index - level) 인덱스만 추적
  while (answerPairs > 0) {
    // 실제 사용자가 클릭하는 부분에서만 pairs 생성
    let index =
      Math.floor(Math.random() * (length - level)) + level + countdownLength;
    // (length - level) : 사용자가 선택할 수 있는 개수
    if (
      !usedIndices.has(index) && // 기존의 정답 index 무효화 방지
      !answerOriginIndices.has(index) // 기존의 정답 쌍 index 변경 방지
    ) {
      newSequence[index] = newSequence[index - level]; // sequence[index]를 변경
      usedIndices.add(index);
      answerOriginIndices.add(index - level); // 정답 쌍 인덱스 추가
      answerPairs--;
      console.log('answer index is ', index);
    }
  }

  // 미끼 쌍 생성
  let lurePairs = Math.floor(length / 6); // lure 비율 (겹칠 수 있기에, 대략적인 비율)
  while (lurePairs > 0) {
    if (level === 1) {
      break;
    }
    let index =
      Math.floor(Math.random() * (length - level)) + level + countdownLength;
    let lureLevel = Math.floor(Math.random() * (level - 1)) + 1; // 1과 level-1 사이의 미끼 레벨 선택
    if (
      !usedIndices.has(index) && // 기존의 정답 index 무효화 방지
      !answerOriginIndices.has(index) && // 기존의 정답 쌍 index 변경 방지
      index - lureLevel >= countdownLength // disable 구역 침범 방지
    ) {
      newSequence[index] = newSequence[index - lureLevel];
      usedIndices.add(index);
      lurePairs--;
      console.log('lure index is ', index);
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

// 문제 사이 일시정지 보여주는 함수
const pauseInterval = (time, set) => {
  const timer = setTimeout(() => {}, time);
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
