import { useEffect, RefObject } from "react";

type ModalMode = "login" | "signup";

export function useModalClose(
  modalRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  isOpen: boolean,
  resetForm?: () => void,
  resetMode?: (mode: ModalMode) => void,
  modeValue?: ModalMode
) {
  useEffect(() => {
    if (!isOpen) return;

    function handleClose() {
      resetForm?.();
      if (resetMode && modeValue) {
        resetMode(modeValue);
      }
      onClose();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (modalRef.current && !modalRef.current.contains(target)) {
        handleClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose, isOpen, resetForm]);
}