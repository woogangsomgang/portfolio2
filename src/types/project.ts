export type ExternalLink = {
  label: string;
  url: string;
};

export type CodeSample = {
  code: string;
  caption?: string;
};

export type Troubleshoot = {
  situation?: string;
  cause: string;
  solution: string;
  causeImage?: string;
  solutionImage?: string;
  causeCode?: CodeSample[];
  solutionCode?: CodeSample[];
};

export type Project = {
  id: number;
  title: string;
  summary?: string;
  description?: string;
  role?: string;
  link: string;
  github?: string;
  deploy?: string;
  /** resume 페이지 Project 카드에 표시할 비디오 경로 */
  resumeVideo?: string;
  tags: string[];
  video?: string;
  videos?: string[];
  externalLinks?: ExternalLink[];
  features?: string[];
  troubleshooting?: Troubleshoot[];
  colors?: {
    bg?: string;
    text?: string;
    code?: string;
  };
};
