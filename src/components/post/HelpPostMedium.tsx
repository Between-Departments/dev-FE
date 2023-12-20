import React from 'react';
import { PostProps } from '../../types/post';
import { formatTime } from '../../utils/post/post';
import PostCountBox from './postItem/PostCountBox';
import PostImagesBoxMedium from './postItem/PostImagesBoxMedium';
import { colors } from '@/constants/colors';
import { useNavigate } from 'react-router-dom';
import { LINK } from '@/constants/links';
import { majorToKoreaMapping } from '@/constants/majorCategory';
import { Contents, Footer, Header, Layout, MajorBox, TimeBox, Title } from '@/styles/post';

const HelpPostMedium = ({
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
  },
}: PostProps) => {
  const navigate = useNavigate();

  return (
    <Layout onClick={() => navigate(`${LINK.POST}/${postId}`)}>
      <Header>
        <MajorBox>{majorToKoreaMapping[majorCategory]}</MajorBox>
        <TimeBox style={{ color: colors.gray5 }}>{formatTime(createAt)}</TimeBox>
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
export default HelpPostMedium;
