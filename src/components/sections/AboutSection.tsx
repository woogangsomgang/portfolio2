"use client";

import { useEffect, useRef, useState } from "react";
import TechWheel from "@/components/TechWheel/TechWheel";
import styles from "./AboutSection.module.scss";

const TITLE = "ABOUT ME";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setStarted(true);
      setTypedCount(TITLE.length);
      setTypingDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (typedCount >= TITLE.length) {
      setTypingDone(true);
      return;
    }
    const timer = setTimeout(() => setTypedCount((c) => c + 1), 110);
    return () => clearTimeout(timer);
  }, [started, typedCount]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`${styles.section} ${started ? styles.started : ""} ${
        typingDone ? styles.typingDone : ""
      }`}
    >
      <h1 className={styles.title}>
        <span className={styles.titleInner}>
          <span className={styles.ghost} aria-hidden="true">
            {TITLE}
          </span>
          <span className={styles.typed}>
            {TITLE.slice(0, typedCount)}
            <span
              className={`${styles.cursor} ${
                typingDone ? styles.cursorHidden : ""
              }`}
              aria-hidden="true"
            />
          </span>
        </span>
      </h1>

      <div className={styles.divider} />

      <div className={styles.body}>
        <p>
          안녕하세요. <strong>사용자의 흐름</strong>을 고려하는{" "}
          <strong>프론트엔드 개발자 진윤서</strong>입니다.
        </p>
        <p>
          웹 화면을 단순히 보기 좋게 만드는 것보다,
          <br />
          <strong>사용자가 목적을 쉽게 달성할 수 있는 구조</strong>와{" "}
          <strong>인터랙션</strong>을 고민합니다.
        </p>
        <p>
          React와 Next.js를 중심으로 컴포넌트 기반 UI, API 연동, LLM 호출,
          <br />
          로그인과 회원가입, CRUD, 반응형 레이아웃을 구현하며{" "}
          <strong>실무에 가까운 프로젝트를 경험</strong>하고 있습니다.
        </p>
        <p>
          모르는 부분을 그냥 넘기지 않고 끝까지 찾아보고,
          <br />
          기록하며 <strong>개선하는 개발자</strong>가 되고자 합니다.
        </p>
      </div>

      <div className={styles.tags}>
        <TechWheel />
      </div>
    </section>
  );
}
