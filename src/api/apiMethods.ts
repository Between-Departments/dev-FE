import { PostingDataInterface } from '@/types/posting';
import { ProfileSetupDataInterface, LoginDataInterface } from '../types/types';
import { RequestFreePostListInterface, RequestHelpPostListInterface } from '@/types/post';
import {
  RequestChatRoomCreateInterface,
  RequestChatRoomDeleteInterface,
  RequestChatRoomListInterface,
  RequestMessageListInterface,
} from '@/types/chat';

// TODO: url(params) object response 가능하도록 바꾸기
export const apiMethods = {
  search: {
    get: {
      school: (keyword: string) => ({
        url: `schools?keyword=${keyword}`,
      }),
      major: (keyword: string) => ({
        url: `majors?keyword=${keyword}`,
      }),
    },
  },
  mail: {
    get: {
      duplicate: (mail: string) => ({
        url: `members/mail/duplicate?mail=${mail}`,
      }),
    },
    post: {
      send: (mail: string) => ({
        url: 'mail/send',
        data: { mail },
      }),
      confirm: (mail: string, code: string) => ({
        url: 'mail/confirm',
        data: { mail, code },
      }),
    },
  },
  image: {
    post: {
      upload: (image: File) => {
        const formData = new FormData();
        formData.append('images', image);
        return {
          url: 'images',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    },
    delete: {
      delete: (imageUrl: string) => ({
        url: `images?imageUrl=${imageUrl}`,
      }),
    },
  },
  members: {
    post: {
      signUp: (data: ProfileSetupDataInterface) => ({
        url: 'members',
        data,
      }),
      login: (data: LoginDataInterface) => ({
        url: 'login',
        data,
      }),
      logout: () => ({
        url: 'logout',
      }),
    },
  },
  auth: {
    post: {
      refreshToken: () => ({
        url: 'refresh',
      }),
    },
  },
  post: {
    get: {
      posts: (postId: number) => ({
        url: `posts/${postId}`,
      }),
      needhelp: ({
        page,
        size,
        sortBy,
        direction,
        keyword,
        majorCategory,
      }: RequestHelpPostListInterface) => ({
        url: `posts?boardType=NEED_HELP&majorCategory=${majorCategory}&keyword=${keyword}&page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
      }),
      free: ({ page, size, sortBy, direction, keyword, tag }: RequestFreePostListInterface) => ({
        url: `posts?boardType=FREE&tag=${tag}&keyword=${keyword}&page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
      }),
      weeklyhot: () => ({
        url: `posts/weeklyhot`,
      }),
      dailyhot: () => ({
        url: `posts/dailyhot`,
      }),
      my: (page: number, boardType: string) => ({
        url: `posts/my?page=${page}&boardType=${boardType}`,
      }),
      bookmark: (page: number, boardType: string) => ({
        url: `posts/bookmark?page=${page}&boardType=${boardType}`,
      }),
    },
    post: {
      needhelp: (data: PostingDataInterface) => ({
        url: 'posts/needhelp',
        data,
      }),
      free: (data: PostingDataInterface) => ({
        url: 'posts/free',
        data,
      }),
      report: (postId: number) => ({
        url: `posts/${postId}/report`,
      }),
      bookmark: (postId: number) => ({
        url: `posts/${postId}/bookmark`,
      }),
      like: (postId: number) => ({
        url: `posts/${postId}/recommend`,
      }),
    },
    delete: {
      deletePost: (postId: number) => ({
        url: `posts/${postId}`,
      }),
    },
  },
  comment: {
    get: {
      replies: (
        postId: number,
        page: number,
        size: number,
        sortBy = 'createAt',
        direction = 'DESC',
      ) => ({
        url: `posts/${postId}/replies?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
      }),
    },
    post: {
      replies: (postId: number, content: string) => ({
        url: 'replies',
        data: { postId, content },
      }),
    },
  },
  chat: {
    get: {
      chatrooms: ({ page }: RequestChatRoomListInterface) => ({
        url: `chat/rooms?page=${page}&size=10&sortBy=createAt&direction=DESC`,
      }),
      messages: ({ chatroomId, page }: RequestMessageListInterface) => ({
        url: `chat/rooms/${chatroomId}/messages?${page}&size=10&sortBy=createAt&direction=DESC`,
      }),
    },
    post: {
      chatroom: ({ memberId }: RequestChatRoomCreateInterface) => ({
        url: 'chat/rooms',
        data: { memberId },
      }),
    },
    delete: {
      chatroom: ({ chatroomId }: RequestChatRoomDeleteInterface) => ({
        url: `chat/rooms/${chatroomId}`,
      }),
    },
  },
};
