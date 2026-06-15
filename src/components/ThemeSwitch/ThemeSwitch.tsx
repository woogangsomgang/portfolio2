"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeSwitch.module.scss";

type Theme = "light" | "dark";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("dark");

  // 초기 진입 시 저장된 테마와 동기화 (data-theme는 layout의 인라인 스크립트가 먼저 적용)
  useEffect(() => {
    const saved =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ??
      "dark";
    setTheme(saved);
  }, []);

  const applyTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage 사용 불가 환경 — 무시
    }
  };

  return (
    <div className={`${styles.switch} ${styles[theme]}`}>
      <span className={styles.indicator} aria-hidden="true" />
      <button
        type="button"
        className={`${styles.option} ${theme === "light" ? styles.active : ""}`}
        onClick={() => applyTheme("light")}
        aria-label="Light theme"
      >
        ☀
      </button>
      <button
        type="button"
        className={`${styles.option} ${theme === "dark" ? styles.active : ""}`}
        onClick={() => applyTheme("dark")}
        aria-label="Dark theme"
      >
        ☾
      </button>
    </div>
  );
}
