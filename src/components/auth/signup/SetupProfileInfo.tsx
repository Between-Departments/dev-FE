import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import MainComment from '../MainComment';
import Input from '../../public/Input';
import Button from '../../public/Button';
import { nicknameValidation } from '../../../utils/auth/validationRules';
import { ButtonContainer, InputWrapper } from '../../../styles/styles';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import { URL } from '../../../constants/url';
import CameraIcon from '../../../public/images/input/photo_camera.png';
import { httpClient } from '../../../api/httpClient';

const SetupProfileInfo = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const [profileImageUrl, setProfileImageUrl] = useState<string>(URL.DEFAULT_PROFILE_IMG);

  useEffect(() => {
    setValue('imageUrl', URL.DEFAULT_PROFILE_IMG);
  }, [setValue]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const nicknameValue = watch('nickname');

  const nicknameStatus = errors.nickname
    ? 'error'
    : nicknameValue && !errors.nickname
    ? 'success'
    : 'default';

  const imageChangeClickHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const imageUrl = await httpClient.image.post.upload(file);
        setValue('imageUrl', imageUrl[0]);
        setProfileImageUrl(imageUrl[0]);
      } catch (err: unknown) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <MainComment
        style={{ fontSize: '20px', textAlign: 'center' }}
        comment='프로필을 설정해주세요'
      />
      <div style={{ position: 'relative' }}>
        <ProfileImageWrapper>
          <ProfileImage src={profileImageUrl} alt='profile_image' />
        </ProfileImageWrapper>
        <EditImageButton onClick={() => fileInputRef.current?.click()}>
          <ProfileImageEditIcon src={CameraIcon} alt='Edit Icon' />
          <ProfileImageInput
            {...register('imageUrl')}
            type='file'
            accept='image/*'
            onChange={imageChangeClickHandler}
            ref={fileInputRef}
          />
        </EditImageButton>
      </div>
      <InputWrapper>
        <Input
          type='nickname'
          status={nicknameStatus}
          {...register('nickname', nicknameValidation)}
          errorMessage={
            errors.nickname && typeof errors.nickname.message === 'string'
              ? errors.nickname.message
              : undefined
          }
          placeholder='사용하실 닉네임을 입력해주세요.'
        />
      </InputWrapper>
      <ButtonContainer>
        <Button $isFullWidth type='submit' disabled={nicknameStatus !== 'success'}>
          회원가입
        </Button>
      </ButtonContainer>
    </>
  );
};

export default SetupProfileInfo;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 15.6rem;
  height: 15.6rem;
  overflow: hidden;
  border-radius: 100%;
  background: ${colors.paleGray};
  margin: 0 auto;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditImageButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background: ${colors.white};
  cursor: pointer;
  z-index: 1;
  bottom: 3rem;
  right: 10rem;
`;

const ProfileImageInput = styled.input`
  display: none;
`;

const ProfileImageEditIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;
