import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { debounce } from '../utils/debounce';

interface ValidationRulesInterface {
  required?: string | boolean;
  maxLength?: number;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: {
    [key: string]: (value: string) => boolean | string;
  };
}

const useSetupInput = (field: string, validationRules: ValidationRulesInterface) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  // Input validation 처리 로직
  const { onChange } = register(field, { ...validationRules });

  const value = watch(field);

  // Input status 처리 로직
  let status: 'error' | 'success' | 'search' | 'default' | undefined;

  if (errors[field]) {
    status = 'error';
  } else if (value) {
    status = 'success';
  } else if (!value) {
    status = 'search';
  } else {
    status = 'default';
  }

  // 디바운싱 처리 로직
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  const debounceHandlerRef = useRef(
    debounce((value: string) => {
      if (value !== undefined) {
        setDebouncedValue(value);
      }
    }, 500),
  );

  const inputchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(e);
    debounceHandlerRef.current(value);
  };

  return {
    register,
    errors,
    status,
    debouncedValue,
    inputchangeHandler,
    setValue,
  };
};

export default useSetupInput;