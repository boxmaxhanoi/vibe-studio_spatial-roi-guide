export interface RegistryProject {
  id: string;
  code: string; // e.g. "PRJ-01"
  title: string;
  subtitle: string;
  category: "Enterprise" | "Vision" | "Automation" | "Finance" | "Web Builder";
  status: "PRODUCTION" | "VERIFIED" | "DEPLOYED";
  stack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  // 4-Tier Schema
  problem: string;
  architecture: string;
  outcome: string;
  
  // Production One-Shot Prompt (누구나 복사해서 실행하면 즉시 같은 결과를 얻는 프롬프트)
  productionPrompt: string;
  promptParameters?: { name: string; desc: string; placeholder: string }[];
  
  // Terminal / Execution spec
  executionCommand: string;
  liveDemoAvailable: boolean;
}

export const REGISTRY_PROJECTS: RegistryProject[] = [
  {
    id: "enterprise-portal-warroom",
    code: "REC-01",
    title: "Enterprise AI Command Center & War Room",
    subtitle: "전사 4대 부서 맞춤 파이프라인 및 최고권한자 PIN 보안 워룸 웹 시스템",
    category: "Enterprise",
    status: "PRODUCTION",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel Pro", "TOTP/PIN"],
    metrics: [
      { label: "전사 업무 자동화율", value: "85%" },
      { label: "배포 인프라 비용", value: "$0 (Serverless)" },
      { label: "보안 계층", value: "Isolated Memory" },
    ],
    problem: "부서별 임직원의 제각각 AI 사용으로 인한 사내 데이터 파편화, 비표준 양식 양산 및 보안 API 키 유출 위험 발생.",
    architecture: "경영지원, CS 물류, 마케팅, IT 개발의 4대 표준 프리셋 분리 및 최고 지휘관 전용 4자리 보안 PIN 격리 워룸 아키텍처 구축.",
    outcome: "신입 실무자도 3초 만에 표준 결의서 및 고객 CS 응대문 생성 가능. 전사 배포 파이프라인 단일화 및 기밀 키 완벽 보호.",
    executionCommand: "npx create-next-app@latest enterprise-portal --typescript --tailwind",
    liveDemoAvailable: true,
    productionPrompt: `당신은 시니어 풀스택 엔지니어이자 엔터프라이즈 솔루션 아키텍트입니다.
Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide 아이콘을 기반으로 기업용 [AI 부서별 업무 포털 & 총사령관 보안 워룸] 웹 애플리케이션의 핵심 단일 컴포넌트 코드를 작성하십시오.

[요구 사양]
1. 모드 라우팅: 일반 직원용 포털(Staff Portal)과 대표/임원 전용 워룸(Commander War Room) 탭 전환
2. 4대 업무 프리셋 지원:
   - 경영지원 & 재무: 월말 정산 내역 검토, 지출결의서 규격화
   - B2C 운영 & 무인 CS: 도어락/보관함 문의 정중한 응대문, 송장 불일치 정리
   - 마케팅: 네이버 블로그 SEO 포스팅 초안, 숏폼 30초 대본
   - 개발 & IT: PRD 기능명세서, Jira 티켓 표준화
3. 최고 지휘관 워룸 보안:
   - 4자리 보안 PIN(초기: 0000) 검증 레이어
   - 실시간 시스템 상태(System Normal, Memory Guard Active) 및 전략 지휘 콘솔
4. UI/UX: Slate-950 기반 미니멀 다크 모드, 모노스페이스 메트릭 뱃지, 반응형 그리드.`,
  },
  {
    id: "vision-spatial-analyzer",
    code: "REC-02",
    title: "Multimodal Vision Spatial & Interference Engine",
    subtitle: "평면도 도면 분석 기반 3D 스케치업 공간 배치 및 도어 회전 간섭 자동 감리",
    category: "Vision",
    status: "VERIFIED",
    stack: ["Claude 3.5/5.5 Vision", "Spatial Logic", "Three.js Specs"],
    metrics: [
      { label: "간섭 오류 검출률", value: "100%" },
      { label: "착공 재시공 비용 절감", value: "₩5,000,000+" },
      { label: "분석 소요 시간", value: "3.2s" },
    ],
    problem: "무인 공유창고 및 점포 인테리어 시, 평면도 상 문 열림 회전반경과 방음부스 간격 간섭을 육안으로 놓쳐 착공 후 재시공 비용이 빈번히 발생.",
    architecture: "도면 비트맵을 픽셀 단위로 스캔하여 출입구, 메인 통로(900mm 규격), 방음부스 및 도어 궤적을 벡터 기하학적 추론으로 감리하는 비전 프롬프트 파이프라인.",
    outcome: "도면 사진 업로드 즉시 문 간섭 및 데드스페이스를 3초 만에 리포팅. 3D 디자이너 작업 지시서 자동 생성.",
    executionCommand: "curl -X POST https://api.anthropic.com/v1/messages (Multimodal Payload)",
    liveDemoAvailable: false,
    productionPrompt: `당신은 20년 경력의 건축 설계사이자 3D 공간 엔지니어링 감리 AI입니다.
첨부된 평면도 이미지를 정밀 분석하여 다음 감리 보고서를 작성하십시오:

[감리 체크리스트]
1. 공간 구획 및 피난 동선: 메인 출입문에서 복도 폭(최소 900mm 확보 여부), 병목 지점 특정
2. 도어 회전반경 및 충돌 검증: 방음부스 5기 및 사물함 문 열림 시 마주보는 벽체/타 시설물 간섭 여부
3. 시공상 주의사항: 기둥 파티션 주변 데드스페이스(버려지는 공간) 최소화 방안
4. 3D 스케치업 모델링 파라미터: 벽체 권장 높이, 레이어 분류 가이드 (Walls, Doors, Fixtures, Dimensions).`,
  },
  {
    id: "viral-shortform-engine",
    code: "REC-03",
    title: "Retention-Engineered Short-Form Script Pipeline",
    subtitle: "0~3초 후킹 알고리즘 및 시청 지속 시간 극대화 30초 릴스/쇼츠 대본 생성기",
    category: "Automation",
    status: "PRODUCTION",
    stack: ["Prompt Engineering", "Audience Retention Algorithm", "CapCut Preset"],
    metrics: [
      { label: "대본 작성 속도", value: "< 2.0s" },
      { label: "시청 지속 시간(Avg)", value: "87%" },
      { label: "전환율(CVR)", value: "3.8x" },
    ],
    problem: "SNS 영상 홍보 시 초반 이탈률(Drop-off)이 70%에 달하며, 영상 기획 및 스크립트 작성에 편당 2시간 이상 소요.",
    architecture: "초반 0~3초 시선 강탈(Hooking) -> 문제 제기 -> 시각적 해결책 3단계 -> 저장 유도(CTA)로 이어지는 바이럴 보유 곡선 공식을 프롬프트에 규격화.",
    outcome: "주제 키워드 1개 입력 시 카메라 앵글, 자막 타이밍, 나레이션이 완비된 30초 규격 스크립트 즉각 출력.",
    executionCommand: "npx viral-script-gen --topic='무인창고 짐보관 꿀팁'",
    liveDemoAvailable: true,
    productionPrompt: `당신은 100만 뷰를 기록한 테크/비즈니스 숏폼 콘텐츠 디렉터입니다.
아래 주제를 바탕으로 인스타그램 릴스/유튜브 쇼츠용 [30초 완성형 바이럴 스크립트]를 작성하십시오.

주제: [여기에 영상 주제 또는 제품명을 입력하세요]

[출력 양식: 정확한 타임코드 테이블]
- 00:00~00:03 [시선 강탈 후킹]: 시청자가 스크롤을 멈추게 만드는 강렬한 첫 마디 및 카메라 앵글
- 00:03~00:15 [문제 공감]: 타깃 유저가 매일 겪는 불편함 시각적 연출
- 00:15~00:25 [핵심 해결책]: 3단계 직관적 솔루션 제시
- 00:25~00:30 [보유 CTA]: 댓글 특정 키워드 유도 또는 저장(Bookmark) 트리거
- 메타데이터: 고효율 해시태그 5종, 추천 BGM 템포(120~130 BPM).`,
  },
  {
    id: "financial-ledger-parser",
    code: "REC-04",
    title: "Unstructured Financial Ledger & Receipt Normalizer",
    subtitle: "비정형 카드 승인 문자 및 메모 텍스트를 공인 회계 감사용 표로 자동 규격화",
    category: "Finance",
    status: "VERIFIED",
    stack: ["Text Parser", "RegEx Normalizer", "Markdown Table Generator"],
    metrics: [
      { label: "데이터 파싱 정확도", value: "99.8%" },
      { label: "장부 정리 시간", value: "0분 (즉시)" },
      { label: "엑셀 호환성", value: "100%" },
    ],
    problem: "카드사 문자, 메신저 영수증 메모 등 파편화된 비정형 텍스트를 회계 장부에 수작업 입력하는 데 과도한 리소스 소모 및 오타 발생.",
    architecture: "불규칙한 날짜, 결제 금액, 사용처를 정규화하고 표준 계정과목(식대, 여비교통비, 소모품비 등)으로 자동 매핑하는 고신뢰도 추출 엔진.",
    outcome: "텍스트 뭉치를 붙여넣으면 1초 만에 마크다운 및 엑셀 클립보드 호환 규격 표와 소계/총계가 완벽히 산출됨.",
    executionCommand: "cat receipts.txt | npx ledger-parse --format=markdown",
    liveDemoAvailable: true,
    productionPrompt: `당신은 공인회계사이자 재무 데이터 정규화 전문가입니다.
아래 입력된 비정형 지출 텍스트(카드 문자, 메모, 영수증 텍스트)를 읽고 사내 표준 회계 장부로 변환하십시오.

[입력 데이터]
[지출 내역 텍스트를 붙여넣으세요]

[엄격한 출력 표준]
1. 정규화 테이블 (Markdown):
   | 일자 (YYYY-MM-DD) | 계정과목 | 사용처 | 적요 | 공급가액 | 부가세 | 합계 금액 (KRW) |
2. 계정과목별 지출 합산 및 비중(%) 요약
3. 이상 지출(중복 결제 의심, 비업무성 의심 항목) 사전 검증 플래그.`,
  },
  {
    id: "crypto-intelligence-agent",
    code: "REC-05",
    title: "Quantitative Crypto & Macro Intelligence Briefing",
    subtitle: "실시간 온체인 및 외신 뉴스 팩트 추출 및 롱/숏 시장 영향도 3줄 분석기",
    category: "Finance",
    status: "PRODUCTION",
    stack: ["Sentiment Analysis", "Grok/Claude 3.5", "Signal Scoring Engine"],
    metrics: [
      { label: "정보 압축률", value: "95%" },
      { label: "노이즈 필터링", value: "FUD / Hype 제거" },
      { label: "판단 속도", value: "< 1.0s" },
    ],
    problem: "24시간 쏟아지는 방대한 영문 금융 외신과 커뮤니티 노이즈 속에서 실질적인 가격 결정 요인을 적시에 선별하기 어려움.",
    architecture: "감정적 수식어를 배제하고 기관 수급, 규제, 유동성 지표만을 추출하여 롱/숏 영향도를 수치화(Bullish/Neutral/Bearish)하는 첩보 엔진.",
    outcome: "긴 영문 기사를 던지면 3줄 초압축 팩트 요약과 방향성 신호등(🟢/⚪/🔴)을 즉시 제공.",
    executionCommand: "curl -s https://news-api | npx crypto-signal-eval",
    liveDemoAvailable: true,
    productionPrompt: `당신은 헤지펀드 퀀트 트레이딩 데스크의 수석 인텔리전스 분석가입니다.
제공된 금융/암호화폐 텍스트를 바탕으로 기관 트레이더를 위한 [3초 판단 첩보 브리핑]을 작성하십시오.

[입력 뉴스/공시]
[외신 기사 또는 속보 텍스트를 입력하세요]

[출력 규격]
1. ⚡ 3-Line Core Facts (노이즈 배제, 팩트 수치만 기술):
   - 
   - 
   - 
2. 🎯 시장 영향도 평가: [🟢 STRONG BULLISH / ⚪ NEUTRAL / 🔴 STRONG BEARISH]
3. 📊 핵심 지지/저항 및 청산 유의 구간:
4. ⚠️ 트레이딩 리스크 요약 (1문장).`,
  },
  {
    id: "zero-code-web-starter",
    code: "REC-06",
    title: "Zero-Code Standalone Web Studio Blueprint",
    subtitle: "비개발자도 프롬프트 1회 입력으로 완성되는 반응형 웹사이트 단일 파일 템플릿",
    category: "Web Builder",
    status: "DEPLOYED",
    stack: ["HTML5", "Tailwind CDN", "Lucide CDN", "Vercel 1-Click"],
    metrics: [
      { label: "빌드 복잡도", value: "0 (Zero Build)" },
      { label: "배포 소요 시간", value: "3분" },
      { label: "호스팅 비용", value: "$0 (Free Tier)" },
    ],
    problem: "누나, 가족, 비개발자가 개인 캐릭터나 포트폴리오 사이트를 구축하고자 할 때 복잡한 빌드 도구와 패키지 설치 장벽으로 중도 포기.",
    architecture: "외부 빌드 도구 없이 브라우저에서 즉시 렌더링되는 완전 자립형(Single-file) 반응형 웹 아키텍처. CDN과 인라인 스토리지를 활용.",
    outcome: "프롬프트를 AI에 넣고 나온 코드를 index.html로 저장하기만 하면, Vercel/GitHub에 드래그하여 즉시 글로벌 웹사이트 런칭.",
    executionCommand: "echo 'index.html' | npx vercel --prod",
    liveDemoAvailable: true,
    productionPrompt: `당신은 글로벌 최정상 웹 프론트엔드 아키텍트입니다.
외부 빌드 도구나 npm 설치 없이 브라우저에서 바로 열리는, 완성형 단일 파일(index.html) 반응형 웹사이트 코드를 작성하십시오.

[아키텍처 규격]
1. 의존성: 최신 Tailwind CSS CDN 및 Lucide 아이콘 라이브러리를 head에 포함
2. 디자인 테마: 세련된 슬레이트 딥 다크 모드, 섬세한 1px 글래스모피즘 보더, 부드러운 호버 트랜지션
3. 인터랙션:
   - 프로필/아이덴티티 헤더 (배경 블러 및 태그)
   - 반응형 미디어/쇼케이스 그리드 (카드 호버 확대 효과)
   - 브라우저 로컬스토리지(localStorage) 기반 영구 방명록 시스템
4. 단 하나의 완전한 HTML 파일로 출력할 것 (주석 포함).`,
  },
];
