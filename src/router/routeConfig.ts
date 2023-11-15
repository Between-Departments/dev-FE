import React from 'react';
import { LINK } from '../constants/links';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignUpPage from '../pages/auth/SignUpPage';
import SignupCompletePage from '../pages/auth/SignupCompletePage';
import SearchPage from '../pages/search/SearchPage';
import ChatPage from '../pages/chat/ChatPage';
import MainPage from '../pages/main/MainPage';
import FreePostListPage from '../pages/post/FreePostListPage';
import HelpPostListPage from '../pages/post/HelpPostListPage';
import PostingPage from '@/pages/posting/PostingPage';
import PostDetailPage from '@/pages/post/PostDetailPage';
import DeclarePage from '@/pages/admin/declare/DeclarePage';
import AccountPage from '@/pages/admin/account/AccountPage';
import DeclarePostPage from '@/pages/admin/declare/DeclarePostPage';
import DeclareReplyPage from '@/pages/admin/declare/DeclareReplyPage';
import MyPage from '@/pages/mypage/MyPage';
import DeleteAccountPage from '@/pages/mypage/DeleteAccountPage';
import EditProfileInfoPage from '@/pages/mypage/editProfile/EditProfileInfoPage';
import EditPasswordPage from '@/pages/mypage/editProfile/EditPasswordPage';
import EditSchoolInfoPage from '@/pages/mypage/editProfile/EditSchoolInfoPage';
import CSPage from '@/pages/mypage/CSPage';
import MyCommentsPage from '@/pages/mypage/myPosts/MyCommentsPage';
import MyPostsPage from '@/pages/mypage/myPosts/MyPostsPage';
import MyBookmarksPage from '@/pages/mypage/myPosts/MyBookmarksPage';
import NotificationPage from '@/pages/notification/NotificationPage';

interface AppRoutesInterface {
  name: string;
  path: string;
  component: React.ComponentType;
  isProtected?: boolean;
  meta?: {
    hideNavBar?: boolean;
    hideFloatNav?: boolean;
  };
}

const routes: AppRoutesInterface[] = [
  {
    name: 'Spalsh',
    path: LINK.SPLASH,
    component: HomePage,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'Main',
    path: LINK.MAIN,
    component: MainPage,
  },
  {
    name: 'Login',
    path: LINK.LOGIN,
    component: LoginPage,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'SignUp',
    path: LINK.SIGNUP,
    component: SignUpPage,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'FreePost',
    path: LINK.POST_FREE,
    component: FreePostListPage,
  },
  {
    name: 'HelpPost',
    path: LINK.POST_HELP,
    component: HelpPostListPage,
  },
  {
    name: 'SignUpComplete',
    path: LINK.SIGNUP_SUCCESS,
    component: SignupCompletePage,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'Search',
    path: LINK.SEARCH,
    component: SearchPage,
  },
  {
    name: 'Chat',
    path: LINK.CHAT,
    component: ChatPage,
    isProtected: true,
    meta: { hideFloatNav: true },
  },
  {
    name: 'PostingHelp',
    path: LINK.POSTING_HELP,
    component: PostingPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'PostingFree',
    path: LINK.POSTING_FREE,
    component: PostingPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'PostEdit',
    path: LINK.POST_EDIT,
    component: PostingPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'PostDetail',
    path: LINK.POST_DETAIL,
    component: PostDetailPage,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'AdminDeclare',
    path: LINK.ADMIN_DECLARE,
    component: DeclarePage,
    meta: { hideFloatNav: true },
  },
  {
    name: 'AdminDeclarePost',
    path: LINK.ADMIN_DECLARE_POST,
    component: DeclarePostPage,
    meta: { hideFloatNav: true },
  },
  {
    name: 'AdminDeclareReply',
    path: LINK.ADMIN_DECLARE_REPLY,
    component: DeclareReplyPage,
    meta: { hideFloatNav: true },
  },
  {
    name: 'AdminAccount',
    path: LINK.ADMIN_ACCOUNT,
    component: AccountPage,
    meta: { hideFloatNav: true },
  },
  {
    name: 'MyPage',
    path: LINK.MYPAGE,
    component: MyPage,
    isProtected: true,
    meta: { hideFloatNav: true },
  },
  {
    name: 'DeleteAccount',
    path: LINK.DELETE_ACCOUNT,
    component: DeleteAccountPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'EditProfileInfo',
    path: LINK.EDIT_PROFILE,
    component: EditProfileInfoPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'EditPassword',
    path: LINK.EDIT_PASSWORD,
    component: EditPasswordPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'EditSchoolInfo',
    path: LINK.EDIT_SCHOOL_INFO,
    component: EditSchoolInfoPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'CS',
    path: LINK.CS,
    component: CSPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'MyComments',
    path: LINK.MY_COMMENTS,
    component: MyCommentsPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'MyBookmarks',
    path: LINK.MY_BOOKMARKS,
    component: MyBookmarksPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'MyPosts',
    path: LINK.MY_POSTS,
    component: MyPostsPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
  {
    name: 'Notification',
    path: LINK.NOTIFICATION,
    component: NotificationPage,
    isProtected: true,
    meta: { hideNavBar: true, hideFloatNav: true },
  },
];

export default routes;
