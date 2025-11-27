import { useRecoilState } from "recoil";
import Modal from "../../organisms/modal/Modal";
import { modalState } from "../../../store/modalState";

function GlobalModal() {
  const [modals, setModals] = useRecoilState(modalState);

  const closeModal = (id: number) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  return (
    <>
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          title={modal.title}
          content={modal.content}
          negative={modal.negative}
          cancelHide={modal.cancelHide}
          onClick={() => {
            if (modal.onClick) {
              modal.onClick();
            }
            closeModal(modal.id);
          }}
          setModalOpen={() => closeModal(modal.id)}
        />
      ))}
    </>
  );
}

export default GlobalModal;
