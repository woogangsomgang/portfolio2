"use client";

import { useEffect, useRef, useState } from "react";
import SkillIcon from "@/components/SkillIcon/SkillIcon";
import styles from "./SkillsSection.module.scss";

const skills: Record<string, string[]> = {
  Frontend: [
    "html",
    "css",
    "scss",
    "javascript",
    "typescript",
    "react",
    "next.js",
    "tailwind",
    "zustand",
  ],
  Backend: ["node.js", "mongoDB", "nextauth", "axios", "gemini-api"],
  Tools: ["vercel", "github", "figma", "slack"],
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.isVisible : ""}`}
    >
      <h1 className={styles.title}>Skills</h1>
      <div className={styles.grid}>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className={styles.cardWrap}>
            <h3 className={styles.cardTitle}>{category}</h3>
            <div className={styles.card}>
              {items.map((skill) => (
                <div key={skill} className={styles.item}>
                  <SkillIcon name={skill} className={styles.itemIcon} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
