import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "온집 프로젝트",
    summary: "javascript와 외부 api를 연동하여 제작한 유기견 사이트",
    role: `페이지 디자인을 총괄하였고 입양 문의·참여하기·오시는 길 페이지를 맡아 사용자가 보호소와 자연스럽게 연결되는 흐름을 구현했습니다. 단순히 정보를 보여주기보다, 입양·봉사·후원이라는 행동으로 이어질 수 있도록 화면 구성과 문의 방식에 신경 썼습니다.

가장 재미있었던 부분은 Git·외부 API·JSON을 처음 다뤄본 것입니다. 시행착오는 많았지만 데이터를 가져와 화면에 반영하고, 팀원들과 함께 하나의 서비스를 완성해가는 과정에서 협업의 즐거움을 배울 수 있었습니다.`,
    link: "https://soyoung00.github.io/onjib-project/",
    github: "https://github.com/soyoung00/onjib-project",
    deploy: "https://soyoung00.github.io/onjib-project/",
    resumeVideo: "/projects/onjib-resume.mp4",
    tags: ["html", "scss", "javascript"],
    videos: [
      "/projects/onjib-1.mp4",
      "/projects/onjib-2.mp4",
      "/projects/onjib-3.mp4",
      "/projects/onjib-4.mp4",
      "/projects/onjib-5.mp4",
      "/projects/onjib-6.mp4",
      "/projects/onjib-7.mp4",
      "/projects/onjib-8.mp4",
    ],
    description: `유기동물 보호와 입양 활성화를 목표로 개와 고양이를 중심으로 한 입양, 파양, 입소, 봉사, 후원 서비스를 제공하는 플랫폼입니다. 사용자가 각 서비스에 쉽게 접근할 수 있도록 직관적인 UI를 구성하였으며, 팝업폼 기반의 기능을 통해 신청 및 참여 과정을 간소화했습니다. 또한 입양 후기 작성, 입양 혜택 안내, 슬라이드 기능, API 연동 등을 적용하여 유기동물과 사용자 간의 연결성을 높이고, 반려동물과 사람이 함께할 수 있는 지속 가능한 환경 조성을 목표로 제작했습니다.`,
    features: [
      "입양 문의: 입양가능한 동물의 정보확인 가능 및 팝업 폼으로 간편하게 문의 제출",
      "파양&입소 문의: 팝업 폼으로 간편하게 문의 제출",
      "입양 후기: 입양한 반려동물 경험 공유 및 댓글기능 및 후기작성 가능",
      "후원 신청: 다양한 방법으로 유기동물 후원 가능",
      "봉사 신청: 보호소 봉사 활동 참여 신청",
      "입양 혜택 안내: 카테고리별 입양 혜택 정보 제공",
      "외부 API 연동: 동물 정보 및 공지사항 실시간 제공",
      "반응형 지원: 모바일(~768px) 및 태블릿(~1024px) 환경 최적화",
    ],
    troubleshooting: [
      {
        situation: "입양 상세페이지에서 새로고침하거나 직접 URL로 접근하면 동물 정보가 표시되지 않는 문제 발생",
        cause: "상세 페이지는 목록 페이지에서 선택된 동물 데이터를 기반으로  동작하도록 설계되어 있었습니다.하지만 페이지가 새로 로드될 경우 선택된 데이터가 존재하지 않아 화면에 출력할 데이터가 없는 상태가 발생하였습니다",
        solution: "",
        solutionCode: [
          {
            code: `li.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.setItem("currentPage", currentPage);
  localStorage.setItem("selectedAnimal", JSON.stringify(item));
  window.location.href = "page/adoption/introduce.html";
});`,
            caption: "선택한 동물 데이터를 localStorage에 저장하여 상세 페이지로 전달하도록 구현하였습니다.",
          },
          {
            code: `// 상세페이지 진입
document.addEventListener("DOMContentLoaded", function () {
  const animal = JSON.parse(localStorage.getItem("selectedAnimal"));
  if (!animal) return;
});`,
            caption: "localStorage에서 데이터를 불러오고, 데이터가 없을 경우 실행을 중단하도록 방어 코드를 작성하였습니다.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Store Pilot",
    summary: "OpenAI 기반 AI 에이전트를 활용한 영업관리 서비스",
    role: `로그인·회원가입과 온보딩 페이지를 맡아 사용자가 서비스를 처음 만나는 흐름을 구현했습니다. 소셜 로그인 API 연동, 사용자 정보 DB 저장, 입력값 유효성 검사까지 직접 다루며 인증 흐름이 안정적으로 동작하도록 신경 썼습니다. 특히 온보딩에서 입력한 정보가 단순 설문으로 끝나지 않고, 이후 매장 초기 설정과 추천 기능으로 이어지도록 구성하는 데 집중했습니다.

가장 재미있었던 부분은 처음으로 LLM을 활용해 카테고리 추천 기능을 만들어본 것입니다. AI를 단순 기능이 아니라 실제 서비스 UX 안에 자연스럽게 녹여보는 과정에서, 사용자 흐름을 끝까지 고민하는 경험을 할 수 있었습니다.`,
    link: "https://storepilot-puce.vercel.app/",
    github: "https://github.com/woogangsomgang/StorePilot",
    deploy: "https://storepilot-puce.vercel.app/",
    resumeVideo: "/projects/sp-resume.mp4",
    externalLinks: [
      { label: "사이트 보기", url: "https://storepilot-puce.vercel.app/" },
      { label: "GitHub", url: "https://github.com/woogangsomgang/StorePilot" },
    ],
    tags: ["html", "scss", "javascript", "next.js", "react", "node.js", "mongoDB", "nextauth", "axios", "gemini-api", "zustand"],
    videos: [
      "/projects/sp-1.mp4",
      "/projects/sp-2.mp4",
      "/projects/sp-3.mp4",
      "/projects/sp-4.mp4",
      "/projects/sp-5.mp4",
      "/projects/sp-6.mp4",
    ],
    description: `AI 기반 매장 관리 및 데이터 분석 플랫폼
매장의 매출, 메뉴, 재고, 스케줄 데이터를 분석하여 효율적인 운영을 지원합니다.`,
    features: [
      "매출 데이터 분석: 매장의 일별·월별 매출 데이터를 분석하여 매출 흐름과 운영 현황 확인 가능",
      "메뉴 판매량 관리: 메뉴별 판매량을 확인하고 인기 메뉴 및 부진 메뉴 파악 가능",
      "재고 관리: 보유 재고와 사용량을 관리하여 재고 부족 및 과잉을 예방",
      "직원 스케줄 관리: 직원별 근무 일정 등록 및 스케줄 확인 가능",
      "AI 기반 운영 인사이트 제공: 매장 데이터를 기반으로 운영 개선 방향 및 관리 인사이트 제공",
      "데이터 시각화 대시보드: 매출, 메뉴, 재고 등의 데이터를 그래프와 차트로 시각화하여 제공",
      "기술 스택: 프로젝트 개발에 사용된 프론트엔드, 백엔드, 데이터베이스 및 주요 라이브러리 정보 제공"
    ],
    troubleshooting: [
      {
        situation: "빈 칸 검증 실패 시 입력창 흔들림 애니메이션이 두번째 제출부터 작동하지 않음",
        cause: "입력값이 틀렸을 때 흔들림 애니메이션이 실행되도록 만들었는데, 한 번 흔들린 뒤에는 다시 틀려도 애니메이션이 제대로 작동하지 않는 문제가 있었습니다. 이유는 CSS 애니메이션이 같은 클래스가 계속 붙어 있는 상태에서는 다시 처음부터 실행되지 않기 때문입니다. 즉, shake 클래스가 이미 적용된 상태라면 브라우저 입장에서는 “새로운 변화가 없다”고 판단해서 애니메이션을 다시 재생하지 않았습니다. 또한 React 18부터는 상태 변경이 자동으로 묶여서 처리되기 때문에 setShake(false)로 클래스를 제거하고 바로 setShake(true)를 실행해도 중간 상태가 실제 DOM에 반영되지 않았습니다. 결국 클래스가 제거됐다가 다시 붙는 과정이 눈에 보이게 발생하지 않아 애니메이션이 재실행되지 않았습니다.",
        solution: "이 문제를 해결하기 위해 입력값 검증에 실패했을 때 바로 shake 클래스를 다시 붙이는 방식이 아니라, 먼저 흔들림 상태를 false로 바꿔서 기존 클래스를 제거하도록 했습니다. 그 다음 requestAnimationFrame()을 사용해서 브라우저가 클래스가 제거된 상태를 한 번 인식한 뒤, 다음 화면 갱신 시점에 다시 setShake(true)를 실행했습니다. 이렇게 하니까 DOM 입장에서는 shake 클래스가 제거됐다가 다시 추가되는 변화가 생기기 때문에, 같은 입력 오류가 반복되어도 흔들림 애니메이션이 매번 처음부터 정상적으로 실행되었습니다. 또한 애니메이션이 끝난 뒤에는 onAnimationEnd를 사용해서 shake 상태를 다시 false로 초기화했습니다. 이를 통해 다음 오류 발생 시에도 애니메이션이 다시 실행될 수 있도록 구조를 정리했습니다.",
        solutionCode: [
          {
            code: `// 1. 먼저 false로
const triggerShake = (setter) => {
  setter(false);
  // 2. 다음 프레임에 true
  requestAnimationFrame(() => setter(true));
};`,
            caption: "흔들림 상태를 먼저 false로 끈 뒤 requestAnimationFrame으로 다음 프레임에 true로 켜서, 두 번의 state 업데이트가 서로 다른 렌더 사이클에 커밋되도록 강제합니다.",
          },
          {
            code: `<input
  className={\`... \${storeNameShake ? styles.shake : ""}\`}
  onAnimationEnd={() => setStoreNameShake(false)}
/>`,
            caption: "애니메이션이 끝나면 onAnimationEnd로 shake 클래스를 자동 제거해, 다음 오류 발생 시 깨끗한 상태에서 다시 실행되도록 했습니다.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "개인 포트폴리오",
    summary: "Next.js와 TypeScript를 기반으로 만든 개인 포트폴리오",
    role: `Next.js와 TypeScript를 기반으로 기획부터 디자인, 구현까지 직접 진행한 개인 포트폴리오입니다. 하나의 페이지 안에서 About·Skills·Projects·Contact를 자연스럽게 오갈 수 있도록 IntersectionObserver로 현재 섹션을 추적해 사이드바에 표시했고, 프로젝트 데이터는 한 파일에서 타입과 함께 관리해 카드 슬라이더와 상세 모달이 같은 데이터를 공유하도록 구조화했습니다. 단순히 결과물을 나열하기보다, 방문자가 직접 눌러 영상·주요 기능·트러블슈팅 코드까지 확인하는 흐름에 신경 썼습니다.

가장 재미있었던 부분은 인터랙션을 직접 만들어본 것입니다. 영상 위에 마우스를 올리면 그 부분이 확대되는 돋보기 커서를 구현하며 requestAnimationFrame으로 렌더링 성능을 처음 깊이 고민해봤고, 반응형 캐러셀과 타이핑 애니메이션 등을 만들며 옵저버·타이머 정리와 접근성까지 챙기는 일이 까다로웠지만 그만큼 많이 배운 프로젝트였습니다.`,
    link: "#",
    resumeVideo: "/projects/portfolio-resume.mp4",
    videos: ["/projects/portfolio-resume.mp4"],
    tags: ["html", "scss", "javascript", "next.js", "react", "typescript"],

  },
  {
    id: 4,
    title: "프로젝트 제목",
    summary: "",
    link: "#",
    tags: ["javascript", "next.js", "react", "typescript"],
  },
  {
    id: 5,
    title: "프로젝트 제목",
    summary: "",
    link: "#",
    tags: ["javascript", "next.js", "react", "typescript"],
  },
  {
    id: 6,
    title: "프로젝트 제목",
    summary: "",
    link: "#",
    tags: ["javascript", "next.js", "react", "typescript"],
  },
];
