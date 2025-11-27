// 정규식 검사 함수

const validateInput = (regex: RegExp, value: string): boolean => {
  return regex.test(value);
};

export default validateInput;
