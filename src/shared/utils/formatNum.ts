// 숫자만 추출
export const removeNonNumeric = (data: string) => {
  return data.replace(/[^0-9]/g, "");
};

// 숫자에 콤마 추가
export const formatNumberWithCommas = (data: string | number) => {
  let cleanedData = data;
  // 숫자 외 나머지 값 삭제
  if (typeof data === "string") {
    cleanedData = data.toString().replace(/[^\d]/g, "");
  }

  // 다시 숫자로 변환
  let number = parseFloat(cleanedData as string);

  number = Math.floor(number);

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 휴대폰번호 포맷
export const formatPhoneNumber = (number: string | number) => {
  const cleaned = ("" + number).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4,})$/);

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  } else {
    return cleaned;
  }
};

// 사업자 번호 포맷
export const formatBusinessNumber = (number: string | number) => {
  const cleaned = ("" + number).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{5,})$/);

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  } else {
    return cleaned;
  }
};

// 전화번호 포맷
export const formatTelNumber = (number: string | number) => {
  const cleaned = ("" + number).replace(/\D/g, "");
  let match;

  if (cleaned.startsWith("02")) {
    // 서울 지역번호(02)의 경우
    match = cleaned.match(/^(02)(\d{3,4})(\d{4})$/);
  } else {
    // 나머지 지역번호(031 등)의 경우
    match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  }

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  } else {
    return cleaned;
  }
};
