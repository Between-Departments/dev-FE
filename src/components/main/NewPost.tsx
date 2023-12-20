import React from 'react';
import styled from 'styled-components';
import { PostInterface } from '../../types/post';
import { useNavigate } from 'react-router-dom';
import { LINK } from '../../constants/links';
import { formatTimeAgo } from '../../utils/post/post';
import { colors } from '@/constants/colors';
import { majorToKoreaMapping } from '@/constants/majorCategory';
import { Footer } from '@/styles/post';

const NewPost = ({
  post: { postId, title, createAt, majorCategory = 'ETC' },
}: {
  post: PostInterface;
}) => {
  const navigate = useNavigate();

  const postClickHandler = () => {
    navigate(`${LINK.POST}/${postId}`);
  };

  return (
    <Layout onClick={postClickHandler}>
      <div>
        <TagBox>HOT</TagBox>
      </div>
      <Title>{title}</Title>
      <Footer>
        <MajorBox>{majorToKoreaMapping[majorCategory]}</MajorBox>
        <TimeAgoBox>{formatTimeAgo(createAt)}</TimeAgoBox>
      </Footer>
    </Layout>
  );
};
export default NewPost;

const Layout = styled.div`
  cursor: pointer;
  width: 22em;
  min-width: 22rem;
  height: 16rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1.2rem;
  background: ${colors.white};
  box-shadow: 0px 4px 16px 0px rgba(100, 100, 100, 0.1);
  &:hover {
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);
  }
  &:active {
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);
  }
`;
const Title = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.6rem 0;
  color: #252424;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TagBox = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 0.8rem;
  background: ${colors.primary};
  color: ${colors.white};
  font-size: 12px;
`;

const TimeAgoBox = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.secondary};
  font-size: 12px;
`;
const MajorBox = styled.div`
  color: ${colors.gray6};
  font-size: 12px;
`;
