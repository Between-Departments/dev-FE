import { httpClient } from '@/api/httpClient';
import { LoginDataInterface } from '@/types/types';
import {
  DeleteUserInterface,
  EditUserInterface,
  UserDataInterface,
  EditPasswordInterface,
  EditSchoolInterface,
  EditMajorInterface,
} from '@/types/user';

export const getToken = async (data: LoginDataInterface): Promise<string> => {
  const response = await httpClient.members.post.login(data);
  return response.headers['authorization'];
};

export const postLogout = async (): Promise<void> => {
  await httpClient.members.post.logout();
};

export const getUserData = async (): Promise<UserDataInterface> => {
  const response = await httpClient.members.get.myData();
  const userData: UserDataInterface = response.data;

  return userData;
};

export const patchUserInfo = async (data: EditUserInterface): Promise<EditUserInterface> => {
  const response = await httpClient.members.patch.myInfo(data);
  const updatedUserInfo: EditUserInterface = response.data;

  return updatedUserInfo;
};

export const patchPassword = async (data: EditPasswordInterface): Promise<void> => {
  await httpClient.members.patch.password(data);
};

export const patchSchool = async (data: EditSchoolInterface): Promise<void> => {
  await httpClient.members.patch.school(data);
};

export const patchMajor = async (data: EditMajorInterface): Promise<void> => {
  await httpClient.members.patch.major(data);
};

export const deleteUser = async (data: DeleteUserInterface): Promise<void> => {
  await httpClient.members.delete.member(data);
};
