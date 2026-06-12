import Link from "next/link";
import ResumeTimeline from "./ResumeTimeline";
import ScrollTop from "@/components/ScrollTop/ScrollTop";
import styles from "./resume.module.scss";

const FOCUS_DESC = `저는 개발을 단순히 코드를 작성하는 일로 보지 않습니다. 사용자의 흐름을 이해하고 팀원과 방향을 맞추며
필요한 기술을 빠르게 실험하고 적용하는 과정으로 여깁니다. 특히 AI를 개발 파트너처럼 활용하는 데 큰 재미를 느끼며
아이디어 정리, 코드 구현, 디버깅, 리팩토링, 기능 설계 과정에서 AI를 적극적으로 활용해 작업 속도와 완성도를 높이고 있습니다.`;

export default function ResumePage() {
  return (
    <main className={`${styles.page} content`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          ‹ 이전으로 돌아가기
        </Link>

        <div className={styles.profileBlock}>
          <h2 className={`${styles.sectionTitle} ${styles.profileTitle}`}>
            Profile
          </h2>

          <section className={styles.focus}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.avatar}
            src="/resume-profile.png"
            alt="진윤서 프로필 사진"
          />
          <div className={styles.focusBody}>
            <h2 className={styles.name}>함께하는 개발자, 진윤서입니다</h2>
            <p className={styles.lead}>
              팀원과의 소통과 협업을 중요하게 생각하며, AI를 적극적으로 활용해 문제 해결
              속도와 개발 생산성을 높이는 개발을 지향합니다.
            </p>
            <p className={styles.focusDesc}>{FOCUS_DESC}</p>
          </div>
          </section>
        </div>

        <ResumeTimeline />
      </div>

      <ScrollTop />
    </main>
  );
}
