import React, { useState } from 'react';
import styled from 'styled-components';
import SelectMajorItem from './SelectMajorItem';
import { MAJORS } from '@/constants/majorCategory';

interface SelectMajorListInterface {
  onMajorSelect: (major: string) => void;
}

const SelectMajorList = ({ onMajorSelect }: SelectMajorListInterface) => {
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  const itemClickHandler = (major: string) => {
    onMajorSelect(major);
    setSelectedMajor(major);
  };

  return (
    <MajorListLayout>
      {MAJORS.map((major) => (
        <SelectMajorItem
          key={major}
          major={major}
          onClick={itemClickHandler}
          selectedMajor={selectedMajor}
        />
      ))}
    </MajorListLayout>
  );
};

export default SelectMajorList;

const MajorListLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
