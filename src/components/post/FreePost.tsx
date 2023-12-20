import React from 'react';
import { PostProps } from '../../types/post';
import BoldContent from '../search/BoldContent';
import { formatTime, getContentSnippet } from '../../utils/post/post';
import PostCountBox from './postItem/PostCountBox';
import ProfileBox from './postItem/ProfileBox';
import PostImagesBoxSmall from './postItem/PostImagesBoxSmall';
import { LINK } from '@/constants/links';
import { useLocation, useNavigate } from 'react-router-dom';
import { Contents, Footer, Header, Layout, LayoutWrapper, TimeBox, Title } from '@/styles/post';
import PostButtonBox from './postItem/PostButtonBox';
import useUser from '@/hooks/useUser';

const FreePost = ({
  post: {
    postId,
    writer,
    title,
    content,
    viewCount,
    recommendCount,
    replyCount,
    createAt,
    thumbnailImages = [],
    isBookmarked = true,
  },
  keyword,
}: PostProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyPage = location.pathname.includes(LINK.MYPAGE);
  const isMyPost = location.pathname.includes(LINK.MY_POSTS);
  const { user } = useUser();
  const myNickname = user?.nickname;
  const myImageUrl = user?.imageUrl;
  const contentSnippet = getContentSnippet(content, keyword);

  const postClickHandler = () => {
    navigate(`${LINK.POST}/${postId}`);
  };

  return (
    <LayoutWrapper>
      {isMyPage && <PostButtonBox postId={postId} isBookMarked={isBookmarked} />}
      <Layout onClick={postClickHandler}>
        <Header>
          {isMyPost ? (
            <ProfileBox writer={myNickname} profileImage={myImageUrl} />
          ) : (
            <ProfileBox writer={writer?.nickname} profileImage={writer?.imageUrl} />
          )}
          {!isMyPage && <TimeBox>{formatTime(createAt)}</TimeBox>}
        </Header>
        <Title>{keyword ? <BoldContent keyword={keyword} content={title} /> : title}</Title>
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
export default FreePost;
