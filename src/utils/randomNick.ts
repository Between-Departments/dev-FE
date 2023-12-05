export const generateRandomNickname = (): string => {
  const names = [
    '서울대',
    '한양대',
    '고려대',
    '서강대',
    '연세대',
    '중앙대',
    '부산대',
    '경북대',
    '충남대',
    '전북대',
    'Harvard',
    'Yale',
    'Stanford',
    'MIT',
    'Princet',
    'Oxford',
    'Camb',
    'Caltech',
    'UCLA',
    'Berkeley',
  ];

  const getRandomItem = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

  const generateRandomNumber = (min: number, max: number): string =>
    Math.floor(min + Math.random() * (max - min + 1)).toString();

  const selectNamePart = (): string => getRandomItem(names);

  const namePart = selectNamePart();

  const remainingLength = Math.max(0, 8 - namePart.length);

  const numberPart =
    remainingLength > 0
      ? generateRandomNumber(Math.pow(10, remainingLength - 1), Math.pow(10, remainingLength) - 1)
      : '';

  return `${namePart}${numberPart}`;
};
