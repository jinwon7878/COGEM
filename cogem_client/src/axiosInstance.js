import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const instance = axios.create(); // axios 인스턴스 생성
const mock = new MockAdapter(instance); // 생성한 인스턴스에 대해 mock 설정

mock.onPost('http://localhost:8080/answer').reply(200);
mock.onPost('http://localhost:8080/user/signup').reply(200);
mock.onPost('http://localhost:8080/user/signin').reply(200, {
  userInfo: {
    userId: '12345',
    loginId: 'mockLoginId',
    userGender: 'male',
    userName: '홍길동',
    userBirth: '1990-01-01',
    userKaist: true,
  },
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken',
});

// /login 경로에 대한 post 요청을 가로채고, {data: true}를 응답으로 반환하도록 설정
// mock.onGet('http://localhost:8080/survey').reply(function () {
//   return new Promise(function (resolve) {
//     // 1초 후에 응답을 반환
//     setTimeout(function () {
//       resolve([
//         200,
//         [
//           {
//             question_id: 0x0101,
//             question_val:
//               '이건 첫 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x0201,
//             question_val:
//               '이건 두 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다. 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x0301,
//             question_val:
//               '이건 세 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x0401,
//             question_val:
//               '이건 네 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다. 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x0501,
//             question_val:
//               '이건 다섯 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x0601,
//             question_val:
//               '이건 여섯 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x0701,
//             question_val:
//               '이건 일곱 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x0801,
//             question_val:
//               '이건 여덟 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다. 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x0901,
//             question_val:
//               '이건 아홉 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x1001,
//             question_val:
//               '이건 열 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x1101,
//             question_val:
//               '이건 열한 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//           {
//             question_id: 0x1201,
//             question_val:
//               '이건 열두 번째 설문 문제! 다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.',
//           },
//         ],
//       ]);
//     }, 1000);
//   });
// });

export default axiosInstance = instance;
