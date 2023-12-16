import { TagInterface, FreePostTag } from '@/types/post';
import { LINK } from './links';

export const tabList = [
  { id: 1, name: '도움이 필요해요', category: 'NEED_HELP', link: LINK.POST_HELP },
  { id: 2, name: '자유게시판', category: 'FREE', link: LINK.POST_FREE },
];

export const freePostTagList: TagInterface[] = [
  { id: 0, name: '전체', en: '' },
  { id: 1, name: '연애', en: 'LOVE' },
  { id: 2, name: '일상', en: 'DAILY' },
  { id: 3, name: '같이해요', en: 'TOGETHER' },
  { id: 4, name: '맛집', en: 'RESTAURANT' },
  { id: 5, name: '잡담', en: 'CHITCHAT' },
];

export const tagToEnglishMapping: { [key in FreePostTag]: string } = {
  전체: 'ALL',
  연애: 'LOVE',
  일상: 'DAILY',
  같이해요: 'TOGETHER',
  맛집: 'RESTAURANT',
  잡담: 'CHITCHAT',
};

export const englishToTagMapping: { [key: string]: FreePostTag } = {
  ALL: '전체',
  LOVE: '연애',
  DAILY: '일상',
  TOGETHER: '같이해요',
  RESTAURANT: '맛집',
  CHITCHAT: '잡담',
};

export const DEFAULT_TAG: FreePostTag = '연애';

export const POST_FILTER_LIST = [
  { id: 1, content: '최신순', sortBy: 'createAt', direction: 'DESC' },
  { id: 2, content: '오래된순', sortBy: 'createAt', direction: 'ASC' },
  { id: 3, content: '추천순', sortBy: 'recommendCount', direction: 'DESC' },
  { id: 4, content: '조회순', sortBy: 'viewCount', direction: 'DESC' },
] as const;
