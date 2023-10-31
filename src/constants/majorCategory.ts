export const MAJORS = [
  '인문, 경영, 사회 계열',
  '자연, 컴퓨터, 공학 계열',
  '교대, 사범대, 교육 계열',
  '음악, 미술, 체육 예체능 계열',
  '간호, 의약, 의학 계열',
  '기타',
] as const;

export type MajorKeys = (typeof MAJORS)[number];

export const majorToEnglishMapping: Record<MajorKeys, string> = {
  '인문, 경영, 사회 계열': 'SOCIAL',
  '자연, 컴퓨터, 공학 계열': 'ENGINEERING',
  '교대, 사범대, 교육 계열': 'EDUCATION',
  '음악, 미술, 체육 예체능 계열': 'PHYSICAL',
  '간호, 의약, 의학 계열': 'MEDICAL',
  기타: 'ETC',
} as const;

export const majorToKoreaMapping: Record<string, MajorKeys> = {
  SOCIAL: '인문, 경영, 사회 계열',
  ENGINEERING: '자연, 컴퓨터, 공학 계열',
  EDUCATION: '교대, 사범대, 교육 계열',
  PHYSICAL: '음악, 미술, 체육 예체능 계열',
  MEDICAL: '간호, 의약, 의학 계열',
  ETC: '기타',
} as const;
