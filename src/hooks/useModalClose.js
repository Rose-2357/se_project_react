import { useEffect } from "react";

export default function useModalClose(isOpen, onClose, className) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e) {
      if (e.key === "Escape") onClose();
    }

    function handleOverlay(e) {
      if (e.target.classList.contains({ className })) onClose();
    }

    document.addEventListener("keydown", handleEscape);

    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose, className]);
}
