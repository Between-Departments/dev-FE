import React from 'react';
import styled from 'styled-components';
import { colors } from '@/constants/colors';

interface UserInterestIconInterface {
  postId: number;
  icon: string;
  value: number;
  likePostHandler: (postId: number) => void;
}

const UserInterestIcon = ({ postId, icon, value, likePostHandler }: UserInterestIconInterface) => {
  return (
    <UserInterestIconLayout onClick={() => likePostHandler(postId)}>
      <IconWrapper>
        <IconImage src={icon} alt='interest_button_icon' />
      </IconWrapper>
      <Value>{value}</Value>
    </UserInterestIconLayout>
  );
};

export default UserInterestIcon;

const UserInterestIconLayout = styled.div`
  height: 3.5rem;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 900px;
  background-color: ${colors.pastel};
`;

const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  overflow: hidden;
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Value = styled.p`
  font-size: 16px;
  font-weight: 400;
  font-family: 'SUIT';
  line-height: 24px;
  color: ${colors.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
