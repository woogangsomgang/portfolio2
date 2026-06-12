"use client";

import styles from "./ScrollTop.module.scss";

export default function ScrollTop() {
  const handleClick = () => {
    const content = document.querySelector(".content");
    if (content) {
      content.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}