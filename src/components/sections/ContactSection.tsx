"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import styles from "./ContactSection.module.scss";

const EMAIL = "jinyunseo0905@gmail.com";
const GIT_URL = "https://github.com/woogangsomgang";
const RESUME_URL = "/resume";

const MAIL_SUBJECT = encodeURIComponent("[포트폴리오 문의] 연락드립니다");
const MAIL_BODY = encodeURIComponent(
  `안녕하세요, 진윤서님.

포트폴리오를 보고 연락드립니다.

문의 내용:
`
);
const MAIL_HREF = `mailto:${EMAIL}?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`;

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WaveText({ text }: { text: string }) {
  return (
    <span className={styles.waveText}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={styles.letter}
          style={{ "--i": i } as CSSProperties}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

export default function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [mailCopied, setMailCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  // 메일 앱이 등록된 사용자는 mailto가 그대로 동작(창이 blur/숨김 됨).
  // 아무 반응이 없으면(메일 앱 없음) 이메일을 복사하고 안내를 띄운다.
  const handleMailClick = () => {
    let opened = false;
    const markOpened = () => {
      opened = true;
    };
    window.addEventListener("blur", markOpened, { once: true });
    document.addEventListener("visibilitychange", markOpened, { once: true });

    window.setTimeout(() => {
      window.removeEventListener("blur", markOpened);
      document.removeEventListener("visibilitychange", markOpened);
      if (opened || document.visibilityState === "hidden") return;

      // 메일 앱이 열리지 않은 것으로 판단 → 복사 폴백
      navigator.clipboard
        ?.writeText(EMAIL)
        .then(() => {
          setMailCopied(true);
          setTimeout(() => setMailCopied(false), 2500);
        })
        .catch(() => {
          // clipboard unavailable — ignore
        });
    }, 800);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.section} ${inView ? styles.isVisible : ""}`}
    >
      <h1 className={styles.title}>Contact</h1>

      <div className={styles.infoGroup}>
        <h2 className={styles.subTitle}>E-mail</h2>
        <div className={styles.infoRow}>
          <span className={styles.infoValue}>{EMAIL}</span>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={() => handleCopy(EMAIL, "email")}
            aria-label="이메일 주소 복사"
          >
            {copied === "email" ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>

      <div className={styles.infoGroup}>
        <h2 className={styles.subTitle}>git</h2>
        <div className={styles.infoRow}>
          <span className={styles.infoValue}>{GIT_URL}</span>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={() => handleCopy(GIT_URL, "git")}
            aria-label="git 주소 복사"
          >
            {copied === "git" ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>

      <div className={styles.actionGrid}>
        <a
          className={styles.actionCard}
          href={MAIL_HREF}
          onClick={handleMailClick}
          aria-label="기본 메일 앱으로 메일 보내기"
        >
          <h3 className={styles.actionTitle}>
            <WaveText text="메일 보내기 →" />
          </h3>
          <p className={styles.actionDesc}>
            간단한 커피챗이나 합류 제안을 환영합니다
            <br />
            편하게 메일 보내주시면 빠른 시일 내로 답장 드리겠습니다.
          </p>
        </a>
        <Link className={styles.actionCard} href={RESUME_URL}>
          <h3 className={styles.actionTitle}>
            <WaveText text="이력서 보러가기 →" />
          </h3>
          <p className={styles.actionDesc}>
            저에 대해 조금 더 상세히 기술되어있습니다.
            <br />
            시간내어 둘러봐주시면 감사하겠습니다.
          </p>
        </Link>
      </div>

      <p
        className={`${styles.mailNotice} ${
          mailCopied ? styles.mailNoticeShow : ""
        }`}
        role="status"
        aria-live="polite"
      >
        메일 앱이 없어 이메일 주소를 복사했어요. 원하는 메일에 붙여넣어 보내주세요.
      </p>
    </section>
  );
}
