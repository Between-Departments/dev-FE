import React from 'react';
import styled from 'styled-components';
import { ChatRoomInterface } from '../../types/chat';
import { colors } from '@/constants/colors';
import DefaultProfile from '@/public/images/default_profile.svg';
import { formatTimeAgo } from '@/utils/post/post';
import MessageNickname from './MessageNickname';
import DeleteIcon from '@/public/images/ui/delete_fill.svg';
import useModalStore from '@/store/modalStore';
import { imageStyle } from '@/styles/styles';
import { MODAL_TYPES } from '@/types/modal';
import { deleteChatRoom } from '@/services/chat';
import toast from 'react-hot-toast';

interface Props {
  chatRoom: ChatRoomInterface;
  refetch: () => void;
}

const ChatRoomItem = ({
  chatRoom: {
    chatRoomId,
    member: { imageUrl = DefaultProfile, nickname },
    recentChatMessage: { content, createAt },
    existNotRead,
  },
  refetch,
}: Props) => {
  const { openModal, closeModal } = useModalStore();

  const deleteChatRoomHandler = async () => {
    closeModal();
    const response = await deleteChatRoom({ roomId: chatRoomId });
    if (response) {
      refetch();
      toast.success('채팅이 삭제되었어요.', { id: 'deleteChatRoom' });
    }
  };

  const deleteChatModalHandler = () => {
    openModal({
      modalType: MODAL_TYPES.ALERT,
      modalProps: {
        title: `${nickname}님과의 채팅을 삭제하시겠습니까?`,
        content: '삭제하면 채팅 내역이 모두 사라지며 복구할 수 없어요',
        confirmText: '삭제',
        onConfirmHandler: deleteChatRoomHandler,
      },
    });
  };

  const openChatModalHandler = () => {
    openModal({ modalType: MODAL_TYPES.CHAT, modalProps: { url: chatRoomId, image: imageUrl } });
  };

  return (
    <Layout>
      <ChatRoomItemLayout onClick={openChatModalHandler}>
        <ProfileContainer>
          <ImageWrapper>
            <img src={imageUrl} alt='your_profile' />
          </ImageWrapper>
          {existNotRead && <UnreadIcon />}
        </ProfileContainer>
        <MessageContainer>
          <MessageNickname nickname={nickname} />
          <MessageContent>{content}</MessageContent>
          <ChatTime>{formatTimeAgo(createAt)}</ChatTime>
        </MessageContainer>
      </ChatRoomItemLayout>
      <DeleteButton onClick={deleteChatModalHandler}>
        <img src={DeleteIcon} alt='delete_icon' />
      </DeleteButton>
    </Layout>
  );
};
export default ChatRoomItem;

const Layout = styled.div`
  position: relative;
`;

const ChatRoomItemLayout = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2rem 1.8rem;
  gap: 0.8rem;
  border-radius: 0.8rem;
  background: ${colors.white};
  &:hover {
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);
  }
  &:active {
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled.div`
  flex: none;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  background-color: ${colors.third};
  ${imageStyle}
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  overflow: hidden;
`;

const MessageContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 6.5rem;
  color: ${colors.gray6};
  font-size: 14px;
`;
const ChatTime = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 1.8rem;
  color: ${colors.gray6};
  font-size: 12px;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1;
  width: 2rem;
  height: 2rem;
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const UnreadIcon = styled.div`
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  z-index: 1;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${colors.error};
`;
