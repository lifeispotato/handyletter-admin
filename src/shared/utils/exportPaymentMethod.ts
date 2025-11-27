const exportPaymentMethod = (paymentMethod: string): string => {
  switch (paymentMethod) {
    case "BANK_TRANSFER":
      return "무통장";
    case "CREDIT_CARD":
      return "신용카드";
    case "CREDIT":
      return "외상";
    case "NONE":
      return "없음";
    default:
      return "알 수 없음";
  }
};

export default exportPaymentMethod;
