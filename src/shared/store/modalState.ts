import { atom } from "recoil";
import { ReactNode } from "react";

interface ModalProps {
  id: number;
  title?: string;
  content?: string | ReactNode;
  negative?: boolean;
  cancelHide?: boolean;
  onClick?: () => void | Promise<void>;
}

export const modalState = atom<ModalProps[]>({
  key: "modalState",
  default: [],
});
