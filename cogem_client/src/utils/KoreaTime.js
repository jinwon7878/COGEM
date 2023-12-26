export function toKoreaISOString(date) {
  // 오프셋 계산
  const koreaTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  // ISO 문자열 포맷으로 변환
  return koreaTime.toISOString().replace('Z', '+09:00');
}
