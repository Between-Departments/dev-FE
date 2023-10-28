import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useObserver from '../../hooks/useObserver';
import ChatRoomItem from './ChatRoomItem';
import { ChatRoomInterface, PageStatusInterface } from '../../types/chat';
import { getChatRoomList } from '@/api/services/chat';
import { colors } from '@/constants/colors';

type Props = {
  chatRoomClick: (roomId: number) => void;
};

const ChatRoomList = ({ chatRoomClick }: Props) => {
  const [{ page, hasNext }, setPage] = useState<PageStatusInterface>({ page: 1, hasNext: true });
  const [chatRoomList, setChatRoomList] = useState<ChatRoomInterface[]>([]);
  const infinityRef = useObserver(() => nextPageHandler());
  const [loading, setLoading] = useState<boolean>(false);

  const nextPageHandler = () => {
    if (!hasNext || loading || page === 0) return;
    setPage((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    if (!hasNext || loading || page === 0) return;
    setLoading(true);
    getChatRoomList({ page })
      .then((data) => {
        setPage((prev) => ({ ...prev, hasNext: data.hasNext }));
        setChatRoomList((prev) => [...prev, ...data.dataList]);
      })
      .catch(() => {
        setPage({ page: 0, hasNext: false });
      });
    setLoading(false);
  }, [page, hasNext]);

  return (
    <>
      <ChatRoomContainer>
        {chatRoomList.map((chatRoom, index) => (
          <ChatRoomItem
            key={index}
            chatRoom={chatRoom}
            chatRoomClick={() => chatRoomClick(chatRoom.chatRoomId)}
          />
        ))}
        {!loading && hasNext && <div ref={infinityRef} style={{ height: '1px' }}></div>}
      </ChatRoomContainer>
    </>
  );
};
export default ChatRoomList;

const ChatRoomContainer = styled.div`
  width: 100%;
  display: flex;
  /* position: relative; */
  flex-direction: column;
  padding: 0 2rem;
  gap: 0.8rem;
  background-color: ${colors.pastel};
`;
