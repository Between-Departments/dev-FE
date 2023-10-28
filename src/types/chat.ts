export interface ChatRoomListInterface {
  dataList: ChatRoomInterface[];
  size: number;
  hasNext: boolean;
}
export interface ChatRoomInterface {
  chatRoomId: number;
  member: { memberId: string; nickname: string; imageUrl: string };
  recentChatMessage: MessageInterface;
  notReadCount: boolean;
}

export interface RequestChatRoomListInterface {
  page: number;
}
export interface RequestChatRoomCreateInterface {
  memberId: string;
}
export interface RequestChatRoomDeleteInterface {
  roomId: number;
}

export interface MessageListInterface {
  dataList: MessageInterface[];
  size: number;
  hasNext: boolean;
}
export interface MessageInterface {
  chatMessageId: number;
  sender: string; // nickname
  content: string;
  createAt: string;
}
export interface RequestMessageListInterface {
  roomId: number;
  page: number;
}

export interface PageStatusInterface {
  page: number;
  hasNext: boolean;
}
export interface ChatModalStatusInterface {
  roomId: number;
}
