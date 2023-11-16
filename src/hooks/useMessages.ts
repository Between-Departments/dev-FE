import { useInfiniteQuery, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { getMessageList } from '@/services/chat';
import { MessageListInterface } from '@/types/chat';

interface MessagesQueryResponse extends MessageListInterface {
  nextPage: number | null;
}

interface UseMessagesQueryReturnType {
  data: InfiniteData<MessagesQueryResponse> | undefined;
  moreDataHandler: () =>
    | Promise<InfiniteQueryObserverResult<InfiniteData<MessagesQueryResponse, unknown>, Error>>
    | undefined;
  isFetching: boolean;
}

const useMessages = (roomId: number): UseMessagesQueryReturnType => {
  const fetchMessages = async (pageParam = 1) => {
    const response = await getMessageList({
      roomId,
      page: pageParam,
    });

    const reverseResponse = {
      ...response,
      dataList: response.dataList.reverse(),
    };

    return {
      ...reverseResponse,
      nextPage: response.hasNext ? pageParam + 1 : null,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<MessagesQueryResponse>({
    queryKey: [QUERY_KEY_MESSAGE],
    queryFn: ({ pageParam }) => fetchMessages(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: STALE_TIME_MESSAGE,
  });

  const moreDataHandler = () => {
    if (hasNextPage) {
      return fetchNextPage();
    }
  };

  return { data, moreDataHandler, isFetching };
};

export const QUERY_KEY_MESSAGE = 'Messages';
export const STALE_TIME_MESSAGE = 1000 * 60 * 1; // 1분

export default useMessages;
