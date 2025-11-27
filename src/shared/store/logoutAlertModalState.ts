import { atom } from "recoil";

export const logoutAlertModalState = atom<boolean>({
  key: "logoutAlertModalState",
  default: false,
});
