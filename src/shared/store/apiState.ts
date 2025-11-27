import { atom } from "recoil";

export const apiState = atom<boolean>({
  key: "apiState",
  default: false,
});
