"use client";

import { useState } from "react";
import type { Project } from "@/types/project";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import styles from "./ProjectDetail.module.scss";

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectDetail({ project, onClose }: Props) {
  const [videoIndex, setVideoIndex] = useState(0);
  const videos = project.videos ?? [];
  const hasVideos = videos.length > 0;
  const codeBg = project.colors?.code;

  const goPrev = () => {
    if (!hasVideos) return;
    setVideoIndex((i) => (i - 1 + videos.length) % videos.length);
  };
  const goNext = () => {
    if (!hasVideos) return;
    setVideoIndex((i) => (i + 1) % videos.length);
  };

  return (
    <article className={styles.detail}>
      <button type="button" onClick={onClose} className={styles.back}>
        ‹ 프로젝트 목록으로 돌아가기
      </button>

      <div className={styles.slider}>
        <button
          type="button"
          className={`${styles.sliderNav} ${styles.prev}`}
          onClick={goPrev}
          aria-label="Previous video"
          disabled={!hasVideos}
        >
          ‹
        </button>
        <div className={styles.sliderImage}>
          {hasVideos && (
            <video
              key={videoIndex}
              src={videos[videoIndex]}
              className={styles.modalVideo}
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
            />
          )}
        </div>
        <button
          type="button"
          className={`${styles.sliderNav} ${styles.next}`}
          onClick={goNext}
          aria-label="Next video"
          disabled={!hasVideos}
        >
          ›
        </button>
      </div>

      <header className={styles.header}>
        <h2 className={styles.projectTitle}>{project.title}</h2>
        {project.externalLinks && project.externalLinks.length > 0 && (
          <div className={styles.externalLinks}>
            {project.externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {project.description && (
        <p className={styles.description}>{project.description}</p>
      )}

      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>주요 기능</h3>
        {project.features && project.features.length > 0 ? (
          <ul className={styles.features}>
            {project.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty} />
        )}
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>트러블 슈팅</h3>
        {project.troubleshooting && project.troubleshooting.length > 0 ? (
          project.troubleshooting.map((item, i) => (
            <div key={i} className={styles.trouble}>
              {item.situation && (
                <>
                  <h4 className={styles.troubleSubtitle}>문제상황</h4>
                  <p className={styles.troubleText}>{item.situation}</p>
                </>
              )}
              <h4 className={styles.troubleSubtitle}>원인분석</h4>
              {item.causeImage && (
                <div
                  className={styles.codeBox}
                  style={codeBg ? { background: codeBg } : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.causeImage} alt="원인분석" />
                </div>
              )}
              {item.causeCode?.map((sample, j) => (
                <div key={j} className={styles.codeSample}>
                  <CodeBlock code={sample.code} />
                  {sample.caption && (
                    <p className={styles.codeCaption}>{sample.caption}</p>
                  )}
                </div>
              ))}
              {item.cause && (
                <p className={styles.troubleText}>{item.cause}</p>
              )}
              <h4 className={styles.troubleSubtitle}>해결방법</h4>
              {item.solutionImage && (
                <div
                  className={styles.codeBox}
                  style={codeBg ? { background: codeBg } : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.solutionImage} alt="해결방법" />
                </div>
              )}
              {item.solutionCode?.map((sample, j) => (
                <div key={j} className={styles.codeSample}>
                  <CodeBlock code={sample.code} />
                  {sample.caption && (
                    <p className={styles.codeCaption}>{sample.caption}</p>
                  )}
                </div>
              ))}
              {item.solution && (
                <p className={styles.troubleText}>{item.solution}</p>
              )}
            </div>
          ))
        ) : (
          <div className={styles.trouble}>
            <h4 className={styles.troubleSubtitle}>원인분석</h4>
            <div
              className={styles.codeBox}
              style={codeBg ? { background: codeBg } : undefined}
            >
              <span>코드 사진</span>
            </div>
            <h4 className={styles.troubleSubtitle}>해결방법</h4>
            <div
              className={styles.codeBox}
              style={codeBg ? { background: codeBg } : undefined}
            >
              <span>코드 사진</span>
            </div>
          </div>
        )}
      </section>
    </article>
  );
}
