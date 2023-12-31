import React from 'react';
import useFocus from '../../../hooks/useFocus';
import useSetupInput from '../../../hooks/useSetupInput';
import useSchoolMajorData from '../../../hooks/useSchoolMajorData';
import Modal from './SearchModal';
import MainComment from '../../public/MainComment';
import Input from '../../public/Input';
import Button from '../../public/Button';
import { schoolValidation } from '../../../utils/auth/validationRules';
import { ProfileSetupStepInterface } from '../../../types/types';
import { ButtonContainer, InputWrapper } from '../../../styles/styles';
import { applyKeywordToField } from '../../../services/signup';

const SetupSchool = ({ onNext, isEdit }: ProfileSetupStepInterface) => {
  const {
    register,
    errors,
    status: schoolStatus,
    debouncedValue: debouncedSchoolValue,
    inputchangeHandler,
    setValue,
    value,
  } = useSetupInput('school', schoolValidation);

  const { datas } = useSchoolMajorData('school', debouncedSchoolValue);

  const { isFocus, onBlur, onFocus } = useFocus();

  const isValueInData = datas.some((data) => data === value);

  const isNextButtonActive = isValueInData && schoolStatus === 'success';

  return (
    <>
      {isEdit === false && (
        <MainComment style={{ fontSize: '20px' }} comment='학교를 선택해주세요' />
      )}
      <InputWrapper style={{ marginBottom: isEdit ? '3rem' : '0' }}>
        <Input
          type='school'
          status={schoolStatus}
          {...register('school')}
          errorMessage={
            errors.school && typeof errors.school.message === 'string'
              ? errors.school.message
              : undefined
          }
          placeholder='학교 이름을 검색해주세요.'
          onFocus={onFocus}
          onChange={inputchangeHandler}
        />
        {isFocus && (
          <Modal
            fieldName='school'
            searchValue={debouncedSchoolValue}
            keywordSelectHandler={applyKeywordToField}
            onBlur={onBlur}
            setValue={setValue}
          />
        )}
      </InputWrapper>
      {isEdit === false && (
        <ButtonContainer>
          <Button $isFullWidth onClick={onNext} disabled={!isNextButtonActive}>
            다음
          </Button>
        </ButtonContainer>
      )}
    </>
  );
};

export default SetupSchool;
