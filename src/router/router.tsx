import React from 'react';
import { Navigate } from 'react-router-dom';
import { LINK } from '@/constants/links';
import Layout from '@/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
import AdminRoute from './AdminRoute';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import SignupCompletePage from '@/pages/auth/SignupCompletePage';
import SearchPage from '@/pages/search/SearchPage';
import ChatPage from '@/pages/chat/ChatPage';
import MainPage from '@/pages/main/MainPage';
import FreePostListPage from '@/pages/post/FreePostListPage';
import HelpPostListPage from '@/pages/post/HelpPostListPage';
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

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <AuthenticatedRoute />,
        children: [
          { path: '/', element: <Navigate to={LINK.SPLASH} replace /> },
          {
            path: LINK.SPLASH,
            element: <HomePage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.SIGNUP,
            element: <SignUpPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.LOGIN,
            element: <LoginPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.SIGNUP_SUCCESS,
            element: <SignupCompletePage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.POST_EDIT,
            element: <PostingPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
        ],
      },
      {
        path: '',
        element: <ProtectedRoute />,
        children: [
          {
            path: LINK.SIGNUP_SUCCESS,
            element: <SignupCompletePage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.POSTING_FREE,
            element: <PostingPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.POSTING_HELP,
            element: <PostingPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.DELETE_ACCOUNT,
            element: <DeleteAccountPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.EDIT_PROFILE,
            element: <EditProfileInfoPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.EDIT_PASSWORD,
            element: <EditPasswordPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.EDIT_SCHOOL_INFO,
            element: <EditSchoolInfoPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.MY_COMMENTS,
            element: <MyCommentsPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.MY_POSTS,
            element: <MyPostsPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.MY_BOOKMARKS,
            element: <MyBookmarksPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          {
            path: LINK.NOTIFICATION,
            element: <NotificationPage />,
            meta: { hideNavBar: true, hideFloatNav: true },
          },
          { path: LINK.MYPAGE, element: <MyPage />, meta: { hideFloatNav: true } },
          { path: LINK.CS, element: <CSPage />, meta: { hideNavBar: true, hideFloatNav: true } },
          { path: LINK.CHAT, element: <ChatPage />, meta: { hideFloatNav: true } },
        ],
      },
      {
        path: '',
        element: <AdminRoute />,
        children: [
          {
            path: LINK.ADMIN_DECLARE,
            element: <DeclarePage />,
            meta: { hideFloatNav: true },
          },
          {
            path: LINK.ADMIN_ACCOUNT,
            element: <AccountPage />,
            meta: { hideFloatNav: true },
          },
          {
            path: LINK.ADMIN_DECLARE_POST,
            element: <DeclarePostPage />,
            meta: { hideFloatNav: true },
          },
          {
            path: LINK.ADMIN_DECLARE_REPLY,
            element: <DeclareReplyPage />,
            meta: { hideFloatNav: true },
          },
        ],
      },
      { path: LINK.MAIN, element: <MainPage /> },
      {
        path: LINK.POST_FREE,
        element: <FreePostListPage />,
      },
      {
        path: LINK.POST_HELP,
        element: <HelpPostListPage />,
      },
      {
        path: LINK.POST_DETAIL,
        element: <PostDetailPage />,
        meta: { hideNavBar: true, hideFloatNav: true },
      },
      { path: LINK.SEARCH, element: <SearchPage /> },
    ],
  },
];

export default routes;
