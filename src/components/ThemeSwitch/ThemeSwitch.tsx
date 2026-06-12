"use client";

import { useState } from "react";
import styles from "./ThemeSwitch.module.scss";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <div className={`${styles.switch} ${styles[theme]}`}>
      <span className={styles.indicator} aria-hidden="true" />
      <button
        type="button"
        className={`${styles.option} ${theme === "light" ? styles.active : ""}`}
        onClick={() => setTheme("light")}
        aria-label="Light theme"
      >
        ☀
      </button>
      <button
        type="button"
        className={`${styles.option} ${theme === "dark" ? styles.active : ""}`}
        onClick={() => setTheme("dark")}
        aria-label="Dark theme"
      >
        ☾
      </button>
    </div>
  );
}
