import { LINK } from './links';

export const errorMessages = [
  { path: '*', message: '잘못된 접근입니다' },
  { path: LINK.MAIN, message: '게시된 글이 없어요' },
  { path: LINK.POST, message: '게시된 글이 없어요' },
  { path: LINK.SEARCH, message: '검색 결과가 없어요' },
  { path: LINK.CHAT, message: '참여 중인 톡톡이 없어요' },
  { path: LINK.MY_BOOKMARKS, message: '북마크한 글이 없어요' },
  { path: LINK.MY_POSTS, message: '내가 쓴 글이 없어요' },
  { path: LINK.MY_COMMENTS, message: '내가 쓴 댓글이 없어요' },
];
