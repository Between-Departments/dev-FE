import React from 'react';
import { PostProps } from '../../types/post';
import BoldContent from '../search/BoldContent';
import { formatTime, getContentSnippet } from '../../utils/post/post';
import PostCountBox from './postItem/PostCountBox';
import PostImagesBoxSmall from './postItem/PostImagesBoxSmall';
import { majorToKoreaMapping } from '@/constants/majorCategory';
import { useLocation, useNavigate } from 'react-router-dom';
import { LINK } from '@/constants/links';
import {
  Contents,
  Footer,
  Header,
  Layout,
  LayoutWrapper,
  MajorBox,
  TimeBox,
  Title,
} from '@/styles/post';
import PostButtonBox from './postItem/PostButtonBox';

const HelpPost = ({
  post: {
    postId,
    title,
    content,
    viewCount,
    recommendCount,
    replyCount,
    createAt,
    thumbnailImages = [],
    majorCategory = 'ETC',
    isBookmarked = true, // 백엔드 데이터 없음
  },
  keyword,
}: PostProps) => {
  const contentSnippet = getContentSnippet(content, keyword);
  const location = useLocation();
  const isMyPage = location.pathname.includes(LINK.MYPAGE);
  const navigate = useNavigate();

  const postClickHandler = () => {
    navigate(`${LINK.POST}/${postId}`);
  };

  return (
    <LayoutWrapper>
      {isMyPage && <PostButtonBox postId={postId} isBookMarked={isBookmarked} />}
      <Layout onClick={postClickHandler}>
        <Header>
          <MajorBox>{majorToKoreaMapping[majorCategory]}</MajorBox>
        </Header>
        <Footer>
          <Title>{keyword ? <BoldContent keyword={keyword} content={title} /> : title}</Title>
          <TimeBox>{formatTime(createAt)}</TimeBox>
        </Footer>
        <Contents>
          {keyword ? <BoldContent keyword={keyword} content={contentSnippet} /> : contentSnippet}
        </Contents>
        <Footer>
          <PostImagesBoxSmall images={thumbnailImages} />
          <PostCountBox
            recommendCount={recommendCount}
            replyCount={replyCount}
            viewCount={viewCount}
          />
        </Footer>
      </Layout>
    </LayoutWrapper>
  );
};
export default HelpPost;
