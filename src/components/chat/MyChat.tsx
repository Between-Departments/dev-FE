import React from 'react';
import styled from 'styled-components';
import { formatTimeAgo } from '../../utils/post';
import { ChatInterface } from '@/types/chat';
import { colors } from '@/constants/colors';

type Props = { chatContent: ChatInterface };

const MyChat = ({ chatContent }: Props) => {
  const { content, createdAt } = chatContent;
  return (
    <MyChatLayout>
      <ChatText>{content}</ChatText>
      <ChatDate>{formatTimeAgo(createdAt)}</ChatDate>
    </MyChatLayout>
  );
};
export default MyChat;

const MyChatLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;
const ChatText = styled.div`
  max-width: 100%;
  word-wrap: break-word;
  padding: 10px 16px;
  gap: 10px;

  border-radius: 16px 0px 16px 16px;
  background: #9c9c9c;

  color: ${colors.white};
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
const ChatDate = styled.div`
  color: #8f8f8f;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
`;
