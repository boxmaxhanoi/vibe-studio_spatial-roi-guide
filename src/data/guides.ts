export interface GuideProject {
  id: string;
  order: number;
  title: string;
  emoji: string;
  targetAudience: "엄마도 쉬워요 👩" | "조카도 재미있어요 👧" | "실무 직장인 💼" | "모두를 위한 🌟";
  difficulty: "초간단 (1분)" | "쉬움 (3분)" | "보통 (10분)";
  category: "homepage" | "sns" | "business" | "lifestyle" | "finance";
  categoryLabel: string;
  tagline: string;
  
  // 1. 이해하기 싫은 분들을 위한 3초 원클릭 복붙 프롬프트
  quickPrompt: string;
  quickPromptExplanation: string;
  
  // 2. 배경 (Why)
  background: {
    problem: string;
    story: string;
  };
  
  // 3. 목적 (What)
  objective: {
    goal: string;
    benefits: string[];
  };
  
  // 4. 결과물 (Deliverable / Demo)
  deliverable: {
    summary: string;
    previewType: "website" | "chat" | "table" | "script";
    previewData: any;
  };
  
  // 5. 실행 방식 (How to run)
  executionGuide: {
    step1: string;
    step2: string;
    step3: string;
    deployTip?: string;
  };
}

export const CATEGORIES = [
  { id: "all", label: "🌟 전체 보기" },
  { id: "homepage", label: "🏠 나만의 웹사이트 만들기" },
  { id: "sns", label: "🎬 숏폼·영상·마케팅" },
  { id: "lifestyle", label: "🍎 엄마의 생활·문자 비서" },
  { id: "business", label: "💼 매장·회사 업무 자동화" },
  { id: "finance", label: "📊 가계부·정산·코인 첩보" },
];

export const GUIDES: GuideProject[] = [
  {
    id: "personal-character-website",
    order: 1,
    title: "조카의 캐릭터 & 포트폴리오 웹사이트 10분 완성",
    emoji: "🎨",
    targetAudience: "조카도 재미있어요 👧",
    difficulty: "쉬움 (3분)",
    category: "homepage",
    categoryLabel: "나만의 웹사이트 만들기",
    tagline: "코딩 한 줄 몰라도 내 그림과 캐릭터를 자랑하는 예쁜 반응형 홈페이지를 무료로 만들어요!",
    quickPrompt: `당신은 세계 최고의 친절한 웹사이트 제작 디자이너입니다.
초등학생 조카도 바로 쓸 수 있는 아주 귀엽고 예쁜 '나만의 캐릭터 & 프로필 소개 웹사이트' HTML/CSS/JS 단일 파일 코드를 만들어주세요.

[웹사이트 구성]
1. 헤더: 알록달록한 파스텔톤 배경과 귀여운 캐릭터 프로필 사진 영역
2. 내 소개: "안녕! 나는 그림 그리기를 좋아하는 00이야" 자기소개 카드
3. 나의 갤러리: 4장의 그림 카드 (클릭하면 귀여운 하트 애니메이션과 응원 메시지가 뜸)
4. 방명록: 방문자가 응원 한마디를 남길 수 있는 예쁜 입력창과 댓글 목록 (localStorage 저장)
5. 모바일 폰에서도 완벽하게 예쁘게 보이도록 Tailwind CSS CDN을 사용해서 하나의 완성된 index.html 코드로 작성해주세요.`,
    quickPromptExplanation: "위 프롬프트를 복사해서 ChatGPT나 Claude에 붙여넣기만 하면, 예쁜 웹사이트 파일이 바로 생성됩니다!",
    background: {
      problem: "누나나 조카가 자기가 그린 귀여운 캐릭터나 사진을 올릴 웹사이트를 갖고 싶어 했지만, 코딩을 배울 엄두가 나지 않았습니다.",
      story: "전문 개발자에게 맡기면 수백만 원이 들고 복잡하지만, AI에게 역할과 스타일을 지정해주면 1분 만에 동작하는 완벽한 웹페이지 코드를 얻을 수 있습니다.",
    },
    objective: {
      goal: "비개발자 누나와 조카가 스스로 자기만의 웹사이트를 만들고 인터넷에 무료로 배포할 수 있도록 돕습니다.",
      benefits: [
        "비싼 호스팅 비용 0원 (Vercel / GitHub Pages 무료 활용)",
        "내 캐릭터 사진과 글을 자유롭게 수정 가능",
        "스마트폰과 PC 어디서든 예쁘게 열리는 반응형 웹",
      ],
    },
    deliverable: {
      summary: "파스텔톤의 반응형 캐릭터 프로필 & 갤러리 & 방명록 웹사이트",
      previewType: "website",
      previewData: {
        themeColor: "from-pink-400 to-rose-300",
        sampleTitle: "몽실이와 함께하는 꼬마 화가의 작업실",
        features: ["귀여운 프로필 카드", "하트 뿅뿅 인터랙션 갤러리", "브라우저 방명록"],
      },
    },
    executionGuide: {
      step1: "복사한 프롬프트를 Claude(claude.ai) 또는 ChatGPT에 붙여넣고 엔터를 누릅니다.",
      step2: "AI가 작성해 준 코드 우측 상단의 [Copy code]를 누르고 메모장에 붙여넣은 뒤 'index.html'로 저장합니다.",
      step3: "인터넷 브라우저로 파일을 더블 클릭해 열어보거나, Vercel/GitHub에 드래그 앤 드롭하여 전 세계에 공개합니다.",
      deployTip: "Vercel.com에 로그인 후 폴더를 그냥 마우스로 끌어다 놓으면 내 웹사이트 인터넷 주소(URL)가 바로 생깁니다!",
    },
  },
  {
    id: "reels-shorts-script-maker",
    order: 2,
    title: "엄마도 찍는 30초 인스타 릴스 & 유튜브 쇼츠 대본기",
    emoji: "🎬",
    targetAudience: "엄마도 쉬워요 👩",
    difficulty: "초간단 (1분)",
    category: "sns",
    categoryLabel: "숏폼·영상·마케팅",
    tagline: "주제 하나만 넣으면 0~3초 시선 강탈 후킹부터 나레이션 대본까지 30초 컷으로 써줍니다.",
    quickPrompt: `당신은 100만 조회수를 만드는 바이럴 숏폼 영상 전문 작가입니다.
아래 주제로 인스타그램 릴스/유튜브 쇼츠용 [30초 영상 기획안]을 초보자도 바로 촬영할 수 있게 작성해주세요.

주제: [여기에 원하는 주제를 입력하세요 예: 원룸 이사 짐정리 꿀팁 / 우리 가게 맛있는 반찬]

[필수 작성 형식]
1. 0~3초 후킹 (첫 대사와 화면 연출): 시청자가 넘기지 못하게 시선 끄는 첫 마디
2. 4~20초 본문 (공감 + 핵심 해결책): 3단계로 명확하게 보여주는 시각 연출 및 나레이션
3. 21~30초 마무리 (CTA): "저장해두고 필요할 때 꺼내보세요!" 댓글/저장 유도
4. 캡션 문구 & 필수 해시태그 7개 추천`,
    quickPromptExplanation: "주제 부분에 '우리 가게 사과 홍보'나 '집정리 노하우'만 바꿔 적고 AI에 넣으면 촬영 대본이 완성됩니다.",
    background: {
      problem: "공유창고나 매장 홍보 영상을 찍으려 해도, 첫 마디를 어떻게 시작해야 사람들이 영상을 끝까지 볼지 감이 잡히지 않았습니다.",
      story: "유튜브와 릴스는 첫 3초의 '후킹'이 성패를 결정합니다. 검증된 숏폼 공식을 프롬프트에 담아 누구나 1초 만에 대본을 뽑을 수 있게 만들었습니다.",
    },
    objective: {
      goal: "영상 제작 초보자도 카메라 켜고 대본대로 읽기만 하면 전문가처럼 숏폼을 제작할 수 있게 합니다.",
      benefits: [
        "촬영 시간 80% 단축 (무슨 말 할지 고민 끝)",
        "조회수와 저장 수를 극대화하는 바이럴 후킹 공식 적용",
        "인스타 릴스, 틱톡, 유튜브 쇼츠에 동시 활용 가능",
      ],
    },
    deliverable: {
      summary: "화면 연출(카메라 앵글) + 자막 문구 + 나레이션 음성 대본 표",
      previewType: "script",
      previewData: {
        hook: "\"아직도 이사할 때 짐 다 끌고 다니세요? 3초만 보세요!\"",
        body: "좁은 원룸 넓게 쓰는 꿀팁 3가지 시각 연출 및 빠른 화면 전환",
        cta: "\"댓글에 [비밀] 남겨주시면 최저가 할인 링크 보내드려요!\"",
      },
    },
    executionGuide: {
      step1: "위의 프롬프트를 복사하고 맨 밑 [주제] 부분에 내 상품이나 일상 이야기를 씁니다.",
      step2: "AI가 준 대본을 스마트폰 메모장에 띄워놓고 거치대에 폰을 올립니다.",
      step3: "대본대로 30초 동안 찍고 무료 앱(CapCut, VITA)으로 자막만 입혀 업로드합니다.",
      deployTip: "음악은 인스타그램에서 '인기 상승 중(화살표 모양)'인 음원을 배경으로 깔면 노출이 3배 늘어납니다!",
    },
  },
  {
    id: "receipt-accounting-organizer",
    order: 3,
    title: "엄마의 영수증 & 지출 메모 자동 가계부 정리기",
    emoji: "📊",
    targetAudience: "엄마도 쉬워요 👩",
    difficulty: "초간단 (1분)",
    category: "finance",
    categoryLabel: "가계부·정산·코인 첩보",
    tagline: "카톡 메모나 흩어진 지출 내역을 복사해 넣으면 깔끔한 표로 분류하고 합계까지 계산해줍니다.",
    quickPrompt: `당신은 꼼꼼하고 친절한 공인회계사이자 가계부 정리 도우미입니다.
아래에 뒤죽박죽 적힌 지출/영수증 메모를 분석하여 깔끔한 마크다운 표(Table)로 정리해주세요.

[입력 메모]
[여기에 일자, 쓴 돈, 산 물건 메모들을 마구 붙여넣으세요]

[출력 양식]
1. 정리 표: 일자 | 카테고리(식비, 생활, 교통, 공과금 등) | 사용처 | 금액(원) | 비고
2. 카테고리별 지출 소계 및 총 지출 합계
3. 이번 달 지출 분석 및 절약 팁 2줄`,
    quickPromptExplanation: "카드 승인 문자나 카톡에 대충 적어둔 지출 메모들을 몽땅 복사해서 넣으면 엑셀 표처럼 바뀝니다.",
    background: {
      problem: "영수증이나 카드 내역 문자가 쌓이지만, 엑셀을 켜서 하나씩 타이핑하고 합계를 내는 일은 너무 번거롭고 머리가 아픕니다.",
      story: "형식이 제각각인 텍스트도 AI는 문맥을 이해하여 알아서 식비/교통비로 분류하고 계산기를 두드려줍니다.",
    },
    objective: {
      goal: "수작업 장부 정리 시간을 제로로 만들고, 한 달 지출 흐름을 3초 만에 파악합니다.",
      benefits: [
        "영수증 사진이나 카드 문자 그대로 복사해서 넣기만 하면 끝",
        "분류와 합산 자동화로 계산 실수 제로",
        "엑셀(Excel)이나 구글 스프레드시트에 바로 붙여넣기 가능",
      ],
    },
    deliverable: {
      summary: "항목별 자동 분류 지출표 & 총액 집계 & 절약 코멘트",
      previewType: "table",
      previewData: {
        total: "187,500원",
        items: [
          { date: "11/01", cat: "식비", desc: "이마트 장보기", price: "54,200원" },
          { date: "11/01", cat: "교통", desc: "지하철 충전", price: "30,000원" },
          { date: "11/02", cat: "생활", desc: "다이소 수납함", price: "12,000원" },
        ],
      },
    },
    executionGuide: {
      step1: "카드사에서 온 문자나 스마트폰 가계부 메모를 쭉 긁어서 복사합니다.",
      step2: "위 프롬프트의 [입력 메모] 자리에 붙여넣고 AI에게 전송합니다.",
      step3: "AI가 만들어준 표를 마우스로 긁어 엑셀이나 카카오톡 나에게 보내기로 보관합니다.",
    },
  },
  {
    id: "boxful-master-ai-portal",
    order: 4,
    title: "우리 회사/매장 전용 AI 사내 포털 & 워룸",
    emoji: "🏢",
    targetAudience: "실무 직장인 💼",
    difficulty: "보통 (10분)",
    category: "business",
    categoryLabel: "매장·회사 업무 자동화",
    tagline: "경영지원, CS 물류, 마케팅, IT 개발 4대 부서 맞춤 프롬프트와 보안 워룸을 갖춘 웹앱!",
    quickPrompt: `당신은 풀스택 시니어 소프트웨어 엔지니어입니다.
Next.js (App Router), Tailwind CSS, Lucide-react 아이콘을 활용한 기업용 'AI 부서별 업무 포털 웹 애플리케이션'을 작성해주세요.

[포함 기능]
1. 헤더: 회사 로고, 모드 전환(일반 직원용 포털 vs 대표 전용 보안 워룸), 보안 상태 뱃지
2. 직원 포털 모드: 4개 부서 탭 (경영지원/재무, B2C 운영/무인창고 CS, 마케팅/콘텐츠, 개발/IT 인프라)
3. 각 부서별 3가지 즉시 실행 프리셋 버튼 (예: CS 정중한 답변, 네이버 블로그 SEO 초안, 월말 정산 검토 등)
4. 대표 전용 워룸: 4자리 보안 PIN 번호(0000)를 입력해야만 잠금 해제되는 비밀 대시보드
5. Vercel에 바로 무료 배포할 수 있는 완전한 단일 컴포넌트 구조로 작성해주세요.`,
    quickPromptExplanation: "현재 brave-hertz 프로젝트의 핵심 구조를 한 번에 복제하여 나만의 사내 AI 포털을 만드는 프롬프트입니다.",
    background: {
      problem: "사내 직원들이 각자 ChatGPT를 쓰다 보니 회사 정보가 제각각이고, 보안 PIN이나 부서별 표준 업무 양식이 없었습니다.",
      story: "직원들은 클릭 한 번으로 공인된 사내 양식(CS, 정산, 마케팅)을 쓰고, 대표는 워룸에서 총괄 지휘할 수 있는 포털을 만들었습니다.",
    },
    objective: {
      goal: "전사 업무 자동화율 80% 달성 및 대표 전용 보안 워룸 통합 구축",
      benefits: [
        "신입 직원도 즉시 베테랑처럼 고객 CS 응대 가능",
        "보안 PIN과 2단계 인증 체계로 사내 기밀 및 API 키 보호",
        "Vercel 서버리스로 유지비 0원에 전사 포털 운영",
      ],
    },
    deliverable: {
      summary: "실제 동작하는 Next.js 기반 전사 AI 포털 & PIN 잠금 보안 워룸 (brave-hertz)",
      previewType: "website",
      previewData: {
        departments: ["경영지원 & 재무", "B2C 운영 & 무인창고", "마케팅 & MD", "개발 & IT 인프라"],
        security: "PIN 4자리 인증 체계",
      },
    },
    executionGuide: {
      step1: "위 프롬프트로 생성된 Next.js 코드를 프로젝트에 넣고 'npm run dev'로 실행합니다.",
      step2: "사내 직원들에게는 '일반 직원 포털' 링크를 주고, 대표는 상단 [총사령관 워룸]을 눌러 PIN(0000)을 입력합니다.",
      step3: "Vercel에 연동하면 전 세계 어디서든 안전하게 접속할 수 있습니다.",
      deployTip: "회사 로고와 부서 이름만 바꾸면 병원, 학원, 무인매장, 스타트업 어디든 바로 쓸 수 있습니다.",
    },
  },
  {
    id: "sketchup-store-layout-ai",
    order: 5,
    title: "도면 사진 한 장으로 3D 공간 배치와 동선 분석하기",
    emoji: "📐",
    targetAudience: "실무 직장인 💼",
    difficulty: "보통 (10분)",
    category: "business",
    categoryLabel: "매장·회사 업무 자동화",
    tagline: "손그림 도면이나 캐드 도면 이미지를 넣으면 문 열리는 방향, 방음부스 간격, 통로 문제를 짚어냅니다.",
    quickPrompt: `당신은 20년 경력의 인테리어 건축 설계사이자 3D 스케치업 공간 분석 전문가입니다.
첨부된 평면도(도면) 이미지를 정밀 분석하여 다음 보고서를 작성해주세요:

1. 공간 구획 요약: 출입구 위치, 메인 통로 동선 폭(최소 900mm 확보 여부)
2. 시설물 배치 검증: 방음부스/사물함의 문 열리는 회전 반경과 간섭 문제
3. 시공상 주의점: 기둥 및 파티션 설치 시 예상되는 데드스페이스(버려지는 공간)
4. 스케치업 모델링 가이드: 3D 모델링 시 가장 먼저 잡아야 할 벽체 높이와 레이어 분리 가이드`,
    quickPromptExplanation: "도면 사진과 함께 이 프롬프트를 Claude 3.5 Sonnet이나 GPT-4o에 넣으면 전문 건축 감리 보고서가 나옵니다.",
    background: {
      problem: "무인 공유창고나 스터디카페 매장을 낼 때, 도면상 문 열리는 방향이나 방음부스 간격이 안 맞아서 현장에서 뜯어고치는 낭비가 발생했습니다.",
      story: "사람 눈으로 놓치기 쉬운 문 회전 반경 간섭과 통로 폭 문제를 비전 AI를 통해 착공 전에 미리 검증하도록 설계했습니다.",
    },
    objective: {
      goal: "도면 오류로 인한 현장 재시공 비용 수백만 원을 0원으로 예방",
      benefits: [
        "손으로 끄적인 메모 평면도도 정확하게 읽고 분석",
        "소방법 및 피난 동선에 걸리는 부분 사전 경고",
        "3D 스케치업 디자이너에게 전달할 완벽한 작업 지시서 생성",
      ],
    },
    deliverable: {
      summary: "공간 구획 분석표 & 동선 간섭 체크리스트 & 3D 모델링 지시서",
      previewType: "table",
      previewData: {
        sections: ["출입구 동선", "방음부스 5기 배치", "유리 파티션 간섭 검토"],
      },
    },
    executionGuide: {
      step1: "스마트폰으로 매장 평면도나 스케치 종이를 또렷하게 사진 찍습니다.",
      step2: "Claude나 ChatGPT 앱에서 사진을 첨부하고 위의 프롬프트를 복사해 넣습니다.",
      step3: "AI가 짚어준 간섭 문제(문 열림 방향, 통로 좁음)를 반영하여 도면을 확정합니다.",
    },
  },
  {
    id: "crypto-news-briefing-agent",
    order: 6,
    title: "바쁜 사람을 위한 코인·주식 뉴스 3줄 첩보 비서",
    emoji: "🪙",
    targetAudience: "모두를 위한 🌟",
    difficulty: "초간단 (1분)",
    category: "finance",
    categoryLabel: "가계부·정산·코인 첩보",
    tagline: "영어 기사나 긴 텔레그램 글을 복사해 넣으면 '호재/악재'와 핵심 영향도를 3줄로 브리핑해줍니다.",
    quickPrompt: `당신은 최고 월스트리트 퀀트 헤지펀드의 실시간 뉴스 브리핑 첩보 비서입니다.
아래에 입력된 뉴스 또는 커뮤니티 텍스트를 읽고, 바쁜 투자자가 3초 만에 판단할 수 있도록 초간결 브리핑을 작성해주세요:

[입력 뉴스]
[여기에 긴 외신 기사나 뉴스 텍스트를 붙여넣으세요]

[브리핑 양식]
⚡ 3줄 초압축 요약:
1. 
2. 
3. 

📈 시장 영향도: [강한 호재 🟢 / 중립 ⚪ / 강한 악재 🔴]
🎯 주목해야 할 수치/가격대: 
⚠️ 투자 주의사항 (한 문장):`,
    quickPromptExplanation: "긴 영어 기사나 어려운 금융 뉴스를 던져주면, 지금 사야 할지 팔아야 할지 핵심만 요약해줍니다.",
    background: {
      problem: "비트코인이나 주식 시장은 24시간 뉴스가 쏟아지는데, 영문 외신을 일일이 읽고 해석할 시간이 턱없이 부족했습니다.",
      story: "불필요한 미사여구를 모두 걷어내고, 시장 가격에 직접 영향을 미치는 핵심 팩트와 호재/악재 지수만 즉시 추출하도록 설계했습니다.",
    },
    objective: {
      goal: "뉴스 읽는 시간 95% 단축, 감정에 휘둘리지 않는 팩트 기반 빠른 투자 판단",
      benefits: [
        "영문 외신 기사도 완벽한 한국어로 핵심만 추출",
        "호재/악재 여부를 신호등 색상으로 직관적 표시",
        "속보 발생 시 3초 만에 내용 파악 가능",
      ],
    },
    deliverable: {
      summary: "3줄 초압축 팩트 브리핑 & 호재/악재 신호등 & 핵심 가격대 알림",
      previewType: "chat",
      previewData: {
        signal: "강한 호재 🟢",
        summary: "비트코인 현물 ETF 대규모 순유입 지속 및 기관 매수세 확대",
      },
    },
    executionGuide: {
      step1: "궁금한 코인/주식 뉴스 링크나 기사 본문을 복사합니다.",
      step2: "위 프롬프트의 [입력 뉴스] 자리에 붙여넣고 AI에게 질문합니다.",
      step3: "3줄 요약과 호재/악재 신호등을 확인하고 빠르게 대처합니다.",
    },
  },
];
