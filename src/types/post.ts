export enum Category {
  'NEED_HELP',
  'FREE',
}
export enum FreePostTags {
  '전체' = 0,
  '연애',
  '일상',
  '같이해요',
  '맛집',
  '잡담',
}
export type FreePostTag = keyof typeof FreePostTags;
export interface TabInterface {
  id: number;
  name: string;
  category: string;
  link?: string;
}
export interface PageStatusInterface {
  page: number;
  isNext: boolean;
}

export type PostList = {
  dataList: Post[];
  size: number;
  hasNext: boolean;
};
export type Post = {
  postId: number;
  title: string;
  content: string;
  thumbnailImages?: string[];
  viewCount: number;
  recommendCount: number;
  replyCount: number;
  writer?: {
    memberId: number;
    nickname: string;
    imageUrl: string;
  };
  anonymous: boolean;
  boardType: keyof typeof Category;
  majorCategory?: string;
  createAt: string;
  updateAt?: string;
};
export type RequestPostCreate = {
  major: string;
  category: keyof typeof Category;
  title: string;
  content: string;
};
export type RequestPostUpdate = {
  postId: number;
  major?: string;
  category?: keyof typeof Category;
  title?: string;
  content?: string;
};

export type ReplyList = {
  dataList: Reply[];
  size: number;
  next: boolean;
};
export type Reply = {
  replyId: number;
  writer: string;
  postId: number;
  content: string;
  recommendCount: number;
  createAt: string;
  updateAt: string;
};
export type RequestReplyCreate = {
  postId: number;
  content: string;
};
export type RequestReplyUpdate = {
  replyId: number;
  content?: string;
};

export type getPostListOptions = {
  page?: number;
  size?: number;
  keyword?: string;
  order?: string;
  category?: string;
  majorCategory?: string;
};

export interface PostContainerProps {
  keyword?: string;
}
export interface PostListProps {
  postList: Post[];
  pageStatus: PageStatusInterface;
  nextPageHandler: () => void;
  postImgSize?: 'small' | 'medium';
  infiniteScroll?: boolean;
  keyword?: string;
}
export interface PostProps {
  post: Post;
  keyword?: string;
  imageSize?: 'small' | 'medium';
  onClick?: () => void;
}
export interface PostCountInterface {
  recommendCount: number;
  replyCount: number;
  viewCount: number;
  darkMode?: boolean;
}

export interface PostDetailInterface {
  postId: number;
  writer: Writer;
  title: string;
  content: string;
  viewCount: number;
  recommendCount: number;
  replyCount: number;
  images: string[];
  createAt: string;
  isAnonymous: boolean;
}

export interface Writer {
  memberId: number;
  nickname: string;
  imageUrl: string;
  school: string;
  major: string;
}
