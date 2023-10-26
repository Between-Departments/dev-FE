import React from 'react';
import styled from 'styled-components';
import { PostProps } from '../../types/post';
import BoldContent from '../search/BoldContent';
import { formatTime, getContentSnippet } from '../../utils/post';
import PostCountBox from './postItem/PostCountBox';
import PostImagesBoxSmall from './postItem/PostImagesBoxSmall';
import { colors } from '@/constants/colors';
import { majorToKoreaMapping } from '@/constants/majorCategory';
import { useLocation, useNavigate } from 'react-router-dom';
import { LINK } from '@/constants/links';

const HelpPost = ({
  post: {
    postId,
    title,
    content,
    viewCount,
    recommendCount,
    replyCount,
    createAt,
    thumbnailImages,
  },
  keyword,
}: PostProps) => {
  const contentSnippet = getContentSnippet(content, keyword);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout onClick={() => navigate(`${LINK.POST}/${postId}`)}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${colors.gray2}`,
        }}
      >
        <MajorBox>{majorToKoreaMapping['MEDICAL']}</MajorBox>
        <div>{location.pathname !== '/main' ? <button /> : null}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>{keyword ? <BoldContent keyword={keyword} content={title} /> : title}</Title>
        <TimeBox>{formatTime(createAt)}</TimeBox>
      </div>
      <Contents>
        {keyword ? <BoldContent keyword={keyword} content={contentSnippet} /> : contentSnippet}
      </Contents>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <PostImagesBoxSmall images={thumbnailImages} />
        <PostCountBox
          recommendCount={recommendCount}
          replyCount={replyCount}
          viewCount={viewCount}
        />
      </div>
    </Layout>
  );
};
export default HelpPost;

const Layout = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 1.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border-radius: 0.8rem;
  background: ${colors.white};
  &:hover {
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);
    scale: 1.01;
  }
  &:active {
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);
    scale: 1.01;
  }
`;
const Title = styled.div`
  color: ${colors.black};
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 2rem;
  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray6};
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const Contents = styled.div`
  min-height: 4.4rem;
  color: ${colors.gray6};
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const MajorBox = styled.div`
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${colors.gray6};
`;
