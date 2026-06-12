"use client";

import { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";

const portfolioMenu = [
  { label: "About me", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const blogMenu = [{ label: "Dev Blog", id: "blog" }];

const allMenus = [...portfolioMenu, ...blogMenu];

// 섹션별 스크롤 도착 위치 보정값(px).
// 음수일수록 섹션을 더 위쪽에 멈추게(여백을 더 두고) 한다.
// 여기 없는 섹션(about, contact, blog)은 기존 앵커 동작 그대로 사용.
const sectionOffsets: Record<string, number> = {
  skills: -100,
  projects: -100,
};

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const root = document.querySelector(".content");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((acc, e) =>
          e.intersectionRatio > acc.intersectionRatio ? e : acc,
        );
        setActiveSection(top.target.id);
      },
      { root, threshold: [0.4, 0.6, 0.8] },
    );

    allMenus.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const offset = sectionOffsets[id];
    if (offset === undefined) return; // 보정값 없는 섹션은 기본 앵커 동작 유지

    const container = document.querySelector<HTMLElement>(".content");
    const section = document.getElementById(id);
    if (!container || !section) return;

    e.preventDefault();
    // offsetParent에 의존하지 않도록 컨테이너 기준 위치를 직접 계산
    const top =
      section.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop +
      offset;
    container.scrollTo({ top, behavior: "smooth" });
  };

  const renderItems = (items: { label: string; id: string }[]) =>
    items.map((item) => (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          className={activeSection === item.id ? styles.active : ""}
          onClick={(e) => handleNavClick(e, item.id)}
        >
          {item.label}
        </a>
      </li>
    ));

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar} />
        <span className={styles.name}>Jin yun seo</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Portfolio</h3>
          <ul className={styles.menu}>{renderItems(portfolioMenu)}</ul>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Blog</h3>
          <ul className={styles.menu}>{renderItems(blogMenu)}</ul>
        </div>
      </nav>
    </aside>
  );
}
