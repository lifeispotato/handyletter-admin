export const prefix = "/";
export const route = {
  default: "",

  // ========== 기본 ========== //
  home: prefix + "home", // 홈

  // ========== 로그인/회원가입 ========== //
  login: prefix + "login", // 로그인
  join: prefix + "auth/register", // 회원가입
  join_complete: prefix + "auth/register/complete", // 회원가입
  account_find: prefix + "auth/find", // 아이디, 비밀번호 찾기
  find_id_complete: prefix + "find/id/complete", // 아이디 찾기 완료
  reset_pw: prefix + "reset/password", // 비밀번호 재설정
  reset_pw_complete: prefix + "reset/password/complete", // 비밀번호 재설정 완료
  before_approve_account: prefix + "auth/register/before-approve", // 승인 대기중
  signup: prefix + "signup",
  signupSuccess: prefix + "signup-success",

  // 사용자 관리
  memberList: prefix + "member/list",
  memberDetail: prefix + "member/detail",
  memberUpdate: prefix + "member/update",
  memberWithdraw: prefix + "member/withdraw",

  // 뉴스레터 콘텐츠 관리
  todayBrandList: prefix + "todayBrand/list",
  todayBrandDetail: prefix + "todayBrand/detail",
  todayBrandUpdate: prefix + "todayBrand/update",
  todayBrandCreate: prefix + "todayBrand/create",
  shortFormList: prefix + "shortForm/list",
  shortFormDetail: prefix + "shortForm/detail",
  shortFormUpdate: prefix + "shortForm/update",
  shortFormCreate: prefix + "shortForm/create",
  storyList: prefix + "story/list",
  storyDetail: prefix + "story/detail",
  storyUpdate: prefix + "story/update",
  storyCreate: prefix + "story/create",

  // 숙소 관리
  dormList: prefix + "dorm/list",
  dormDetail: prefix + "dorm/detail",
  dormUpdate: prefix + "dorm/update",
  dormCreate: prefix + "dorm/create",

  // 결제 내역 관리
  paymentList: prefix + "payment/list",

  // 약관 관리
  termsList: prefix + "terms/list",
  termsCreate: prefix + "terms/create",
  termsUpdate: prefix + "terms/update",
  termsDetail: prefix + "terms/detail",

  // FAQ 관리
  faqList: prefix + "faq/list",
  faqCreate: prefix + "faq/create",
  faqUpdate: prefix + "faq/update",
  faqDetail: prefix + "faq/detail",

  // 기본 관리
  basicnew: prefix + "basic",
  basicDetail: prefix + "basic/detail",
  basicUpdate: prefix + "basic/update",
};
