import React, { useState } from 'react';
import useEmailConfirm from '../../../hooks/useEmailConfirm';
import useSetupInput from '../../../hooks/useSetupInput';
import MainComment from '../MainComment';
import Input from '../../public/Input';
import Button from '../../public/Button';
import { emailValidation } from '../../../utils/auth/validationRules';
import { ProfileSetupStepInterface } from '../../../types/types';
import { ButtonContainer, InputWrapper } from '../../../styles/styles';

const SetupEmail = ({ onNext }: ProfileSetupStepInterface) => {
  const [codeValue, setCodeValue] = useState<string>('');

  const { requestEmail, verifyCode, isVerified } = useEmailConfirm();

  const {
    register: emailRegister,
    errors: emailErrors,
    status: emailStatus,
  } = useSetupInput('mail', emailValidation);

  const codeStatus = codeValue ? 'success' : 'default';

  return (
    <>
      <MainComment
        style={{ fontSize: '20px' }}
        comment={`학교계정 이메일을 입력 후\n이메일을 인증해주세요 :)`}
      />
      <InputWrapper style={{ marginBottom: '3rem' }}>
        <Input
          type='email'
          status={emailStatus}
          {...emailRegister('mail')}
          errorMessage={
            emailErrors.mail && typeof emailErrors.mail.message === 'string'
              ? emailErrors.mail.message
              : undefined
          }
          placeholder='이메일을 입력해주세요.'
          button
          buttonText='이메일 보내기'
          onButtonClick={() => requestEmail(emailStatus)}
        />
      </InputWrapper>

      <InputWrapper>
        <Input
          type='text'
          status={codeStatus}
          onChange={(e) => setCodeValue(e.target.value)}
          placeholder='인증번호를 입력해주세요.'
          button
          buttonText='인증 확인'
          onButtonClick={() => verifyCode(emailStatus, codeValue)}
        />
      </InputWrapper>
      <ButtonContainer>
        <Button $isFullWidth onClick={onNext} disabled={emailStatus !== 'success' || !isVerified}>
          다음
        </Button>
      </ButtonContainer>
    </>
  );
};

export default SetupEmail;
