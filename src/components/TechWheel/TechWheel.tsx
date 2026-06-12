"use client";

import { useEffect, useRef } from "react";
import SkillIcon, { skillNames } from "@/components/SkillIcon/SkillIcon";
import styles from "./TechWheel.module.scss";

type Props = {
  /** 휠에 표시할 스킬 이름 목록 (기본: 전체 스킬) */
  items?: string[];
  /** 아이콘 간 가상 간격 (px) */
  spacing?: number;
  /** 자동 회전 속도 (px / ms) */
  autoSpeed?: number;
};

/**
 * 가로 방향 Wheel Picker (하이브리드).
 * - 기본: 천천히 자동으로 굴러감
 * - hover / 드래그 중: 일시정지 (사용자가 직접 돌릴 수 있음)
 * - 손을 떼면 관성으로 감속한 뒤 자동 회전 재개
 * 가운데 아이콘이 가장 선명/크고 좌우로 갈수록 작아지고 흐려진다.
 */
export default function TechWheel({
  items = skillNames,
  spacing = 58,
  autoSpeed = 0.035,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  // deps에 배열을 직접 넣으면 길이 변화로 경고가 날 수 있어 문자열 키로 고정
  const itemsKey = items.join("|");

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const els = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    const n = els.length;
    if (!n) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      els.forEach((el) => {
        el.style.cssText = "";
      });
      return;
    }

    const total = n * spacing;
    let scroll = 0;
    let velocity = 0; // 드래그 관성
    let dragging = false;
    let hovering = false;
    let lastX = 0;
    let lastTs = 0;
    let raf = 0;

    const wrap = () => {
      scroll = ((scroll % total) + total) % total;
    };

    const layout = () => {
      const maxDist = Math.max(150, viewport.clientWidth / 2);
      els.forEach((el, i) => {
        let pos = (i * spacing - scroll) % total;
        if (pos < -total / 2) pos += total;
        if (pos > total / 2) pos -= total;

        const t = Math.min(Math.abs(pos) / maxDist, 1); // 0(중앙) ~ 1(끝)
        const opacity = 1 - 0.6 * t;
        const blur = (1.4 * t).toFixed(2);
        const rotateY = (pos / maxDist) * 45;
        const z = -40 * t; // 끝으로 갈수록 원근으로 살짝 작아짐(scale 없이 자연스럽게)

        el.style.transform =
          `translate(-50%, -50%) translateX(${pos}px) ` +
          `translateZ(${z}px) rotateY(${rotateY}deg)`;
        el.style.opacity = String(opacity);
        el.style.filter = `blur(${blur}px)`;
        el.style.zIndex = String(Math.round((1 - t) * 100));
      });
    };

    const tick = (ts: number) => {
      const dt = lastTs ? ts - lastTs : 16;
      lastTs = ts;

      if (!dragging) {
        if (Math.abs(velocity) > 0.15) {
          // 드래그 후 관성 감속
          scroll += velocity;
          velocity *= 0.94;
        } else if (!hovering) {
          // 자동 회전
          scroll += autoSpeed * dt;
        }
      }
      wrap();
      layout();
      raf = requestAnimationFrame(tick);
    };

    // ----- 드래그 -----
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add(styles.dragging);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      scroll -= dx;
      velocity = -dx;
      wrap();
      layout();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove(styles.dragging);
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch {}
      // 손을 뗀 위치에 커서가 남아있지 않으면 자동 재개됨 (tick에서 처리)
    };

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    const onResize = () => layout();

    raf = requestAnimationFrame(tick);
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, spacing, autoSpeed]);

  return (
    <div
      className={styles.viewport}
      ref={viewportRef}
      role="list"
      aria-label="기술 스택 (드래그하여 돌려보세요)"
    >
      <div className={styles.stage}>
        {items.map((name, i) => (
          <div
            key={name}
            className={styles.item}
            role="listitem"
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            <SkillIcon name={name} className={styles.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
