export interface RegistryProject {
  id: string;
  code: string; // e.g. "PRJ-01"
  title: string;
  subtitle: string;
  category: "PropTech" | "Enterprise" | "Vision" | "Marketing" | "FinTech" | "Intelligence" | "ZeroCode";
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
  
  // Production One-Shot Prompt
  productionPrompt: string;
  executionCommand: string;
}

export const REGISTRY_PROJECTS: RegistryProject[] = [
  {
    id: "spatial-roi-estimator",
    code: "TOOL-01",
    title: "BOXFUL Spatial-ROI | 3D 공간 견적 & 12개월 매출 추이 시뮬레이터",
    subtitle: "내 도면 업로드 또는 30·50·70평 표준 사례 선택으로 즉시 산출되는 시공 견적(CAPEX) 및 12개월 가동률 램프업 수익 모델",
    category: "PropTech",
    status: "PRODUCTION",
    stack: ["Spatial Configurator", "Financial Modeling", "Next.js", "Tailwind CSS"],
    metrics: [
      { label: "견적 산출 소요 시간", value: "0.1s (즉시)" },
      { label: "전국 실측 데이터", value: "70개 지점" },
      { label: "평균 가동률(12M)", value: "94.8%" },
    ],
    problem: "상가나 공실을 무인창고로 전환하려 할 때, 몇 개 락커가 들어가고 공사비가 얼마 들며 언제 흑자 전환되는지 사전에 검증하기 어려움.",
    architecture: "실평수(30/50/70평)별 모듈러 락커(SafeBox, S, M, L) 수량 알고리즘과 1~12개월 가동률(25% -> 94.8%) 램프업 재무 모델을 결합한 시뮬레이션 엔진.",
    outcome: "도면 사진 업로드 또는 평수 선택 한 번으로 평당 시공비, 항목별 CAPEX, 월별 매출/순익, 손익분기점(BEP 4개월)을 원클릭 리포팅.",
    executionCommand: "npx boxful-spatial-roi --size=50 --output=financial-report.pdf",
    productionPrompt: `당신은 국내 1위 셀프스토리지 프랜차이즈의 수석 가맹 개발 이사이자 부동산 금융 분석가입니다.
상가 공실 소유주를 위해 [무인 공유창고 공간 견적 & 12개월 매출 추이 사업성 보고서]를 작성하십시오.

[입력 파라미터]
- 대상 면적: [30평 / 50평 / 70평 중 선택, 또는 실측 평수 입력]
- 공간 형태: 직사각형 / 기둥 유무 / 층수 (지하 1층 or 지상)

[출력 보고서 규격]
1. 락커 모듈러 배치 계획: SafeBox, XS, S, M, L 유닛별 권장 수량 및 월 임대료
2. 시공 견적서 (CAPEX): 1.5T 아연도금 락커, IoT 스마트락, 항온항습/CCTV, 인테리어 총액 (평당 110~120만 원 기준)
3. 12개월 램프업 매출 추이 (Table):
   - 1~3개월 (초기 유입기, 가동률 25~45%)
   - 4~6개월 (성장기 및 손익분기점 BEP 돌파, 가동률 60~75%)
   - 7~12개월 (안정기 및 만실 수렴, 가동률 85~94.8%)
4. 연간 순이익 및 투자 수익률(ROI): 자가 건물 기준 연 35~45% 달성 근거.`,
  },
  {
    id: "enterprise-portal-warroom",
    code: "TOOL-02",
    title: "BOXFUL Command Center | 전사 4대 부서 AI 포털 & 최고경영진 워룸",
    subtitle: "경영지원, CS/물류, 마케팅, IT 개발 4대 부서 맞춤 프롬프트와 4자리 PIN 보안 인증이 탑재된 사내 AI 허브",
    category: "Enterprise",
    status: "PRODUCTION",
    stack: ["Next.js 14", "TypeScript", "Vercel Serverless", "PIN Auth", "TOTP"],
    metrics: [
      { label: "전사 부서 자동화율", value: "85%" },
      { label: "사내 API 키 보안", value: "완전 격리" },
      { label: "초기 서버 구축비", value: "$0" },
    ],
    problem: "임직원들이 각자 AI를 쓰면서 사내 데이터가 파편화되고, CS 답변 규격이 무너지며, 외부 API 키 유출 위험 발생.",
    architecture: "일반 직원을 위한 4대 부서 표준 프리셋(정산 검토, CS 정중한 응대문, SEO 블로그, Jira 티켓)과 대표 전용 4자리 보안 PIN 워룸 격리 아키텍처.",
    outcome: "신입 직원도 즉시 베테랑처럼 공인된 사내 양식으로 고객 응대 및 정산 처리 완료. 회사 기밀과 지휘 통제권 완벽 보호.",
    executionCommand: "npx create-next-app@latest enterprise-portal --typescript --tailwind",
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
    id: "drawscan-3d-vision",
    code: "TOOL-03",
    title: "DrawScan 3D | 도면 인식 기반 도어 간섭 & 공간 최적화 비전 AI",
    subtitle: "손그림이나 캐드 도면 사진 한 장으로 출입구 동선, 방음부스 간격, 도어 회전반경 충돌을 착공 전에 100% 잡아내는 감리 시스템",
    category: "Vision",
    status: "VERIFIED",
    stack: ["Multimodal Vision", "Spatial Reasoning", "Three.js CAD Specs"],
    metrics: [
      { label: "도어 간섭 검출률", value: "100%" },
      { label: "현장 재시공 비용 절감", value: "₩5,000,000+" },
      { label: "비전 분석 속도", value: "3.2s" },
    ],
    problem: "인테리어 시공 시 평면도 상 문 열림 회전반경 간섭이나 최소 복도 폭(900mm) 미달을 육안으로 놓쳐 착공 후 현장 철거·재시공 낭비 발생.",
    architecture: "도면 이미지를 입력받아 출입구 동선, 기둥 주변 데드스페이스, 방음부스 및 도어 궤적의 기하학적 충돌을 벡터 공간 추론으로 감리하는 멀티모달 비전 파이프라인.",
    outcome: "도면 사진 촬영 업로드 즉시 문 열림 충돌 구간 및 통로 폭 경고 리포트 출력. 3D 디자이너에게 전달할 수정 도면 가이드 자동 생성.",
    executionCommand: "curl -X POST https://api.anthropic.com/v1/messages (Multimodal Payload)",
    productionPrompt: `당신은 20년 경력의 건축 설계사이자 3D 공간 엔지니어링 감리 AI입니다.
첨부된 평면도 이미지를 정밀 분석하여 다음 감리 보고서를 작성하십시오:

[감리 체크리스트]
1. 공간 구획 및 피난 동선: 메인 출입문에서 복도 폭(최소 900mm 확보 여부), 병목 지점 특정
2. 도어 회전반경 및 충돌 검증: 방음부스 5기 및 사물함 문 열림 시 마주보는 벽체/타 시설물 간섭 여부
3. 시공상 주의사항: 기둥 파티션 주변 데드스페이스(버려지는 공간) 최소화 방안
4. 3D 스케치업 모델링 파라미터: 벽체 권장 높이, 레이어 분류 가이드 (Walls, Doors, Fixtures, Dimensions).`,
  },
  {
    id: "hookmaster-30s-script",
    code: "TOOL-04",
    title: "HookMaster 30s | 0~3초 시선 강탈 바이럴 숏폼 & 릴스 대본기",
    subtitle: "주제 한 줄만 넣으면 시청 지속 시간을 극대화하는 0~3초 후킹 대사, 카메라 연출, 나레이션 타임코드가 완성되는 콘텐츠 엔진",
    category: "Marketing",
    status: "PRODUCTION",
    stack: ["Retention Engineering", "Audience Drop-off Formula", "SEO Tagging"],
    metrics: [
      { label: "대본 생성 소요 시간", value: "1.8s" },
      { label: "시청 지속 시간(Avg)", value: "87%" },
      { label: "SNS 전환율", value: "3.8x" },
    ],
    problem: "인스타그램 릴스나 유튜브 쇼츠 제작 시 첫 3초를 못 잡아 시청자의 70%가 바로 넘겨버리며, 매번 기획에 수시간 낭비.",
    architecture: "0~3초 강렬한 시선 강탈(Hooking) -> 시각적 해결책 3단계 -> 댓글 및 북마크 유도(CTA)로 연결되는 검증된 바이럴 보유 곡선 공식을 프롬프트화.",
    outcome: "주제 단어 하나만 입력하면 카메라 앵글, 화면 자막, 성우 나레이션이 초 단위로 규격화된 촬영 대본 즉시 출력.",
    executionCommand: "npx hookmaster-gen --topic='원룸 이사 짐보관 꿀팁'",
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
    id: "receiptflow-ledger-ai",
    code: "TOOL-05",
    title: "ReceiptFlow AI | 카드 승인 문자·메모 자동 회계 장부 변환기",
    subtitle: "뒤죽박죽 흩어진 카드 결제 문자와 영수증 메모를 마구 복사해 넣으면 엑셀 호환 표준 회계 표로 자동 분류 및 합산해주는 재무 엔진",
    category: "FinTech",
    status: "VERIFIED",
    stack: ["Regex Normalizer", "Markdown Table Generator", "Accounting Rulebook"],
    metrics: [
      { label: "텍스트 파싱 정확도", value: "99.8%" },
      { label: "장부 정리 소요 시간", value: "0분" },
      { label: "엑셀 클립보드 호환", value: "100%" },
    ],
    problem: "영수증 사진, 카드 승인 문자, 카카오톡 지출 메모가 제각각 흩어져 있어 월말에 일일이 엑셀에 옮겨 적는 데 수시간 낭비.",
    architecture: "비정형 텍스트에서 날짜, 금액, 사용처를 정규화하여 표준 계정과목(식대, 여비교통비, 소모품비 등)으로 자동 매핑하고 소계/총계를 계산하는 파서 엔진.",
    outcome: "문자 뭉치를 복사해 넣으면 1초 만에 엑셀에 바로 붙여넣을 수 있는 완성된 회계 장부와 이상 지출 검증 플래그 산출.",
    executionCommand: "cat receipts.txt | npx receiptflow --format=markdown",
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
    id: "signalscout-crypto-agent",
    code: "TOOL-06",
    title: "SignalScout | 글로벌 금융 외신 3줄 초압축 & 롱/숏 호재·악재 판별기",
    subtitle: "24시간 쏟아지는 영문 외신과 텔레그램 속보에서 노이즈를 걷어내고, 시장 영향도(🟢/⚪/🔴)와 핵심 가격대만 3줄로 브리핑하는 트레이딩 비서",
    category: "Intelligence",
    status: "PRODUCTION",
    stack: ["Sentiment Scoring", "Grok/Claude Intelligence", "Signal Radar"],
    metrics: [
      { label: "뉴스 압축률", value: "95%" },
      { label: "노이즈/FUD 필터", value: "완전 차단" },
      { label: "브리핑 생성 속도", value: "0.8s" },
    ],
    problem: "코인 및 주식 시장은 24시간 외신이 쏟아져 긴 기사를 다 읽을 시간이 없고, 미사여구와 루머로 인해 팩트 파악이 지연됨.",
    architecture: "기사 본문에서 기관 수급, 규제, 유동성 지표만을 추출하여 롱/숏 시장 영향도를 3단계(Bullish/Neutral/Bearish)로 채점하는 첩보 파이프라인.",
    outcome: "긴 영문 기사나 링크를 넣으면 3줄 초압축 팩트 요약과 신호등 색상(🟢/⚪/🔴)으로 즉각적인 의사결정 브리핑 출력.",
    executionCommand: "curl -s https://crypto-news | npx signalscout",
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
    id: "singlefile-web-studio",
    code: "TOOL-07",
    title: "SingleFile Web Studio | 비개발자를 위한 10분 완성 반응형 웹 템플릿",
    subtitle: "복잡한 빌드 도구나 코딩 없이 프롬프트 한 번으로 완성되는 반응형 웹사이트(프로필, 갤러리, 방명록) 및 무료 Vercel 배포 가이드",
    category: "ZeroCode",
    status: "DEPLOYED",
    stack: ["HTML5", "Tailwind CDN", "Lucide CDN", "Vercel 1-Click"],
    metrics: [
      { label: "빌드 복잡도", value: "0 (Zero Build)" },
      { label: "배포 소요 시간", value: "3분" },
      { label: "호스팅 비용", value: "$0 (Free)" },
    ],
    problem: "가족이나 지인, 비개발자가 개인 캐릭터나 포트폴리오 사이트를 만들고 싶어도 Node.js, npm, 패키지 빌드 장벽에 막혀 포기.",
    architecture: "외부 빌드 도구 없이 브라우저에서 바로 열리는 단일 HTML 파일 구조. CDN과 브라우저 localStorage를 활용한 자립형 아키텍처.",
    outcome: "프롬프트로 생성된 index.html 파일을 Vercel에 드래그 앤 드롭하기만 하면 전 세계 어디서든 열리는 나만의 웹사이트 런칭.",
    executionCommand: "echo 'index.html' | npx vercel --prod",
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
