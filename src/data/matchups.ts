import { Matchup } from '../types';

export const MATCHUPS: Matchup[] = [
  {
    id: 'heavyweight-main',
    title: '이재명 VS 한동훈',
    division: '🔥 헤비급 타이틀 매치 : 대권 전초전',
    weightClass: 'HEAVY',
    fighter1Id: 'lee-jaemyung',
    fighter2Id: 'han-donghoon',
    keyIssue: '사법리스크 방탄 논란 VS 당정 갈등 & 제3자 특검 표류',
    initialVotes: {
      fighter1: 5240,
      fighter2: 4890,
    },
  },
  {
    id: 'heavyweight-co-main',
    title: '오세훈 VS 조국',
    division: '⚡ 헤비급 슈퍼매치 : 수도 행정가 VS 개혁 쇄빙선',
    weightClass: 'HEAVY',
    fighter1Id: 'oh-sehoon',
    fighter2Id: 'cho-kuk',
    keyIssue: '무상복지 사퇴 후 안심소득 턴 VS 가재·붕어 설파 후 입시특혜',
    initialVotes: {
      fighter1: 4120,
      fighter2: 3980,
    },
  },
  {
    id: 'welterweight-derby',
    title: '이준석 VS 장경태',
    division: '🥊 웰터급 청년 더비 : 여의도 스피커 맞짱',
    weightClass: 'WELTER',
    fighter1Id: 'lee-junseok',
    fighter2Id: 'jang-kyungtae',
    keyIssue: '묻지마 빅텐트 비판 후 11일 합당 파투 VS 계파 청산 외치다 친명 호위무사',
    initialVotes: {
      fighter1: 6730,
      fighter2: 5410,
    },
  },
];
