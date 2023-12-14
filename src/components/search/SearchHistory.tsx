import React from 'react';
import styled from 'styled-components';
import { truncateContent } from '../../utils/post/post';
import DeleteIcon from '../../public/images/ui/delete_icon.svg';
import { colors } from '@/constants/colors';
import { scrollNone } from '@/styles/styles';
import usePostSearchStore from '@/store/postSearchStore';

const SearchHistory = () => {
  const {
    keywordHistory,
    deleteKeywordHistory,
    deleteKeywordHistoryAll,
    setKeyword,
    setKeywordHistory,
    setShowKeywordHistory,
  } = usePostSearchStore();

  const searchByHistoryKeyword = (keyword: string) => {
    setKeyword(keyword);
    setKeywordHistory(keyword);
    setShowKeywordHistory(false);
  };

  return (
    <Layout>
      <Title>
        <p>최근검색어</p>
        <div onClick={deleteKeywordHistoryAll}>전체삭제</div>
      </Title>
      <SearchHistoryContainer>
        {keywordHistory.map((keyword, index) => (
          <SearchHistoryItem key={index}>
            <KeywordText onClick={() => searchByHistoryKeyword(keyword)}>
              {truncateContent(keyword, 6)}
            </KeywordText>
            <IconWrapper
              onClick={(e) => {
                e.preventDefault();
                deleteKeywordHistory(keyword);
              }}
            >
              <img src={DeleteIcon} alt='delete_icon' />
            </IconWrapper>
          </SearchHistoryItem>
        ))}
      </SearchHistoryContainer>
    </Layout>
  );
};
export default SearchHistory;

const Layout = styled.div`
  padding: 1rem 2rem;
  min-height: 9rem;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  color: ${colors.gray5};
  font-size: 12px;
  > div:nth-child(2) {
    cursor: pointer;
    &:hover {
      color: ${colors.black};
    }
    &:active {
      color: ${colors.black};
    }
  }
  > p {
    font-weight: 700;
    font-size: 14px;
    color: ${colors.black};
  }
`;

const SearchHistoryContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  /* height: 3.6rem; */
  white-space: nowrap;
  align-items: end;
  overflow-x: scroll;
  ${scrollNone};
`;

const SearchHistoryItem = styled.div`
  position: relative;
  padding: 0.6rem 2.6rem 0.6rem 1.2rem;
  margin: 0.6rem 0 1rem 0;
  height: 3.3rem;
  border-radius: 90rem;
  border: 1px solid ${colors.gray3};
`;

const KeywordText = styled.div`
  cursor: pointer;
  color: ${colors.gray6};
  font-size: 14px;
`;

const IconWrapper = styled.div`
  z-index: 1;
  cursor: pointer;
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  > img {
    width: 90%;
    height: 90%;
  }
  &:hover {
  }
  &:active {
  }
`;
