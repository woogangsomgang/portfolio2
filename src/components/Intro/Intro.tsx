"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.scss";

export default function Intro() {
  const [openingGone, setOpeningGone] = useState(false); // 오프닝 화면 제거
  const [cut, setCut] = useState<"idle" | "in" | "out">("idle"); // 검정 컷 상태
  const [done, setDone] = useState(false); // 완전히 제거

  useEffect(() => {
    // 세션당 1회만 재생 (페이지 이동/복귀 시 반복 방지)
    if (sessionStorage.getItem("introShown")) {
      setDone(true);
      return;
    }
    sessionStorage.setItem("introShown", "1");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const timers: ReturnType<typeof setTimeout>[] = [];

    if (reduceMotion) {
      timers.push(setTimeout(() => setDone(true), 1200));
    } else {
      const hold = 3500; // 오프닝 유지
      const cutIn = 700; // 검정 페이드 인
      const blackHold = 450; // 검정에서 살짝 멈춤 (끊김)
      const cutOut = 900; // 사이트로 페이드 아웃

      timers.push(setTimeout(() => setCut("in"), hold));
      timers.push(setTimeout(() => setOpeningGone(true), hold + cutIn));
      timers.push(
        setTimeout(() => setCut("out"), hold + cutIn + blackHold)
      );
      timers.push(
        setTimeout(() => setDone(true), hold + cutIn + blackHold + cutOut)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <>
      {!openingGone && (
        <section className={styles.intro} aria-hidden="true">
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>
              <span className={styles.point}>HELLO</span>,{" "}
              <span className={styles.point}>진윤서</span>입니다
            </h1>
          </div>
          <div className={styles.divider} />
          <div className={styles.subtitleWrap}>
            <p className={styles.subtitle}>
              사용자에게 필요한 기능을 화면으로 구현하는 프론트엔드 개발자
            </p>
          </div>
        </section>
      )}

      {/* 오프닝 → 사이트 전환용 검정 컷 */}
      <div
        className={`${styles.blackCut} ${
          cut === "in" ? styles.cutIn : cut === "out" ? styles.cutOut : ""
        }`}
        aria-hidden="true"
      />
    </>
  );
}
