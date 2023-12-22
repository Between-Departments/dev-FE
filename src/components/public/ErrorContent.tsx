import React from 'react';
import ErrorImage from '@/public/images/404.svg';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { useLocation } from 'react-router-dom';
import { errorMessages } from '@/constants/errors';
import { imageStyle } from '@/styles/styles';

interface ErrorContentProps {
  style?: React.CSSProperties;
  type?: string;
}

const ErrorContent = ({ style, type }: ErrorContentProps) => {
  const location = useLocation();
  const errorMessage: string =
    errorMessages.find((e) => location.pathname.includes(e.path))?.message ||
    errorMessages[0].message;

  return (
    <Layout style={style}>
      <ImageWrapper>
        <img src={ErrorImage} alt='error_image' />
      </ImageWrapper>
      {type === 'dailyHot' ? <Text>오늘의 인기 게시글이 없어요</Text> : <Text>{errorMessage}</Text>}
    </Layout>
  );
};
export default ErrorContent;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2rem;
  padding: 5rem 0 15rem 0;
`;
const ImageWrapper = styled.div`
  width: 12rem;
  ${imageStyle}
  > img {
    object-fit: none;
  }
`;
const Text = styled.div`
  color: ${colors.gray6};
  font-size: 16px;
`;
