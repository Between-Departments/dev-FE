import React from 'react';
import styled from 'styled-components';
import NewPost from './NewPost';
import { colors } from '@/constants/colors';
import useMainPosts from '@/hooks/useMainPosts';
import ErrorContent from '../public/ErrorContent';

const NewPostList = () => {
  const { dailyHotPosts } = useMainPosts();

  return (
    <Layout>
      <PostListLayout>
        {dailyHotPosts?.length === 0 && <ErrorContent style={{ padding: '0' }} type='dailyHot' />}
        {dailyHotPosts?.map((post) => <NewPost post={post} key={post.postId} />)}
      </PostListLayout>
    </Layout>
  );
};

export default NewPostList;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostListLayout = styled.div`
  display: flex;
  min-height: 18.5rem;
  max-height: 18.5rem;
  gap: 1.2rem;
  padding: 0 2rem 2rem 2rem;
  overflow-x: scroll;
  scrollbar-width: thin;
  scrollbar-color: ${colors.secondary} ${colors.white};
  &::-webkit-scrollbar {
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.secondary};
    border-radius: 9rem;
  }
  &::-webkit-scrollbar-track {
    background-color: ${colors.white};
    border-radius: 9rem;
    margin: 0 2rem;
  }
`;
