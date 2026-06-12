"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./MagnifyCursor.module.scss";

type Props = {
  children: ReactNode;
  zoom?: number;
  lensSize?: number;
  className?: string;
  contentClassName?: string;
};

export default function MagnifyCursor({
  children,
  zoom = 1.5,
  lensSize = 200,
  className,
  contentClassName,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingPos = useRef<{ x: number; y: number } | null>(null);

  const [active, setActive] = useState(false);

  const applyPosition = useCallback(() => {
    rafRef.current = null;
    const pos = pendingPos.current;
    const content = contentRef.current;
    if (!pos || !content) return;

    const rect = content.getBoundingClientRect();
    const relX = pos.x - rect.left;
    const relY = pos.y - rect.top;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${relX}px, ${relY}px) translate(-50%, -50%)`;
    }
    if (lensRef.current) {
      lensRef.current.style.transform = `translate(${relX}px, ${relY}px) translate(-50%, -50%)`;
    }
    if (cloneRef.current) {
      const offsetX = lensSize / 2 - relX * zoom;
      const offsetY = lensSize / 2 - relY * zoom;
      cloneRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`;
    }
  }, [lensSize, zoom]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      pendingPos.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(applyPosition);
    },
    [applyPosition]
  );

  const handleMouseEnter = () => setActive(true);
  const handleMouseLeave = () => {
    setActive(false);
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingPos.current = null;
  };

  useEffect(() => {
    if (!active) return;
    const source = contentRef.current;
    const target = cloneRef.current;
    if (!source || !target) return;

    const sync = () => {
      target.replaceChildren();
      const cloned = source.cloneNode(true) as HTMLElement;
      cloned.style.width = `${source.offsetWidth}px`;
      cloned.style.margin = "0";
      target.appendChild(cloned);
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(source, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${active ? styles.active : ""} ${className ?? ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={contentRef}
        className={`${styles.content} ${contentClassName ?? ""}`}
      >
        {children}
      </div>
      {active && (
        <>
          <div
            ref={lensRef}
            className={styles.lens}
            style={{ width: lensSize, height: lensSize }}
            aria-hidden="true"
          >
            <div ref={cloneRef} className={styles.clone} />
          </div>
          <div ref={dotRef} className={styles.dot} aria-hidden="true" />
        </>
      )}
    </div>
  );
}
