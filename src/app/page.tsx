import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Portfolio</h1>
      <p className={styles.description}>Next.js + TypeScript + SCSS</p>
    </main>
  );
}
