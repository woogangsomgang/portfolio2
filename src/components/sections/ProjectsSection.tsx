"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal/Modal";
import ProjectDetail from "@/components/ProjectDetail/ProjectDetail";
import MagnifyCursor from "@/components/MagnifyCursor/MagnifyCursor";
import ProjectVideo from "@/components/ProjectVideo/ProjectVideo";
import SkillIcon from "@/components/SkillIcon/SkillIcon";
import type { Project } from "@/types/project";
import { projects } from "@/data/projects";
import styles from "./ProjectsSection.module.scss";

const GAP_PX = 28;

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selected, setSelected] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

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
        const visible = entries[0].isIntersecting;
        setIsProjectVisible(visible);
        if (visible) setInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tabletMq = window.matchMedia("(max-width: 1024px)");
    const mobileMq = window.matchMedia("(max-width: 768px)");
    const update = () => {
      if (mobileMq.matches) setVisibleCount(1);
      else if (tabletMq.matches) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    tabletMq.addEventListener("change", update);
    mobileMq.addEventListener("change", update);
    return () => {
      tabletMq.removeEventListener("change", update);
      mobileMq.removeEventListener("change", update);
    };
  }, []);

  const maxIndex = Math.max(0, projects.length - visibleCount);

  useEffect(() => {
    setCurrentIndex((idx) => Math.min(idx, maxIndex));
  }, [maxIndex]);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxIndex;

  const handlePrev = () => {
    setHasUserInteracted(true);
    setCurrentIndex((i) => Math.max(0, i - 1));
  };
  const handleNext = () => {
    setHasUserInteracted(true);
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  };

  useEffect(() => {
    if (!isProjectVisible || hasUserInteracted || maxIndex <= 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isProjectVisible, hasUserInteracted, maxIndex]);

  const totalGap = GAP_PX * (visibleCount - 1);
  const cardFlex = `0 0 calc((100% - ${totalGap}px) / ${visibleCount})`;
  const trackTransform = `translateX(calc(-${currentIndex} * ((100% - ${totalGap}px) / ${visibleCount} + ${GAP_PX}px)))`;

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className={`${styles.section} ${inView ? styles.isVisible : ""}`}
      >
        <h1 className={styles.title}>Projects</h1>

        <div className={styles.slider}>
          <button
            type="button"
            className={`${styles.sliderBtn} ${styles.prev}`}
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous projects"
          >
            ‹
          </button>

          <div className={styles.viewport}>
            <ul
              className={styles.track}
              style={{ transform: trackTransform }}
            >
              {projects.map((project) => (
                <li
                  key={project.id}
                  className={styles.card}
                  style={{ flex: cardFlex }}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                      aria-label={`${project.title} 사이트 열기`}
                    >
                      <span className={styles.siteIcon} aria-hidden="true" />
                    </a>
                  </div>

                  <button
                    type="button"
                    className={styles.detailBtn}
                    onClick={() => setSelected(project)}
                    aria-label={`${project.title} 상세 보기`}
                  >
                    <MagnifyCursor>
                      <ProjectVideo
                        className={styles.videoWrap}
                        sources={
                          project.videos ??
                          (project.video ? [project.video] : [])
                        }
                      />
                    </MagnifyCursor>
                  </button>

                  <div className={styles.cardFooter}>
                    <p className={styles.cardDesc}>{project.summary}</p>
                    <div className={styles.tags}>
                      {project.tags.map((tag, index) => (
                        <SkillIcon
                          key={tag}
                          name={tag}
                          className={`${styles.tag} ${
                            index >= 5 ? styles.hiddenTag : ""
                          }`}
                        />
                      ))}
                      {project.tags.length > 5 && (
                        <span className={styles.moreTag} aria-hidden="true">
                          +{project.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className={`${styles.sliderBtn} ${styles.next}`}
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next projects"
          >
            ›
          </button>
        </div>
      </section>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        bgColor={selected?.colors?.bg}
        textColor={selected?.colors?.text}
      >
        {selected && (
          <ProjectDetail
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </Modal>
    </>
  );
}
