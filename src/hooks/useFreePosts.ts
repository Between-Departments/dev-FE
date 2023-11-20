import { useInfiniteQuery, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { FreePostListProps, PostListInterface } from '@/types/post';
import { getFreePostList } from '@/services/post';

export interface FreePostQueryResponse extends PostListInterface {
  nextPage: number | null;
}
interface UseFreePostQueryReturnType {
  data: InfiniteData<FreePostQueryResponse> | undefined;
  moreDataHandler: () =>
    | Promise<InfiniteQueryObserverResult<InfiniteData<FreePostQueryResponse, unknown>, Error>>
    | undefined;
  isFetching: boolean;
}

const useFreePosts = ({ tag, keyword, filter }: FreePostListProps): UseFreePostQueryReturnType => {
  const fetchPosts = async (pageParam = 1) => {
    const response = await getFreePostList({
      tag,
      page: pageParam,
      keyword,
      sortBy: filter?.sortBy,
      direction: filter?.direction,
    });

    return {
      ...response,
      nextPage: response.hasNext ? pageParam + 1 : null,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<FreePostQueryResponse>({
    queryKey: [QUERY_KEY_FREE, keyword, tag, filter?.sortBy, filter?.direction],
    queryFn: ({ pageParam }) => fetchPosts(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: STALE_TIME_DEFAULT,
  });

  const moreDataHandler = () => {
    if (hasNextPage) {
      return fetchNextPage();
    }
  };

  return { data, moreDataHandler, isFetching };
};

export const QUERY_KEY_FREE = 'freePost';
export const STALE_TIME_DEFAULT = 1000 * 60 * 5;

export default useFreePosts;
