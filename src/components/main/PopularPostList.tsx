import React from 'react';
import PopularPost from './PopularPost';
import styled from 'styled-components';
import Slider from 'react-slick';
import { colors } from '@/constants/colors';
import useMainPosts from '@/hooks/useMainPosts';
import ErrorContent from '../public/ErrorContent';

const PopularPostList = () => {
  const { weeklyHotPosts } = useMainPosts();

  if (weeklyHotPosts?.length === 0) return <ErrorContent style={{ padding: '5rem' }} />;

  return (
    <Layout>
      <Slider {...settings}>
        {weeklyHotPosts?.map((post) => <PopularPost post={post} key={post.postId} />)}
      </Slider>
    </Layout>
  );
};

export default PopularPostList;

const settings = {
  dots: true,
  infinite: true,
  dotsClass: 'dots_custom',
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
};

const Layout = styled.div`
  height: 100%;
  min-height: 21rem;
  max-height: 21rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .slick-slider {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 33.8rem 3.5rem 33.8rem;
    position: static;
  }
  .slick-list {
    margin: 0 -33.8rem;
  }
  .slick-slide.slick-cloned {
    opacity: 0;
    pointer-events: none;
  }
  .dots_custom {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 19rem;
  }
  .dots_custom li {
    display: inline-block;
    margin: 0 0.3rem;
  }
  .dots_custom li button {
    width: 0.6rem;
    height: 0.6rem;
    border: none;
    background: ${colors.third};
    color: transparent;
    cursor: pointer;
    border-radius: 100%;
    padding: 0;
    &:hover {
      scale: 1.2;
    }
    &:active {
      scale: 1.2;
    }
  }
  .dots_custom li.slick-active button {
    width: 2.8rem;
    border-radius: 0.8rem;
    background: ${colors.primary};
    &:hover {
      scale: 1;
    }
    &:active {
      scale: 1;
    }
  }
`;
