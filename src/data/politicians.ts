import { Politician } from '../types';

export const POLITICIANS: Record<string, Politician> = {
  'lee-jaemyung': {
    id: 'lee-jaemyung',
    name: '이재명',
    hanja: '李在明',
    nickname: '사이다 파이터',
    party: '더불어민주당',
    partyColor: 'bg-blue-600',
    currentRole: '더불어민주당 당대표 / 제22대 국회의원 (인천 계양구을)',
    photoUrl: '/avatars/lee-jm.png',
    weightClass: 'HEAVY',
    ovr: 88,
    stats: {
      pledgeRate: 74, // 성남시장/경기지사 시절 공약이행률 및 총선 공약
      integrity: 62, // 언행일치도 (내로남불 지수 연동)
      activity: 85, // 정책 집행력 및 당 장악력
      cleanliness: 55, // 전과 및 진행 중인 재판/수사 리스크
      wealthScore: 70, // 31억 1,000만원 상당
      influence: 95, // 강력한 팬덤 및 야권 압도적 지지율
    },
    details: {
      birth: '1964년 12월 22일 (만 59세)',
      age: 59,
      education: [
        '삼계국민학교 (졸업)',
        '중학교·고등학교 입학자격 및 졸업학력 검정고시',
        '중앙대학교 법학 학사',
        '사법연수원 18기 수료',
      ],
      military: '전시근로역 (골절 후유장애)',
      wealth: {
        total: '약 31억 1,500만원 (2024년 정기재산공개 기준)',
        realEstate: '경기 성남시 분당구 아파트 (약 15억 6,000만원)',
        cashSecurities: '예금 및 채권 약 15억 5,000만원',
        debt: '금융 및 건물임대채무 약 2,000만원',
      },
      criminalRecord: {
        count: 4,
        items: [
          {
            year: '2004',
            charge: '음주운전 (도로교통법 위반)',
            sentence: '벌금 150만원',
            note: '성남 분당구에서 음주운전 단속 적발',
          },
          {
            year: '2003',
            charge: '공무원자격사칭',
            sentence: '벌금 150만원',
            note: '분당 파크뷰 특혜 분양 취재 PD와 검사 사칭 공모 혐의',
          },
          {
            year: '2004',
            charge: '특수공무집행방해',
            sentence: '벌금 500만원',
            note: '성남시립병원 설립 조례안 부결에 항의하며 성남시의회 점거',
          },
          {
            year: '2010',
            charge: '공직선거법 위반',
            sentence: '벌금 50만원',
            note: '지하철 역사 내 명함 배부 혐의',
          },
        ],
      },
      strengths: [
        '탁월한 행정 실행력 및 아젠다 세팅 능력 (기본소득, 지역화폐, 계곡정비 등)',
        '단단한 당내 장악력 및 충성도 높은 대중 팬덤 기반',
        '위기 국면에서의 순발력과 대중 친화적 스피치',
      ],
      weaknesses: [
        '다수의 형사재판 동시 진행 (대장동, 백현동, 공직선거법, 위증교사 등 사법리스크)',
        '상황에 따른 정책적 말바꾸기 논란 (국회의원 불체포특권 포기 번복 등)',
        '당내 비명계 및 중도·보수층의 강한 비호감도',
      ],
    },
    signatureFlipFlop: {
      title: '국회의원 불체포특권 포기 공약 번복',
      category: '정치개혁 / 특권폐지',
      past: {
        year: '2022년 5월 (대선 및 지방선거 후보 당시)',
        role: '대선 후보 및 국회의원 보궐선거 출마',
        quote: '"국회의원 면책특권, 불체포특권 다 포기하겠습니다. 죄가 없으면 조사받으면 되지 왜 숨습니까?"',
        context: '대선 및 계양을 출마 당시 본인 입으로 불체포특권 포기를 대대적으로 약속',
        source: '중앙일보 / KBS 보도 (2022.05.22)',
      },
      current: {
        year: '2023년 9월 (국회 체포동의안 표결 직전)',
        role: '더불어민주당 당대표',
        quote: '"체포동의안 가결은 검찰독재의 야당탄압에 날개를 달아줄 것입니다. 부결을 호소합니다."',
        context: '검찰 구속영장 청구 후 페이스북을 통해 민주당 의원들에게 체포동의안 부결 요청',
        source: '국회 의사일정 및 이재명 공식 SNS (2023.09.20)',
      },
      analysis:
        '자신이 법안 및 공약으로 내걸었던 대표적인 특권 내려놓기를 실제 본인의 구속 기로에서 직접 부결을 호소하며 전형적인 내로남불 사례로 야당·여당 모두에서 큰 비판을 받음.',
    },
    pledges: {
      total: 15,
      completed: 8,
      ongoing: 5,
      broken: 2,
      items: [
        {
          id: 'p1',
          title: '계양을 테크노밸리 철도망 구축 및 첨단기업 유치',
          category: '지역개발',
          status: 'ongoing',
          achievementRate: 60,
          description: '계양테크노밸리 국가산단 철도 연장 논의 및 추진 중',
          source: '국회 의정보고서 (2024)',
        },
        {
          id: 'p2',
          title: '청년·취약계층 기본금융(마이너스통장) 제도화',
          category: '복지/경제',
          status: 'broken',
          achievementRate: 20,
          description: '정부 반대 및 여야 대치로 관련 법안 국회 미통과',
          source: '국회의안정보시스템',
        },
        {
          id: 'p3',
          title: '간병비 건강보험 급여화 추진',
          category: '보건복지',
          status: 'completed',
          achievementRate: 85,
          description: '간병비 급여화 시범사업 예산 편성 및 단계적 국회 합의 도출',
          source: '보건복지부 고시 (2024)',
        },
      ],
    },
  },

  'han-donghoon': {
    id: 'han-donghoon',
    name: '한동훈',
    hanja: '韓東勳',
    nickname: '여의도 스마트폰',
    party: '국민의힘',
    partyColor: 'bg-red-600',
    currentRole: '국민의힘 당대표 / 전 법무부 장관',
    photoUrl: '/avatars/han-dh.png',
    weightClass: 'HEAVY',
    ovr: 87,
    stats: {
      pledgeRate: 68, // 총선 비대위 공약 및 당대표 출마 공약
      integrity: 71, // 법치주의 원칙 vs 당정 갈등 속 태도
      activity: 82, // 당내 쇄신 드라이브 및 이슈 대응력
      cleanliness: 95, // 전과 0건 (클린 레코드)
      wealthScore: 82, // 약 43억 8,000만원
      influence: 92, // 보수 진영 압도적 대선 주자 지지율
    },
    details: {
      birth: '1973년 4월 9일 (만 51세)',
      age: 51,
      education: [
        '현대고등학교 (졸업)',
        '서울대학교 법과대학 법학 학사',
        '미국 컬럼비아 대학교 로스쿨 LL.M.',
        '사법연수원 27기 수료 (만 22세 사법시험 합격)',
      ],
      military: '공군 대위 만기전역 (군법무관 3년 복무)',
      wealth: {
        total: '약 43억 8,500만원 (2024년 공직자 재산공개 기준)',
        realEstate: '서울 서초구 삼풍아파트 등 부동산 약 21억 1,000만원',
        cashSecurities: '예금 약 22억 8,000만원',
        debt: '채무 없음 (순자산 중심)',
      },
      criminalRecord: {
        count: 0,
        items: [],
      },
      strengths: [
        '흠결 없는 전과 0건의 도덕성과 특수부 검사 출신의 치밀한 논리력',
        '기존 여의도 구태 문법을 깨는 직설적·현대적 화법과 청년·중도 확장성',
        '불체포특권 포기 서약, 금고형 이상 세비 반납 등 정치개혁 의제 선점',
      ],
      weaknesses: [
        '원내 의원 경력 부재 (원외 당대표로서의 원내 교섭 및 입법 추진 한계)',
        '윤석열 대통령 및 친윤계와의 갈등 지속에 따른 당내 리더십 시험대',
        '특검법(김건희·채상병) 대응에 대한 명확한 돌파구 부재 및 당내 이견',
      ],
    },
    signatureFlipFlop: {
      title: '채상병 특검법 제3자 추천안 공약 장기 표류',
      category: '사법 / 특검',
      past: {
        year: '2024년 6월 (당대표 출마 선언 기자회견)',
        role: '국민의힘 당대표 후보',
        quote: '"진실 규명을 위해 대법원장 등 공정한 제3자가 특검을 추천하는 채상병 특검법을 제가 당대표가 되면 당론으로 즉각 발의하겠습니다."',
        context: '전당대회 국면에서 중도 소구 및 쇄신안으로 제3자 특검법을 핵심 공약으로 천명',
        source: 'SBS 8뉴스 / 연합뉴스 (2024.06.23)',
      },
      current: {
        year: '2024년 9월~10월 (당대표 취임 후)',
        role: '국민의힘 당대표',
        quote: '"당내 이견이 있고 원내 상황을 존중해야 합니다. 야당의 정쟁용 특검 수용은 불가합니다."',
        context: '당선 이후 친윤계와 원내 지도부의 반발에 부딪히며 공약했던 자체 법안 발의를 보류',
        source: '국회 최고위원회의 발언 (2024.09.23)',
      },
      analysis:
        '당대표 출마의 핵심 명분이었던 제3자 특검법을 당선 후 당내 반발을 이유로 수개월째 공식 발의하지 못해 야당과 유권자들로부터 약속 파기라는 내로남불 공세를 받음.',
    },
    pledges: {
      total: 12,
      completed: 6,
      ongoing: 4,
      broken: 2,
      items: [
        {
          id: 'hp1',
          title: '국회의원 불체포특권 포기 서약 당론화',
          category: '정치개혁',
          status: 'completed',
          achievementRate: 90,
          description: '22대 총선 국민의힘 공천자 전원 불체포특권 포기 서약서 징구 완료',
          source: '국민의힘 비대위 의결사항 (2024)',
        },
        {
          id: 'hp2',
          title: '제3자 추천 방식 채상병 특검법 자체 발의',
          category: '정치/사법',
          status: 'broken',
          achievementRate: 25,
          description: '원내 지도부 반대 및 친윤 갈등으로 당론 발의 무산 상태',
          source: '국회 의안정보시스템 (미발의)',
        },
        {
          id: 'hp3',
          title: '금융투자소득세(금투세) 폐지 드라이브',
          category: '경제/금융',
          status: 'completed',
          achievementRate: 95,
          description: '야당과의 끈질긴 논쟁 끝에 금투세 폐지 방향으로 야당 동의 견인',
          source: '국회 기재위 합의 발표 (2024.11)',
        },
      ],
    },
  },

  'oh-sehoon': {
    id: 'oh-sehoon',
    name: '오세훈',
    hanja: '吳世勳',
    nickname: '한강 르네상스 마스터',
    party: '국민의힘',
    partyColor: 'bg-red-600',
    currentRole: '제39대 서울특별시장 (4선 시장)',
    photoUrl: '/avatars/oh-sh.png',
    weightClass: 'HEAVY',
    ovr: 85,
    stats: {
      pledgeRate: 78, // 서울시정 공약 달성률
      integrity: 69, // 10여년 전 무상급식 사퇴 vs 최근 정책
      activity: 88, // 기후동행카드, 그레이트 한강 등 집행력
      cleanliness: 82, // 전과 0건, 명태균 의혹 등 조사 이슈
      wealthScore: 89, // 약 59억 7,000만원
      influence: 86, // 수도권 보수 중도층 지지 기반
    },
    details: {
      birth: '1961년 1월 4일 (만 63세)',
      age: 63,
      education: ['대일고등학교 (졸업)', '고려대학교 법과대학 법학 학사·석사·박사', '사법연수원 16기 수료'],
      military: '육군 보안사령부 중위 만기전역 (정훈장교)',
      wealth: {
        total: '약 59억 7,500만원 (2024년 공직자 재산공개 기준)',
        realEstate: '서울 광진구 자양동 아파트 등 약 26억 7,000만원',
        cashSecurities: '예금 및 유가증권 약 33억 5,000만원',
        debt: '채무 없음',
      },
      criminalRecord: {
        count: 0,
        items: [],
      },
      strengths: [
        '역대 유일 4선 서울시장으로서의 압도적인 수도 행정 경력과 정책 완성도',
        '기후동행카드, 손목닥터 9988, 모아타운 등 시민 체감형 히트 행정력',
        '변호사이자 방송인 출신다운 부드럽고 품격 있는 대중적 소통 이미지',
      ],
      weaknesses: [
        '2011년 무상급식 주민투표 무산 후 시장직 중도사퇴라는 과거 정치적 실책',
        '한강 리버버스, 링(대관람차) 등 토목·조형물 중심 행정에 대한 비판',
        '당내 강성 보수 지지층 흡수력 부족 및 대권 지지율 정체',
      ],
    },
    signatureFlipFlop: {
      title: '무상복지 반대 시장직 사퇴 VS 약자와의 동행 복지 행정',
      category: '복지 / 철학',
      past: {
        year: '2011년 8월 (서울시장 재임 당시)',
        role: '제34대 서울특별시장',
        quote: '"망국적 무상급식 포퓰리즘에 맞서 제 시장직을 걸고 주민투표를 치르겠습니다."',
        context: '초중등 전면 무상급식을 복지 포퓰리즘으로 규정하고 시장직을 걸었다가 투표율 미달로 사퇴',
        source: 'KBS 뉴스 9 (2011.08.21)',
      },
      current: {
        year: '2022년~2024년 (서울시장 4선 복귀 후)',
        role: '제39대 서울특별시장',
        quote: '"시정의 1호 가치는 디딤돌소득과 교육사다리 등 약자와의 동행입니다. 복지는 시혜가 아닌 권리입니다."',
        context: '서울시 안심소득(디딤돌소득) 시범사업 및 취약계층 복지 확대를 핵심 브랜드로 추진',
        source: '서울시정 운영계획 발표 (2023.07)',
      },
      analysis:
        '과거에는 무상복지를 망국적 포퓰리즘이라며 사퇴까지 감행했으나, 재집권 후에는 기본소득류의 안심소득을 자신의 대표 공약으로 내세우며 정책 기조의 180도 선회를 보여줌.',
    },
    pledges: {
      total: 14,
      completed: 10,
      ongoing: 3,
      broken: 1,
      items: [
        {
          id: 'op1',
          title: '수도권 무제한 대중교통 정기권 (기후동행카드) 도입',
          category: '교통/환경',
          status: 'completed',
          achievementRate: 98,
          description: '서울시 전역 및 인근 지자체 연계 대중교통 무제한 카드 도입 성공',
          source: '서울시 교통기획관실 (2024.01)',
        },
        {
          id: 'op2',
          title: '노후 저층 주거지 개선 모아타운·신속통합기획 확대',
          category: '주택/재개발',
          status: 'completed',
          achievementRate: 85,
          description: '100여 개 이상 구역 지정 및 인허가 단축 시행',
          source: '서울시 주택정책실',
        },
        {
          id: 'op3',
          title: '서울 메가시티 (김포·구리 서울 편입 추진)',
          category: '도시계획',
          status: 'broken',
          achievementRate: 20,
          description: '총선 이후 동력 상실 및 관련 특별법 처리 지연',
          source: '국회 행안위 회의록',
        },
      ],
    },
  },

  'cho-kuk': {
    id: 'cho-kuk',
    name: '조국',
    hanja: '曺國',
    nickname: '검찰개혁 쇄빙선',
    party: '조국혁신당',
    partyColor: 'bg-sky-600',
    currentRole: '조국혁신당 대표 / 제22대 국회의원',
    photoUrl: '/avatars/cho-k.png',
    weightClass: 'HEAVY',
    ovr: 84,
    stats: {
      pledgeRate: 65, // 비례정당 창당 공약 및 특검 추진력
      integrity: 48, // '조국의 적은 조국(조적조)' SNS 발언 논란
      activity: 87, // 정권 심판 선봉장 및 원내 12석 리더십
      cleanliness: 45, // 자녀 입시비리 등 1·2심 유죄 판결
      wealthScore: 78, // 약 53억 7,000만원
      influence: 91, // 강성 개혁층 지지 및 비례 득표력
    },
    details: {
      birth: '1965년 4월 6일 (만 59세)',
      age: 59,
      education: [
        '혜광고등학교 (졸업)',
        '서울대학교 법과대학 법학 학사·석사',
        '미국 UC 버클리 로스쿨 법학석사(LL.M.)·법학박사(J.S.D.)',
      ],
      military: '육군 소위 전역 (석사장교 제도)',
      wealth: {
        total: '약 53억 7,000만원 (2024년 국회의원 재산공개 기준)',
        realEstate: '서울 서초구 방배동 아파트 등 약 24억 5,000만원',
        cashSecurities: '예금 약 28억 9,000만원',
        debt: '채무 없음',
      },
      criminalRecord: {
        count: 1,
        items: [
          {
            year: '1993',
            charge: '국가보안법 위반 (이적단체 가입)',
            sentence: '징역 6월 집행유예 1년 (사면복권)',
            note: '남한사회주의로동자동맹(사노맹) 산하 남한사회주의과학원 연구원 활동',
          },
        ],
      },
      strengths: [
        '선명한 정권 심판과 검찰개혁 메시지로 제3정당 12석 돌풍을 일으킨 정치적 응집력',
        '법학자 출신다운 사법체계 이론 무장 및 대중을 자극하는 강렬한 비유력',
        '정치적 탄압 프레임을 돌파하는 강한 팬덤 지지 기반',
      ],
      weaknesses: [
        '자녀 입시비리 및 감찰무마 혐의로 1·2심 징역 2년 실형 선고 (대법원 상고심 리스크)',
        '과거 본인이 트위터에 올렸던 도덕적 훈계 발언들이 부메랑이 된 "조적조" 내로남불 프레임',
        '사법부 판결 불복 및 사법 리스크 방탄 정당이라는 비판',
      ],
    },
    signatureFlipFlop: {
      title: '특목고·입시 불평등 비판 VS 자녀 입시 표창장·스펙 위조',
      category: '교육 / 공정',
      past: {
        year: '2010년~2012년 (서울대 교수 시절 SNS 트윗)',
        role: '서울대학교 법학전문대학원 교수',
        quote: '"장학금 지급 기준을 성적 중심에서 가계 곤란 중심으로 바꿔야 한다. 모두가 용이 될 필요는 없다."',
        context: '기득권층의 편법 입시 스펙 쌓기와 장학금 독식을 신랄하게 비판하며 공정 사회 역설',
        source: '조국 교수 트위터 / 저서 "진보집권플랜" (2010)',
      },
      current: {
        year: '2020년~2024년 (자녀 입시비리 형사재판 1·2심 유죄)',
        role: '전 법무부 장관 / 국회의원',
        quote: '"부모로서 도의적 불찰은 있으나, 당시 관행이었고 법적으로 허위 스펙 공모가 아닙니다."',
        context: '동양대 표창장 위조, 서울대 공익인권법센터 허위 인턴증명서 발급 공모 혐의로 유죄 판결',
        source: '서울고등법원 제8형사부 판결문 (2024.02)',
      },
      analysis:
        '교수 시절 "모두가 붕어·개구리·가재로 살아도 따뜻한 개천을 만들자"고 설파했으나, 정작 본인의 자녀는 온갖 허위 스펙과 부산대 의전원 장학금 수령 등 기득권 특혜를 누려 대한민국 내로남불의 대명사 격으로 기록됨.',
    },
    pledges: {
      total: 10,
      completed: 4,
      ongoing: 5,
      broken: 1,
      items: [
        {
          id: 'cp1',
          title: '한동훈 특검법 및 김건희 특검법 패스트트랙 추진',
          category: '사법개혁',
          status: 'ongoing',
          achievementRate: 70,
          description: '원내 1호 당론 법안으로 한동훈 특검법 공동 발의 완료',
          source: '국회 의안정보시스템 (2024.05)',
        },
        {
          id: 'cp2',
          title: '검찰청 해체 및 공소청·중대범죄수사청 분리 법안',
          category: '검찰개혁',
          status: 'ongoing',
          achievementRate: 60,
          description: '검찰 수사권 완전 분리 패키지 법안 발의',
          source: '조국혁신당 정책위원회',
        },
      ],
    },
  },

  'lee-junseok': {
    id: 'lee-junseok',
    name: '이준석',
    hanja: '李俊錫',
    nickname: '여의도 승부사',
    party: '개혁신당',
    partyColor: 'bg-orange-500',
    currentRole: '개혁신당 의원 / 전 국민의힘 대표 (경기 화성시을)',
    photoUrl: '/avatars/lee-js.png',
    weightClass: 'WELTER',
    ovr: 83,
    stats: {
      pledgeRate: 70, // 동탄 지역구 공약 및 정당 개혁안
      integrity: 72, // 보수 가치 일관성 vs 연대·결별 과정
      activity: 86, // 방송 토론, 정책 입법, 청년 담론 주도
      cleanliness: 88, // 전과 0건
      wealthScore: 68, // 약 19억 2,000만원 (암호화폐 등)
      influence: 90, // 2030 남성 및 온라인 커뮤니티 압도적 파급력
    },
    details: {
      birth: '1985년 3월 31일 (만 39세)',
      age: 39,
      education: ['서울과학고등학교 (졸업)', '미국 하버드 대학교 컴퓨터과학·경제학 학사 (A.B.)'],
      military: '산업기능요원 복무만료 (이노티브)',
      wealth: {
        total: '약 19억 2,700만원 (2024년 공직자 재산공개 기준)',
        realEstate: '서울 노원구 상계동 아파트 전세권 및 상가 등 약 8억원',
        cashSecurities: '예금 및 암호화폐 약 11억 2,000만원',
        debt: '채무 없음',
      },
      criminalRecord: {
        count: 0,
        items: [],
      },
      strengths: [
        '압도적인 방송 토론 실력과 데이터 기반의 논리적 팩트 폭격',
        '당대표 시절 비단주머니, 선거 유세차 등 선거 캠페인 혁신 입증',
        '거대 양당 구도를 뚫고 화성시을에서 자력으로 당선된 돌풍 승부사',
      ],
      weaknesses: [
        '젠더 갈등 부추김 논란 및 2030 남성 외 여성·고령층에서의 반감',
        '합당 11일 만의 개혁신당·새로운미래 결별 사태 등 정치적 포용력 부족',
        '싸움닭 이미지로 인한 적대적 관계 형성 및 당내 우군 부족',
      ],
    },
    signatureFlipFlop: {
      title: '원칙 없는 합당 비판 VS 이낙연계와의 번개 합당과 11일만 결별',
      category: '정당정치 / 합당',
      past: {
        year: '2023년 12월 (신당 창당 준비기)',
        role: '개혁신당 창당준비위원장',
        quote: '"화학적 결합 없는 묻지마 빅텐트는 야합입니다. 이념과 가치가 다른 세력과 자리 나눠먹기 안 합니다."',
        context: '총선을 앞두고 원칙 없는 제3지대 빅텐트 합당을 구태 야합이라고 맹비난',
        source: 'MBC 뉴스데스크 / 라디오 인터뷰 (2023.12.18)',
      },
      current: {
        year: '2024년 2월 (제3지대 통합 선언 및 결별)',
        role: '개혁신당 공동대표',
        quote: '"총선 승리를 위해 전격 합당합니다. (11일 후) 주도권 다툼 끝에 결별을 선언합니다."',
        context: '설 연휴 직전 이낙연의 새로운미래와 전격 합당했다가 총선 지휘권 갈등으로 11일 만에 결렬',
        source: '국회 정론관 기자회견 (2024.02.09 / 02.20)',
      },
      analysis:
        '과거 구태 정치인들의 야합을 강하게 비판해왔으나, 의석수와 선거보조금(6억원) 확보를 위해 가치 차이가 극심한 세력과 졸속 합당했다가 11일 만에 파투 내며 큰 비판을 받음.',
    },
    pledges: {
      total: 10,
      completed: 6,
      ongoing: 3,
      broken: 1,
      items: [
        {
          id: 'ljp1',
          title: '경기남부 반도체 벨트 교육특구 지정 및 과학고 설립',
          category: '교육/지역개발',
          status: 'ongoing',
          achievementRate: 65,
          description: '화성시 과학고 유치 협의체 가동 및 경기교육청 면담 진행',
          source: '의정보고서 (2024)',
        },
        {
          id: 'ljp2',
          title: '여성 희망복무제 및 경찰·소방 공무원 병역의무화',
          category: '국방/치안',
          status: 'broken',
          achievementRate: 15,
          description: '관련 개정안 발의 준비 중이나 여야 이견으로 입법 표류',
          source: '국회의안정보시스템',
        },
      ],
    },
  },

  'jang-kyungtae': {
    id: 'jang-kyungtae',
    name: '장경태',
    hanja: '張耿態',
    nickname: '민주당 돌격대장',
    party: '더불어민주당',
    partyColor: 'bg-blue-600',
    currentRole: '더불어민주당 최고위원 / 제22대 국회의원 (서울 동대문구을)',
    photoUrl: '/avatars/jang-kt.png',
    weightClass: 'WELTER',
    ovr: 81,
    stats: {
      pledgeRate: 72, // 동대문구을 공약 이행률
      integrity: 60, // 공격수 역할 속 팩트체크 오류 및 내로남불 논란
      activity: 84, // 최고위 발언 및 상임위 저격 활동
      cleanliness: 76, // 허위사실 유포 등 피소 이력
      wealthScore: 65, // 약 8억 5,000만원 (흙수저 출신)
      influence: 82, // 친명계 강성 당원 지지
    },
    details: {
      birth: '1983년 10월 12일 (만 41세)',
      age: 41,
      education: [
        '순천고등학교 (졸업)',
        '서울시립대학교 행정학 학사',
        '연세대학교 대학원 정치학 석사',
        '성균관대학교 대학원 행정학 박사과정 수료',
      ],
      military: '육군 병장 만기전역 (제2포병여단)',
      wealth: {
        total: '약 8억 5,400만원 (2024년 국회의원 재산공개 기준)',
        realEstate: '서울 동대문구 답십리동 아파트 등 약 6억 2,000만원',
        cashSecurities: '예금 약 2억 3,000만원',
        debt: '채무 없음',
      },
      criminalRecord: {
        count: 0,
        items: [],
      },
      strengths: [
        '대학생 자원봉사자부터 시작해 최고위원까지 오른 정통 청년정치 입지전적 스토리',
        '동대문구을 재선 성공 및 지역구 기반의 탄탄한 발로 뛰는 현장 의정',
        '당내 최고위원으로서 대여 공세의 선봉에 서는 강력한 추진력',
      ],
      weaknesses: [
        '과도한 공격성으로 인한 팩트 오류 논란 (김건희 여사 캄보디아 조명 촬영 의혹 고발 등)',
        '진영 논리에 매몰된 무조건적 당 감싸기 및 말바꾸기 논란',
        '상대 진영에 대한 막말 프레임에 자주 휩싸임',
      ],
    },
    signatureFlipFlop: {
      title: '청년 세습·공천 비판 VS 당내 원로·친문 배척 속 친명 줄서기',
      category: '정치개혁 / 공천',
      past: {
        year: '2020년 (초선 국회의원 당선 시절)',
        role: '더불어민주당 청년위원장',
        quote: '"청년 정치는 계파에 기대지 않고 오직 실력과 도덕성으로 승부해야 합니다. 줄서기 정치를 끝내겠습니다."',
        context: '기성 정치인들의 줄세우기와 계파 갈등을 비판하며 청년 독립 정치 천명',
        source: '청년정치 포럼 발언 (2020.06)',
      },
      current: {
        year: '2023년~2024년 (22대 총선 공천 국면)',
        role: '더불어민주당 최고위원',
        quote: '"당대표를 지키는 것이 곧 당을 지키는 길입니다. 비명계 의원들의 체포동의안 가결표는 해당 행위입니다."',
        context: '철저한 친명 일색 최고위원 활동 및 비명계 축출 공천 옹호 발언 지속',
        source: '민주당 최고위원회의 공식 발언 (2023.10)',
      },
      analysis:
        '계파 타파와 독립적 청년 정치를 외치며 국회에 입성했으나, 실질적으로는 가장 강력한 친명 호위무사를 자처하며 당내 다원성을 탄압하는 데 앞장섰다는 비판을 받음.',
    },
    pledges: {
      total: 11,
      completed: 7,
      ongoing: 3,
      broken: 1,
      items: [
        {
          id: 'jkp1',
          title: '청량리 복합환승센터 및 분당선 증편 추진',
          category: '교통',
          status: 'completed',
          achievementRate: 90,
          description: '국토부 및 코레일 협의로 출퇴근 시간대 증편 실현',
          source: '국회 국토위 의정보고',
        },
      ],
    },
  },
};
