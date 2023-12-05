import SockJS from 'sockjs-client';
import { Client, StompSubscription } from '@stomp/stompjs';
import { NotificationData } from '@/types/notification';
import { URL } from '@/constants/url';
import { useAddNotification, useSetHasPendingNotifications } from '@/store/notificateStore';
import { useChatMessageStore } from '@/store/chatMessageStore';

export class WebSocketService {
  private client: Client;
  private connected: boolean = false;
  private chatSubscription: StompSubscription | undefined = undefined;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(URL.API_BASE_URL + 'ws-endpoint'),
      onConnect: () => {
        this.connected = true;
        this.subscribeToNotificationsAndChat();
        console.log('STOMP 연결 성공');
      },
      onDisconnect: () => {
        this.connected = false;
      },
    });

    this.client.onStompError = (err) => {
      console.error('STOMP 에러 : ', err);
    };
  }

  private subscribeToNotificationsAndChat(): void {
    this.client.subscribe('/user/sub/notifications', (message) => {
      if (message.body) {
        const notification: NotificationData = JSON.parse(message.body);

        useAddNotification()(notification);
        useSetHasPendingNotifications()(true);
        if (notification.type === 'CHAT_MESSAGE') {
          useChatMessageStore.getState().setNewChatNotification(true);
        }
      }
    });
  }

  public setToken(token: string): void {
    this.client.configure({
      connectHeaders: {
        Authorization: token,
      },
    });
  }

  public connect(): void {
    if (!this.connected) {
      this.client.activate();
    }
  }

  public disconnect(): void {
    if (this.connected) {
      this.client.deactivate();
    }
  }

  public enterChatRoom(roomId: number): void {
    this.chatSubscription = this.client.subscribe(`/sub/chat/rooms/${roomId}`, (messages) => {
      if (messages.body) {
        const response = JSON.parse(messages.body);
        useChatMessageStore.getState().pushMessage(response);
        return response;
      }
    });
  }

  public exitChatRoom(): void {
    this.chatSubscription?.unsubscribe();
  }

  public sendMessage(roomId: number, message: string): void {
    this.client.publish({
      destination: `/pub/chat/rooms/${roomId}`,
      body: JSON.stringify({ content: message }),
    });
  }
}
