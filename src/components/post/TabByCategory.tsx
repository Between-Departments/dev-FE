import { colors } from '@/constants/colors';
import { tabList } from '@/constants/post';
import { TabInterface } from '@/types/post';
import React from 'react';
import styled from 'styled-components';
import PostFilterSelect from './postItem/PostFilterSelect';

type Props = {
  tabClickHandler: (tab: TabInterface) => void;
  selectedTab: TabInterface;
};

const TabByCategory = ({ tabClickHandler, selectedTab }: Props) => {
  const needPostFilter = ['/search'].some((path) => location.pathname.includes(path));

  return (
    <Layout>
      <TabBox>
        {tabList.map((tab) => (
          <CategoryTitle
            key={tab.id}
            $isSelected={tab.id === selectedTab.id}
            onClick={() => tabClickHandler(tab)}
          >
            {tab.name}
          </CategoryTitle>
        ))}
      </TabBox>
      {needPostFilter && <PostFilterSelect />}
    </Layout>
  );
};

export default TabByCategory;

const Layout = styled.div`
  position: relative;
  display: flex;
`;

const TabBox = styled.div`
  width: 100%;
  padding: 1.8rem 2rem 0 2.6rem;
  display: flex;
  position: relative;
  gap: 1.2rem;
  border-bottom: 1px solid ${colors.gray1};
`;
const CategoryTitle = styled.div<{ $isSelected: boolean }>`
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  border-bottom: ${({ $isSelected }) => ($isSelected ? `2px solid ${colors.black}` : 'none')};
  color: ${({ $isSelected }) => ($isSelected ? `${colors.black}` : `${colors.gray4}`)};
`;
