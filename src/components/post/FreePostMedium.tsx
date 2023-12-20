import React from 'react';
import { PostProps } from '../../types/post';
import { formatTime } from '../../utils/post/post';
import PostCountBox from './postItem/PostCountBox';
import ProfileBox from './postItem/ProfileBox';
import PostImagesBoxMedium from './postItem/PostImagesBoxMedium';
import { useNavigate } from 'react-router-dom';
import { LINK } from '@/constants/links';
import { Contents, Footer, Header, Layout, TimeBox, Title } from '@/styles/post';

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
  },
}: PostProps) => {
  const navigate = useNavigate();

  return (
    <Layout onClick={() => navigate(`${LINK.POST}/${postId}`)}>
      <Header>
        <ProfileBox writer={writer?.nickname} profileImage={writer?.imageUrl} />
        <TimeBox>{formatTime(createAt)}</TimeBox>
      </Header>
      <Title>{title}</Title>
      <Contents>{content}</Contents>
      <PostImagesBoxMedium images={thumbnailImages} />
      <Footer>
        <div></div>
        <PostCountBox
          recommendCount={recommendCount}
          replyCount={replyCount}
          viewCount={viewCount}
        />
      </Footer>
    </Layout>
  );
};
export default FreePost;
