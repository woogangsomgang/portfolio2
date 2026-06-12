"use client";

import { useEffect } from "react";
import styles from "./Modal.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  bgColor,
  textColor,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...(bgColor && { background: bgColor }),
          ...(textColor && { color: textColor }),
        }}
      >
        {children}
      </div>
    </div>
  );
}
