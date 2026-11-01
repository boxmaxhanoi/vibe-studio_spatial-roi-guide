export interface Preset {
  id: string;
  title: string;
  desc: string;
  prompt: string;
  placeholder: string;
}

export interface Department {
  id: string;
  name: string;
  badge: string;
  iconName: string;
  color: string;
  description: string;
  systemPrompt: string;
  presets: Preset[];
}

export const DEPARTMENTS: Department[] = [
  {
    id: "finance",
    name: "경영지원 & 재무회계",
    badge: "인사 / 총무 / 정산",
    iconName: "FileSpreadsheet",
    color: "from-emerald-500 to-teal-600",
    description: "월말 정산 내역 검토, 지출 결의서 양식화, 세무 증빙 및 인사 규정 안내",
    systemPrompt: `당신은 (주)박스풀(BOXFUL)의 '경영지원 및 재무회계 마스터 AI'입니다.
정확한 수치 대조, 회계 기준 준수, 누락 증빙 확인, 그리고 정중하고 명확한 사내 표준 양식으로 답변하십시오.
수치 계산이나 정산표는 Markdown Table 형식으로 보기 쉽게 정리해 주십시오.`,
    presets: [
      {
        id: "monthly_settlement",
        title: "📊 월말 정산 데이터 검토",
        desc: "매출/비용 집계 오류 검증 및 이상치 확인",
        prompt: "다음 월말 정산 내역을 검토하고, 항목별 소계 합산이 맞는지와 이상 지출 내역을 점검해 주세요:\n\n",
        placeholder: "정산 내역 또는 텍스트 데이터를 붙여넣으세요...",
      },
      {
        id: "expense_report",
        title: "📝 지출 결의서 양식 작성",
        desc: "영수증/내역 메모를 사내 표준 지출 결의서 양식으로 변환",
        prompt: "아래 지출 내역을 사내 표준 지출결의서 양식(일자, 계정과목, 금액, 적요, 증빙구분)으로 작성해 주세요:\n\n",
        placeholder: "지출 항목, 금액, 사용 목적을 입력하세요...",
      },
      {
        id: "hr_rules",
        title: "📑 사내 취업규칙 & 경조사 가이드",
        desc: "연차 규정, 경조금, 복리후생 사내 공지문 작성",
        prompt: "다음 사내 공지 목적에 맞춰 임직원 대상 안내 공지문을 작성해 주세요:\n\n",
        placeholder: "공지하고자 하는 핵심 내용과 일정을 입력하세요...",
      },
    ],
  },
  {
    id: "logistics",
    name: "B2C 운영 & 무인창고",
    badge: "공유창고 / 풀필먼트 / CS",
    iconName: "Boxes",
    color: "from-blue-500 to-indigo-600",
    description: "공유창고 고객 CS 응대, 택배 송장 불일치 데이터 정리, 지점 시설 문의 대응",
    systemPrompt: `당신은 (주)박스풀(BOXFUL)의 'B2C 운영 및 무인 물류 마스터 AI'입니다.
박스풀 공유창고(셀프스토리지), 무인 IoT 도어락, 짐 보관 예약 시스템에 대한 높은 이해를 바탕으로 고객 중심의 친절하고 신속한 답변을 생성합니다.
지점별 이슈 해결 방안을 명확하고 단계별(Step-by-step)로 제시하십시오.`,
    presets: [
      {
        id: "cs_response",
        title: "💬 고객 문의(CS) 정중한 답변",
        desc: "출입문 비밀번호 오류, 환불, 기간 연장 안내",
        prompt: "고객으로부터 접수된 다음 문의 사항에 대해 박스풀 CS 가이드라인에 맞춘 친절하고 명쾌한 답변을 작성해 주세요:\n\n",
        placeholder: "고객 문의 내용(예: 도어락 안 열림, 요금 문의)을 입력하세요...",
      },
      {
        id: "invoice_check",
        title: "📦 송장 및 물품 입출고 불일치 분석",
        desc: "박스풀 보관함 입출고 오류 및 미매칭 목록 정리",
        prompt: "아래 입출고 내역 중 불일치(미확인) 건을 분류하고 확인 필요한 점검 체크리스트를 만들어 주세요:\n\n",
        placeholder: "창고 번호, 입출고 일자, 고객 성명 또는 송장 데이터를 입력하세요...",
      },
      {
        id: "branch_notice",
        title: "📢 지점 점검 및 점주 공지문",
        desc: "정기 소독, 시설 공사, 지점 긴급 안내문 작성",
        prompt: "해당 지점 이용 고객 대상의 점검 안내 문자/알림톡 문구를 3가지 버전(표준형, 간결형, 상세형)으로 작성해 주세요:\n\n",
        placeholder: "점검 지점명, 점검 일시, 작업 내용을 입력하세요...",
      },
    ],
  },
  {
    id: "marketing",
    name: "마케팅 & MD 콘텐츠",
    badge: "SNS / 블로그 / 프로모션",
    iconName: "Megaphone",
    color: "from-rose-500 to-orange-500",
    description: "네이버 블로그 SEO 포스팅, 유튜브 숏폼/릴스 대본, 프로모션 카피라이팅",
    systemPrompt: `당신은 (주)박스풀(BOXFUL)의 '마케팅 총괄 콘텐츠 디렉터 AI'입니다.
공유창고, 이사 보관, 원룸 짐정리, MD 굿즈에 대한 매력적이고 전환율(CTR/CVR) 높은 카피를 작성합니다.
SEO 최적화 키워드(공유창고, 셀프스토리지, 짐보관)를 자연스럽게 녹여내고 후킹한 카피를 만드십시오.`,
    presets: [
      {
        id: "naver_blog",
        title: "✍️ 네이버 블로그 SEO 포스팅 초안",
        desc: "타깃 키워드 반영한 서론-본론-결론 완성형 글",
        prompt: "다음 주제를 바탕으로 네이버 블로그 상위 노출에 최적화된 포스팅(제목 5개 + 본문 1500자 + 소제목 구조)을 작성해 주세요:\n\n",
        placeholder: "포스팅 주제(예: 원룸 이사 짐보관 꿀팁, 강남 공유창고 후기 등)를 입력하세요...",
      },
      {
        id: "reels_script",
        title: "🎬 30초 숏폼/릴스 영상 대본",
        desc: "화면 연출(Visual) + 자막 + 나레이션 구성",
        prompt: "30초 내외의 인스타그램 릴스/유튜브 숏폼 영상 대본(0~3초 후킹 + 본문 전환 + CTA)을 작성해 주세요:\n\n",
        placeholder: "소개할 서비스나 연출하고 싶은 상황을 적어주세요...",
      },
      {
        id: "promo_copy",
        title: "🎯 프로모션 & 할인 이벤트 카피",
        desc: "첫 달 50% 할인, 친구 추천 이벤트 카피 5종",
        prompt: "다음 프로모션 혜택을 강조하는 웹 배너 헤드카피 및 푸시 알림 문구 5가지를 제안해 주세요:\n\n",
        placeholder: "프로모션 내용과 타깃 고객층을 입력하세요...",
      },
    ],
  },
  {
    id: "tech",
    name: "개발 & IT 인프라",
    badge: "Next.js / API / Three.js",
    iconName: "Code2",
    color: "from-purple-500 to-indigo-700",
    description: "기능 명세서(PRD), 에러 로그 정밀 분석, Jira 티켓 규격화 및 코드 리뷰",
    systemPrompt: `당신은 (주)박스풀(BOXFUL)의 '수석 소프트웨어 아키텍트 AI'입니다.
Next.js, TypeScript, Three.js 3D 뷰어, Vercel 배포, API 보안에 능통하며 실무진이 바로 구현 가능한 명확한 엔지니어링 답변을 제공합니다.`,
    presets: [
      {
        id: "prd_spec",
        title: "📋 기능 요구사항 명세서(PRD) 작성",
        desc: "배경, 유저 스토리, Acceptance Criteria 정의",
        prompt: "다음 신규 기능 구상을 엔지니어와 디자이너가 바로 개발 착수할 수 있는 PRD 규격으로 정리해 주세요:\n\n",
        placeholder: "추가하고 싶은 기능의 핵심 아이디어를 자유롭게 서술하세요...",
      },
      {
        id: "jira_ticket",
        title: "🎫 지라(Jira) 티켓 규격화",
        desc: "B2C 개발자(lam 등) 및 팀원 대상 표준 티켓 작성",
        prompt: "다음 요구사항 또는 버그 내역을 Jira 이슈 티켓(Summary, Description, Steps to Reproduce, Expected/Actual, 담당자) 규격으로 작성해 주세요:\n\n",
        placeholder: "작업할 기능 또는 발견된 버그 현상을 입력하세요...",
      },
      {
        id: "log_analysis",
        title: "🔍 에러 로그 분석 & 해결 가이드",
        desc: "빌드 에러, 500 API 오류 원인 및 해결 코드",
        prompt: "다음 에러 로그 또는 오류 현상을 분석하고, 정확한 원인과 수정할 코드 예시를 작성해 주세요:\n\n",
        placeholder: "에러 로그 텍스트를 붙여넣으세요...",
      },
    ],
  },
];
