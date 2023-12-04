import { useEffect } from 'react';
import {
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { getCommentsData } from '@/services/comments';
import { CommentsDataInterface } from '@/types/comment';

export interface CommentQueryResponse extends CommentsDataInterface {
  nextPage: number | null;
}

interface UseCommentQueryReturnType {
  data: InfiniteData<CommentQueryResponse> | undefined;
  moreDataHandler: () =>
    | Promise<InfiniteQueryObserverResult<InfiniteData<CommentQueryResponse, unknown>, Error>>
    | undefined;
}

const COMMENTS_PER_PAGE = 10;
export const QUERY_KEY = 'comments';

const useCommentQuery = (postId: number): UseCommentQueryReturnType => {
  const queryClient = useQueryClient();

  // 컴포넌트가 언마운트 되는 시점에 쿼리 삭제
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY, postId] });
    };
  }, [postId, queryClient]);

  const fetchComments = async (pageParam = 1) => {
    const response = await getCommentsData(postId, pageParam, COMMENTS_PER_PAGE);

    return {
      ...response,
      nextPage: response.hasNext ? pageParam + 1 : null,
    };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<CommentQueryResponse>({
    queryKey: [QUERY_KEY, postId],
    queryFn: ({ pageParam }) => fetchComments(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 1,
  });

  const moreDataHandler = () => {
    if (hasNextPage) {
      return fetchNextPage();
    }
  };

  return { data, moreDataHandler };
};

export default useCommentQuery;
