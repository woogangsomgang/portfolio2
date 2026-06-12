import styles from "./SkillIcon.module.scss";

// 값은 /public/icons/skills/ 안의 실제 파일명(확장자 포함)과 일치해야 합니다.
const iconMap: Record<string, string> = {
  html: "html.svg",
  css: "css.svg",
  scss: "scss.svg",
  javascript: "javascript.svg",
  typescript: "typescript.svg",
  react: "react.svg",
  "next.js": "nextjs.svg",
  "node.js": "nodejs.svg",
  mongoDB: "MongoDB.svg",
  tailwind: "tailwindcss.svg",
  zustand: "zustand.svg",
  axios: "axios.svg",
  nextauth: "next-auth.png",
  "gemini-api": "google-gemini.svg",
  vercel: "vercel.svg",
  github: "github.svg",
  figma: "figma.svg",
  slack: "slack.svg",
};

const labelMap: Record<string, string> = {
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  "next.js": "Next.js",
  "node.js": "Node.js",
  mongoDB: "MongoDB",
  tailwind: "Tailwind CSS",
  zustand: "Zustand",
  axios: "Axios",
  nextauth: "NextAuth",
  "gemini-api": "Gemini API",
  vercel: "Vercel",
  github: "GitHub",
  figma: "Figma",
  slack: "Slack",
};

// iconMap에 등록된 전체 스킬 이름 (TechWheel 등에서 재사용)
export const skillNames = Object.keys(iconMap);

type Props = {
  name: string;
  className?: string;
};

export default function SkillIcon({ name, className }: Props) {
  const icon = iconMap[name];
  if (!icon) return null;
  const label = labelMap[name] ?? name;
  return (
    <span
      className={`${styles.skillIcon} ${className ?? ""}`}
      data-label={label}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/icons/skills/${icon}`} alt={label} />
    </span>
  );
}
