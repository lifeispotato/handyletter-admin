import { useRecoilState } from "recoil";
import { modalState } from "../store/modalState";
import { ReactNode } from "react";

interface ModalProps {
  id?: number;
  title?: string;
  content?: string | ReactNode;
  negative?: boolean;
  cancelHide?: boolean;
  onClick?: () => void | Promise<void>;
}

export const useModal = () => {
  const [modalList, setModalList] = useRecoilState(modalState);

  const showModal = (props: ModalProps) => {
    const id = Date.now();
    setModalList((prev) => [...prev, { ...props, id }]);
  };

  const closeModal = (id: number) => {
    setModalList((prev) => prev.filter((modal) => modal.id !== id));
  };

  return {
    modalList,
    showModal,
    closeModal,
  };
};
