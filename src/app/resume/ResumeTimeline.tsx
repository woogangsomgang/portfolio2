"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import styles from "./resume.module.scss";

export default function ResumeTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const resumeProjects = projects.filter((p) => p.role);

  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    const fill = fillRef.current;
    if (!wrap || !line || !fill) return;

    const scroller = wrap.closest("main");
    const dots = Array.from(
      wrap.querySelectorAll<HTMLElement>(`.${styles.dot}`)
    );

    // 媛??먯쓽 ?좎긽 ?꾩튂(0~1)
    let dotFracs: number[] = [];
    const measure = () => {
      const rect = line.getBoundingClientRect();
      dotFracs = dots.map((d) => {
        const r = d.getBoundingClientRect();
        return (r.top + r.height / 2 - rect.top) / rect.height;
      });
    };

    // 梨꾩썙吏??좎씠 ?먯뿉 ?꾨떖?섎㈃ ?ъ씤??而щ윭濡??꾪솚
    const paintDots = (progress: number) => {
      dots.forEach((d, i) => {
        d.classList.toggle(styles.dotActive, progress >= dotFracs[i]);
      });
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      fill.style.transform = "scaleY(1)";
      dots.forEach((d) => d.classList.add(styles.dotActive));
      return;
    }

    // ?ㅽ겕濡?吏꾪뻾?꾩뿉 留욎떠 ?몃줈 ?좎씠 ?????꾨옒濡??먮씪?섍퀬,
    // ?앷퉴吏 ?ㅽ겕濡ㅽ븯硫?????瑗щ━ ?섏씠??援ш컙)源뚯? 媛??李щ떎.
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = line.getBoundingClientRect();
      const head = window.innerHeight * 0.9;
      const progress = Math.min(1, Math.max(0, (head - rect.top) / rect.height));
      fill.style.transform = `scaleY(${progress})`;
      paintDots(progress);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    const target: EventTarget = scroller ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // 각 프로젝트 행이 스크롤로 보일 때 하나씩 위로 떠오름
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rows = Array.from(
      wrap.querySelectorAll<HTMLElement>("[data-timeline-row]")
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      rows.forEach((r) => r.classList.add(styles.rowVisible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.rowVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    rows.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.projects}>
      <h2 className={`${styles.sectionTitle} ${styles.projectsTitle}`}>
        Project
      </h2>

      <div className={styles.timelineWrap} ref={wrapRef}>
        <div className={styles.line} ref={lineRef}>
          <div className={styles.lineFill} ref={fillRef} aria-hidden="true" />
        </div>

        {resumeProjects.map((project) => (
          <article
            key={project.id}
            className={styles.projectRow}
            data-timeline-row
          >
            <div className={styles.projectHeader}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
            </div>
            <div className={styles.projectBody}>
              {/* dot은 애니메이션 transform에서 제외되도록 body 직속에 둠 */}
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.projectMedia}>
                <div className={styles.projectImage}>
                  {project.resumeVideo && (
                    <>
                      <video
                        className={styles.projectVideo}
                        src={project.resumeVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      <div className={styles.videoOverlay} aria-hidden="true" />
                    </>
                  )}
                </div>
              </div>
              <div className={styles.projectText}>
                <p className={styles.projectDesc}>{project.role}</p>
                {(project.github || project.deploy) && (
                  <div className={styles.projectLinks}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkBtn}
                      >
                        <span className={styles.ghIcon} aria-hidden="true" />
                        GitHub로 이동
                      </a>
                    )}
                    {project.deploy && (
                      <a
                        href={project.deploy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkBtn}
                      >
                        <svg
                          viewBox="2 2 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M3 12h18" />
                          <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
                        </svg>
                        사이트로 이동
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}

        <article
          className={`${styles.projectRow} ${styles.ingRow}`}
          data-timeline-row
        >
          <h3 className={styles.projectTitle}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.typewriter} aria-label="ing . . .">
              ing . . .
            </span>
          </h3>
        </article>
      </div>
    </section>
  );
}
