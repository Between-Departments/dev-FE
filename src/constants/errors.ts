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
  { path: LINK.NOTIFICATION, message: '새로운 알림이 없어요' },
  { path: LINK.ADMIN_DECLARE, message: '신고 내용이 없어요' },
  { path: LINK.ADMIN_ACCOUNT, message: '해당 사용자가 없어요' },
] as const;
