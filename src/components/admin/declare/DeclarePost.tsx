import { colors } from '@/constants/colors';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeclareDetailContent from './DeclareDetailContent';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { LINK } from '@/constants/links';
import { ReportDetailPostInterface } from '@/types/admin';
import { MODAL_TYPES } from '@/types/modal';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import useModalStore from '@/store/modalStore';

const DeclarePost = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postContent = searchParams.get('postContent');
  const { postId } = useParams();
  const [dataList, setDataList] = useState<ReportDetailPostInterface[]>([]);
  const { lockScroll } = useBodyScrollLock();
  const { openModal, closeModal } = useModalStore();

  const deleteReportPostHandler = () => {
    closeModal();
    // const resposne = await deleteReportPost();
    // if (resposne) {
    //   // TODO: toast alert
    // } else {
    //   // TODO: toast alert
    // }
  };

  const deleteModalHandler = () => {
    openModal({
      modalType: MODAL_TYPES.ALERT,
      modalProps: {
        title: `해당 게시물을 삭제하시겠습니까?`,
        content: '삭제하면 해당 글이 사라지며 복구할 수 없어요',
        confirmText: '삭제',
        onConfirmHandler: deleteReportPostHandler,
      },
    });
    lockScroll();
  };

  const movePostPageHandler = () => {
    navigate(`${LINK.POST}/${postId}`);
  };

  const fetchData = () => {
    setDataList([
      {
        postReportId: 1,
        postId: 1,
        content: '신고내용',
        reporter: '신고자',
        type: '신고유형',
      },
    ]);
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <Layout>
      <Title>신고 게시글 보기</Title>
      <Content onClick={movePostPageHandler}>{postContent}</Content>
      <Title>신고 내역</Title>
      <ListWrapper>
        {dataList.map((data) => (
          <DeclareDetailContent
            key={postId}
            {...data}
            id={data.postId}
            reportId={data.postReportId}
            category='post'
          />
        ))}
      </ListWrapper>
      <DeleteButton onClick={deleteModalHandler}>글 삭제하기</DeleteButton>
    </Layout>
  );
};

export default DeclarePost;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
`;

const Title = styled.div`
  color: ${colors.black};
  font-size: 14px;
  margin: 0 0 0.4rem 1rem;
`;

const Content = styled.div`
  margin-bottom: 3rem;
  padding: 10px;
  display: flex;
  align-items: center;
  background: ${colors.background};
  color: ${colors.gray6};
  font-size: 16px;
  font-weight: 700;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DeleteButton = styled.div`
  background: red;
  cursor: pointer;
  margin: 2rem 0;
  height: 4.8rem;
  padding: 1rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  background: ${colors.primary};
  color: ${colors.white};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;
