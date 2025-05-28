import { useState, useCallback } from "react";

export default function useModals() {
  const [isOpened, setIsOpened] = useState(false);

  const openModal = useCallback(() => {
    setIsOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpened(false);
  }, []);

  return [isOpened, openModal, closeModal];
}
