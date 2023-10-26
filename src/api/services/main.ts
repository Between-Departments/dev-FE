import { PostList } from '@/types/post';
import { httpClient } from '../httpClient';

export const getWeeklyHotPostList = async (): Promise<PostList> => {
  const response = await httpClient.post.get.weeklyhot();
  return response.data;
};

export const getDailyHotPostList = async (): Promise<PostList> => {
  const response = await httpClient.post.get.dailyhot();
  return response.data;
};

export const getHelpPostListByMain = async (): Promise<PostList> => {
  const response = await httpClient.post.get.needhelp({
    page: 1,
    size: 3,
    sortBy: 'createAt',
    direction: 'DESC',
    keyword: '',
    majorCategory: '',
  });
  return response.data;
};

export const getFreePostListByMain = async (tag: string): Promise<PostList> => {
  const response = await httpClient.post.get.free({
    page: 1,
    size: 3,
    sortBy: 'createAt',
    direction: 'DESC',
    keyword: '',
    tag,
  });
  return response.data;
};
