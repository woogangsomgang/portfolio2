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
    link: "https://portfolio2-five-kappa.vercel.app/",
    github: "https://github.com/woogangsomgang/portfolio2",
    deploy: "https://portfolio2-five-kappa.vercel.app/",
    resumeVideo: "/projects/portfolio-resume.mp4",
    videos: ["/projects/portfolio-resume.mp4"],
    tags: ["html", "scss", "javascript", "next.js", "react", "typescript"],
    externalLinks: [
      { label: "사이트 보기", url: "https://portfolio2-five-kappa.vercel.app/" },
      { label: "GitHub", url: "https://github.com/woogangsomgang/portfolio2" },
    ],
    description: `React·Next.js·TypeScript로 기획부터 구현·배포까지 직접 진행한 개인 포트폴리오 웹사이트입니다. About me·Skills·Projects·Contact를 한 페이지에서 탐색하는 싱글 페이지 구조로, 사이드바 네비게이션과 프로젝트 상세 모달, 기술 스택 인터랙션 등 프론트엔드 UI 구현에 집중했습니다.`,
    features: [
      "섹션 기반 싱글 페이지: About me·Skills·Projects·Contact를 한 페이지에서 탐색하고, 사이드바 메뉴 클릭 시 해당 섹션으로 부드럽게 스크롤 이동",
      "현재 섹션 추적: IntersectionObserver로 화면에 보이는 섹션을 감지해 사이드바 메뉴의 active 상태를 자동으로 동기화",
      "프로젝트 카드 & 상세 모달: 카드로 대표 영상·요약·기술 스택을 보여주고, 클릭 시 모달에서 주요 기능·트러블슈팅·코드 예시를 확인",
      "스킬 휠: 기술 스택 아이콘을 가로 원통형 휠로 표현하고, 자동 회전과 드래그 조작을 함께 지원",
      "인터랙션 UI: 카드·버튼 hover, 모달 오픈/클로즈, 상단 이동 버튼, 타이핑·페이드 등 사용자 동작에 반응하는 애니메이션",
      "이력서 페이지: 프로젝트 타임라인·영상 카드·외부 링크를 별도 페이지로 구성하고 스크롤 진입 애니메이션 적용",
      "반응형 레이아웃: 데스크톱 사이드바 중심 구성에서 모바일 환경까지 대응하도록 레이아웃 분기",
      "Vercel 배포: GitHub 연동 기반 자동 배포로 main에 push 시 프로덕션에 반영",
    ],
    troubleshooting: [
      {
        situation:
          "프로젝트 상세 모달이 열린 상태에서 모달 안을 스크롤하면, 스크롤이 끝에 닿는 순간 뒤쪽 페이지까지 같이 움직여 읽던 위치가 바뀌는 문제가 있었습니다.",
        cause:
          "모달은 오버레이 위에 떠 있을 뿐 페이지 스크롤 자체를 막지는 않습니다. 그래서 모달이 열려 있어도 배경 스크롤이 살아 있어, 모달 내부 스크롤이 한계에 도달하면 스크롤이 배경으로 이어져 함께 움직였습니다.",
        solution:
          "모달이 열릴 때 body의 overflow를 hidden으로 잠그고 닫힐 때 원래 값으로 복구했습니다. 기존 overflow 값을 저장해 두었다가 그대로 되돌려 다른 곳의 스타일과 충돌하지 않게 했고, 모달 컨텐츠에는 max-height와 overflow-y: auto를 줘서 내부에서만 스크롤되도록 분리했습니다.",
        solutionCode: [
          {
            code: `useEffect(() => {
  if (!open) return;

  // 모달이 열리면 배경(body) 스크롤을 잠그고, 닫힐 때 원래 값으로 복구
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = originalOverflow;
  };
}, [open]);`,
            caption:
              "모달 open 시 body 스크롤을 잠그고, cleanup에서 저장해 둔 기존 overflow 값으로 복구합니다.",
          },
          {
            code: `.modal {
  max-height: 85vh;
  overflow-y: auto; // 배경이 아니라 모달 내부에서만 스크롤
}`,
            caption:
              "모달 컨텐츠 영역에만 내부 스크롤을 두어 상세 내용을 읽는 동안 배경 위치가 바뀌지 않게 했습니다.",
          },
        ],
      },
      {
        situation:
          "사이드바 메뉴를 클릭해 섹션으로 이동할 때, 모든 섹션에 동일한 방식으로 스크롤하면 Skills·Projects처럼 콘텐츠가 많은 섹션이 화면에서 어색한 위치(너무 아래)에 멈추는 문제가 있었습니다.",
        cause:
          "스크롤 주체가 window가 아니라 별도의 .content 영역(body는 overflow: hidden)이라, 단순 앵커 이동이나 window 기준 계산으로는 정확한 도착 위치를 잡기 어려웠습니다. 또 섹션마다 높이·여백이 달라 같은 위치 규칙을 쓰면 일부 섹션만 치우쳐 보였습니다.",
        solution:
          "섹션별 보정값(offset)을 매핑해 두고, 스크롤 컨테이너(.content) 기준으로 섹션의 상대 위치를 직접 계산해 scrollTo로 이동했습니다. 보정값이 있는 섹션만 기본 앵커 동작을 막고 약간 위로 멈추게 하여, 콘텐츠가 많은 섹션도 보기 좋은 위치에 정렬되도록 했습니다.",
        solutionCode: [
          {
            code: `const sectionOffsets: Record<string, number> = {
  skills: -100,
  projects: -100,
};

const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string
) => {
  const offset = sectionOffsets[id];
  if (offset === undefined) return; // 보정값 없는 섹션은 기본 동작 유지

  const container = document.querySelector<HTMLElement>(".content");
  const section = document.getElementById(id);
  if (!container || !section) return;

  e.preventDefault();
  // window가 아닌 스크롤 컨테이너(.content) 기준으로 위치 계산
  const top =
    section.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop +
    offset;
  container.scrollTo({ top, behavior: "smooth" });
};`,
            caption:
              "스크롤 주체가 window가 아닌 .content라서, 컨테이너 기준 상대 위치를 계산하고 섹션별 offset을 더해 도착 지점을 보정했습니다.",
          },
        ],
      },
      {
        situation:
          "스크롤 위치에 따라 사이드바 active 메뉴가 바뀌어야 하는데, 섹션 경계에서 두 섹션이 동시에 걸칠 때 active가 흔들리거나 엉뚱한 섹션으로 잡히는 문제가 있었습니다.",
        cause:
          "scroll 이벤트로 위치를 직접 계산하면 경계에서 값이 자주 튀고, IntersectionObserver를 쓰더라도 '교차하는 첫 번째' 섹션만 고르면 두 섹션이 함께 보일 때 부정확했습니다.",
        solution:
          "IntersectionObserver의 root를 스크롤 컨테이너(.content)로 지정하고 여러 threshold(0.4·0.6·0.8)를 줘서, 교차 중인 섹션들 중 화면에 가장 많이 보이는(intersectionRatio가 가장 큰) 섹션을 active로 선택했습니다. 덕분에 경계에서도 active가 안정적으로 한 섹션을 가리킵니다.",
        solutionCode: [
          {
            code: `const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries.filter((e) => e.isIntersecting);
    if (visible.length === 0) return;
    // 교차 중인 섹션 중 화면에 가장 많이 보이는 섹션을 선택
    const top = visible.reduce((acc, e) =>
      e.intersectionRatio > acc.intersectionRatio ? e : acc
    );
    setActiveSection(top.target.id);
  },
  { root: document.querySelector(".content"), threshold: [0.4, 0.6, 0.8] }
);

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});`,
            caption:
              "여러 threshold로 관찰하고 intersectionRatio가 가장 큰 섹션을 고르면 경계에서 active가 튀지 않습니다.",
          },
        ],
      },
      {
        situation:
          "로컬에서는 정상 동작했지만 Vercel에 배포한 뒤 루트(/) 접속 시 'NOT_FOUND' 페이지가 떴습니다. 빌드 상태는 Ready였는데도 사이트가 404였습니다.",
        cause:
          "빌드는 성공(Ready)이라 코드 문제는 아니었고, 화면도 Next의 not-found가 아니라 Vercel 플랫폼 레벨 404였습니다. 확인해 보니 프로젝트의 Framework Preset이 'Next.js'가 아니라 'Other'로 설정돼 있어, 빌드는 돌지만 Vercel이 Next.js(App Router)의 라우팅 출력을 적용하지 않아 루트 경로를 찾지 못한 것이 원인이었습니다.",
        solution:
          "로컬에서 next build로 라우트가 정상 생성되는지(/, /resume) 먼저 확인해 코드 문제가 아님을 좁힌 뒤, Vercel 프로젝트 설정에서 Framework Preset을 Next.js로 변경하고 빌드 캐시를 비운 상태로 재배포했습니다. 이후 루트 경로가 정상 서빙됐습니다. (App Router 프로젝트라 별도 rewrites 설정은 필요하지 않았습니다.)",
        solutionCode: [
          {
            code: `# 로컬 빌드로 라우트 생성 확인 (코드 문제 여부부터 좁히기)
$ next build

Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /resume

# → 로컬은 정상. 원인은 Vercel 설정 (Framework Preset: Other → Next.js)`,
            caption:
              "로컬 빌드의 라우트 표로 코드 정상 여부를 먼저 확인하고, Vercel Framework Preset을 Next.js로 바꾼 뒤 캐시 없이 재배포해 해결했습니다.",
          },
        ],
      },
    ],
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
