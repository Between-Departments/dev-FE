import { PostingDataInterface } from '@/types/posting';
import { ProfileSetupDataInterface, LoginDataInterface } from '../types/types';
import { RequestFreePostListInterface, RequestHelpPostListInterface } from '@/types/post';
import {
  RequestChatRoomCreateInterface,
  RequestChatRoomDeleteInterface,
  RequestChatRoomListInterface,
  RequestMessageListInterface,
} from '@/types/chat';
import {
  RequestAccountListInterface,
  RequestReportDetailInterface,
  RequestReportListInterface,
} from '@/types/admin';
import { ReportDataInterface } from '@/types/report';
import {
  DeleteUserInterface,
  EditMajorInterface,
  EditPasswordInterface,
  EditSchoolInterface,
  EditUserInterface,
} from '@/types/user';

export const apiMethods = {
  search: {
    get: {
      school: (keyword: string) => ({
        url: 'schools',
        params: { keyword },
      }),
      major: (keyword: string) => ({
        url: 'majors',
        params: { keyword },
      }),
    },
  },
  mail: {
    get: {
      duplicate: (mail: string) => ({
        url: 'members/mail/duplicate',
        params: { mail },
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
        url: 'images',
        params: { imageUrl },
      }),
    },
  },
  members: {
    get: {
      myData: () => ({
        url: 'members/my',
      }),
    },
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
    patch: {
      myInfo: (data: EditUserInterface) => ({
        url: 'members/my/image',
        data,
      }),
      password: (data: EditPasswordInterface) => ({
        url: 'members/my/password',
        data,
      }),
      school: (data: EditSchoolInterface) => ({
        url: 'members/my/school',
        data,
      }),
      major: (data: EditMajorInterface) => ({
        url: 'members/my/major',
        data,
      }),
    },
    delete: {
      member: (data: DeleteUserInterface) => ({
        url: 'members/my',
        data,
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
        url: 'posts',
        params: {
          boardType: 'NEED_HELP',
          majorCategory,
          keyword,
          page,
          size,
          sortBy,
          direction,
        },
      }),
      free: ({ page, size, sortBy, direction, keyword, tag }: RequestFreePostListInterface) => ({
        url: 'posts',
        params: {
          boardType: 'FREE',
          tag,
          keyword,
          page,
          size,
          sortBy,
          direction,
        },
      }),
      weeklyhot: () => ({
        url: `posts/weeklyhot`,
      }),
      dailyhot: () => ({
        url: `posts/dailyhot`,
      }),
      myPosts: (page: number, boardType: string) => ({
        url: 'posts/my',
        params: { page, boardType },
      }),
      myBookmarks: (page: number, boardType: string) => ({
        url: 'posts/bookmarks',
        params: { page, boardType },
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
      report: (postId: number, data: ReportDataInterface) => ({
        url: `posts/${postId}/report`,
        data,
      }),
    },
    patch: {
      edit: (postId: number, data: PostingDataInterface) => ({
        url: `posts/${postId}`,
        data,
      }),
      like: (postId: number) => ({
        url: `posts/${postId}/recommend`,
      }),
      bookmark: (postId: number) => ({
        url: `posts/${postId}/bookmark`,
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
        url: `posts/${postId}/replies`,
        params: {
          page,
          size,
          sortBy,
          direction,
        },
      }),
      myReplies: (
        page: number,
        size: number,
        boardType: string,
        sortBy = 'createAt',
        direction = 'DESC',
      ) => ({
        url: 'replies/my',
        params: {
          page,
          size,
          boardType,
          sortBy,
          direction,
        },
      }),
    },
    post: {
      reply: (postId: number, content: string) => ({
        url: 'replies',
        data: { postId, content },
      }),
      report: (replyId: number, data: ReportDataInterface) => ({
        url: `replies/${replyId}/report`,
        data,
      }),
    },
    patch: {
      reply: (replyId: number, content: string) => ({
        url: `replies/${replyId}`,
        data: { content },
      }),
      like: (replyId: number) => ({
        url: `replies/${replyId}/recommend`,
      }),
    },
    delete: {
      reply: (replyId: number) => ({
        url: `replies/${replyId}`,
      }),
    },
  },
  chat: {
    get: {
      chatrooms: ({ page }: RequestChatRoomListInterface) => ({
        url: 'chat/rooms',
        params: {
          page,
          size: '10',
          sortBy: 'rcm.createAt',
          direction: 'DESC',
        },
      }),
      messages: ({ roomId, page }: RequestMessageListInterface) => ({
        url: `chat/rooms/${roomId}/messages`,
        params: {
          page,
          size: '10',
          sortBy: 'createAt',
          direction: 'DESC',
        },
      }),
    },
    post: {
      chatroom: ({ memberId }: RequestChatRoomCreateInterface) => ({
        url: 'chat/rooms',
        data: { memberId },
      }),
    },
    delete: {
      chatroom: ({ roomId }: RequestChatRoomDeleteInterface) => ({
        url: `chat/rooms/${roomId}`,
      }),
    },
  },
  notification: {
    get: {
      notification: () => ({
        url: 'notifications',
      }),
      newBeforeLogin: () => ({
        url: 'notifications/new',
      }),
    },
    delete: {
      notification: (notificationId: number) => ({
        url: `notifications/${notificationId}`,
      }),
      allNotifications: (notificationIds: number[]) => ({
        url: 'notifications',
        data: { notificationIds },
      }),
    },
  },
  report: {
    get: {
      postList: ({ page, size, sortBy, direction }: Partial<RequestReportListInterface>) => ({
        url: 'posts/report',
        params: {
          page,
          size,
          sortBy,
          direction,
        },
      }),
      replyList: ({ page, size, sortBy, direction }: Partial<RequestReportListInterface>) => ({
        url: 'replies/report',
        params: {
          page,
          size,
          sortBy,
          direction,
        },
      }),
      post: ({ id, page, size, sortBy, direction }: Partial<RequestReportDetailInterface>) => ({
        url: `posts/${id}/report`,
        params: {
          page,
          size,
          sortBy,
          direction,
        },
      }),
      reply: ({ id, page, size, sortBy, direction }: Partial<RequestReportDetailInterface>) => ({
        url: `replies/${id}/report`,
        params: {
          page,
          size,
          sortBy,
          direction,
        },
      }),
    },
    delete: {
      post: (id: number, reportId: number) => ({
        url: `posts/${id}/report/${reportId}`,
      }),
      reply: (id: number, reportId: number) => ({
        url: `replies/${id}/report/${reportId}`,
      }),
    },
  },
  account: {
    get: {
      accountList: ({ keyword, page, size, sortBy, direction }: RequestAccountListInterface) => ({
        url: 'members',
        params: {
          keyword,
          page,
          size,
          sortBy,
          direction,
        },
      }),
    },
    delete: {
      account: (memberId: number) => ({
        url: `members/${memberId}`,
      }),
    },
    patch: {
      account: (memberId: number) => ({
        url: `members/${memberId}/lock`,
      }),
    },
  },
};
