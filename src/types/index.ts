export type WeightClass = 'HEAVY' | 'LIGHT_HEAVY' | 'MIDDLE' | 'WELTER';

export type Party = '더불어민주당' | '국민의힘' | '조국혁신당' | '개혁신당' | '무소속';

export interface CriminalRecordItem {
  year: string;
  charge: string; // 죄명
  sentence: string; // 처분/형량
  note: string; // 설명/선관위 공보 내용
}

export interface FlipFlopCase {
  title: string;
  category: string;
  past: {
    year: string;
    role: string;
    quote: string;
    context: string;
    source: string;
  };
  current: {
    year: string;
    role: string;
    quote: string;
    context: string;
    source: string;
  };
  analysis: string;
}

export interface PledgeItem {
  id: string;
  title: string;
  category: string;
  status: 'completed' | 'ongoing' | 'broken';
  achievementRate: number; // 0 ~ 100%
  description: string;
  source: string;
}

export interface PoliticianStats {
  pledgeRate: number; // 공약 이행률 (0~100)
  integrity: number; // 언행 일치도 (100 - 내로남불 지수)
  activity: number; // 의정/공직 활동력 (본회의 출석률, 법안 가결 등)
  cleanliness: number; // 도덕성/준법 스탯 (전과, 징계 여부 반영)
  wealthScore: number; // 재산 형성 투명성 및 스탯
  influence: number; // 팬덤/대중 파급력
}

export interface Politician {
  id: string;
  name: string;
  hanja?: string;
  nickname: string; // 링네임 / 닉네임 (예: '정치9단', '조선의 사이다', '여의도 스마트폰' 등)
  party: Party;
  partyColor: string;
  currentRole: string;
  photoUrl: string;
  weightClass: WeightClass;
  ovr: number; // Overall 전투력 (종합 스탯)
  stats: PoliticianStats;
  details: {
    birth: string;
    age: number;
    education: string[];
    military: string;
    wealth: {
      total: string; // 총 신고액 (예: "31억 2,000만원")
      realEstate: string;
      cashSecurities: string;
      debt: string;
    };
    criminalRecord: {
      count: number;
      items: CriminalRecordItem[];
    };
    strengths: string[];
    weaknesses: string[];
  };
  signatureFlipFlop: FlipFlopCase;
  pledges: {
    total: number;
    completed: number;
    ongoing: number;
    broken: number;
    items: PledgeItem[];
  };
}

export interface Matchup {
  id: string;
  title: string;
  division: string; // e.g. "헤비급 챔피언십 라이벌전"
  weightClass: WeightClass;
  fighter1Id: string;
  fighter2Id: string;
  keyIssue: string; // 이번 매치업의 핵심 전선 (예: "사법리스크 vs 당정관계")
  initialVotes: {
    fighter1: number;
    fighter2: number;
  };
}
