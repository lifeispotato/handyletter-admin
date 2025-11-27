import { atom } from "recoil";

export type LoginInfo = {
  id?: number;
  accessMenu?: string;
  name?: string;
  phoneNumber?: string;
  role?: string;
  account?: string;
  activation?: boolean;
  approval?: boolean;
  createdAt?: string;
  updatedAt?: string;
} | null;

export const loginInfoState = atom<LoginInfo>({
  key: "loginInfoState",
  default: null,
});
