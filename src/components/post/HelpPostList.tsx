import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LINK } from '../../constants/links';
import HelpPost from '../../components/post/HelpPost';
import useObserver from '../../hooks/useObserver';
import { HelpPostListProps } from '../../types/post';
import HelpPostMedium from './HelpPostMedium';
import useHelpPosts from '@/hooks/useHelpPosts';
import LoadingContent from '../public/LoadingContent';

const HelpPostList = ({ major, keyword }: HelpPostListProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostListPage = location.pathname.includes(LINK.POST);
  const { data, moreDataHandler, isFetching } = useHelpPosts({ major, keyword });
  const loadMoreRef = useObserver(() => moreDataHandler());

  return (
    <>
      {data?.pages.map((page) =>
        page.dataList.map((post) =>
          isPostListPage ? (
            <HelpPostMedium
              post={post}
              key={post.postId}
              onClick={() => navigate(`${LINK.POST}/${post.postId}`)}
            />
          ) : (
            <HelpPost
              keyword={keyword}
              post={post}
              key={post.postId}
              onClick={() => navigate(`${LINK.POST}/${post.postId}`)}
            />
          ),
        ),
      )}
      {isFetching ? <LoadingContent /> : <div ref={loadMoreRef} style={{ height: '1px' }}></div>}
    </>
  );
};
export default HelpPostList;
