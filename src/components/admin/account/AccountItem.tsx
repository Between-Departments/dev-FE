import React from 'react';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import useModalStore from '@/store/modalStore';
import { MODAL_TYPES } from '@/types/modal';
import { deleteAccount, lockAccount } from '@/services/admin';
import { AccountInterface } from '@/types/admin';
import ProfileBox from '@/components/post/postItem/ProfileBox';
import { formatTime } from '@/utils/post/post';
import toast from 'react-hot-toast';

const AccountItem = ({
  memberId,
  mail,
  nickname,
  imageUrl,
  createAt,
  locked,
}: AccountInterface) => {
  const { openModal, closeModal } = useModalStore();

  const lockAccountHandler = async () => {
    const response = await lockAccount(memberId);
    if (response) {
      toast.success('해당 계정이 정지 처리 되었어요.', { id: 'lockAccountSuccess' });
    } else {
      toast.error('정지 요청 처리중 오류가 발생했어요.', { id: 'lockAccountError' });
    }
    closeModal();
  };

  const lockModalHandler = () => {
    if (locked) {
      openModal({
        modalType: MODAL_TYPES.ALERT,
        modalProps: {
          title: '해당 계정의 영구정지를 해제하시겠어요?',
          content: '해당 계정은 정상적으로 이용 가능 상태가 돼요',
          confirmText: '해제',
          onConfirmHandler: lockAccountHandler,
        },
      });
    } else {
      openModal({
        modalType: MODAL_TYPES.ALERT,
        modalProps: {
          title: '해당 계정을 영구정지 처리하시겠어요?',
          content: '해당 계정은 영구적으로 이용 불가 상태가 돼요',
          confirmText: '정지',
          onConfirmHandler: lockAccountHandler,
        },
      });
    }
  };

  const deleteAccountHandler = async () => {
    const response = await deleteAccount(memberId);
    if (response) {
      toast.success('해당 계정이 탈퇴 처리 되었어요.', { id: 'deleteAccountSuccess' });
    } else {
      toast.error('탈퇴 요청 처리중 오류가 발생했어요.', { id: 'deleteAccountError' });
    }
    closeModal();
  };

  const deleteModalHandler = () => {
    openModal({
      modalType: MODAL_TYPES.ALERT,
      modalProps: {
        title: `해당 계정을 탈퇴 처리하시겠습니까?`,
        content: '해당 계정과 관련된 모든 정보가 삭제되며 복구할 수 없어요',
        confirmText: '탈퇴',
        onConfirmHandler: deleteAccountHandler,
      },
    });
  };

  return (
    <Layout>
      <Header>
        <ProfileBox writer={nickname} profileImage={imageUrl} />
        {locked && <LockText>영구정지</LockText>}
      </Header>
      <Contents>
        <Email>{mail}</Email>
        <Date>{formatTime(createAt)} 가입</Date>
      </Contents>
      <Footer>
        <Button $active={!locked} onClick={lockModalHandler}>
          영구정지
        </Button>
        <Button $active={true} onClick={deleteModalHandler}>
          탈퇴
        </Button>
      </Footer>
    </Layout>
  );
};
export default AccountItem;

const Layout = styled.div`
  padding: 1.4rem 1.6rem;
  border-radius: 0.8rem;
  background: ${colors.white};
  box-shadow: 0px 4px 16px 0px rgba(100, 100, 100, 0.1);
`;

const Header = styled.div`
  display: flex;
  gap: 1rem;
`;
const LockText = styled.div`
  height: 2rem;
  padding: 0.1rem 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 1px solid ${colors.primary};
  background: ${colors.white};
  font-size: 12px;
  color: ${colors.primary};
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.6rem 0 1.7rem 2.4rem;
`;
const Email = styled.div`
  font-size: 14px;
  color: ${colors.gray6};
`;
const Date = styled.div`
  font-size: 12px;
  color: ${colors.gray7};
`;

const Footer = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const Button = styled.button<{ $active: boolean }>`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 3.6rem;
  padding: 1rem 1.6rem;
  justify-content: center;
  align-items: center;
  border-radius: 2.4rem;
  border: none;
  background: ${({ $active }) => ($active ? colors.primary : colors.gray1)};
  color: ${({ $active }) => ($active ? colors.white : colors.gray5)};
  font-size: 14px;
  font-weight: 700;
`;
