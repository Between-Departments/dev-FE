import React from 'react';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { colors } from '../constants/colors';
import ErrorIcon from '@/public/images/input/warning.svg';
import CloseIcon from '@/public/images/toast_close.svg';

const ToasterContext = () => {
  return (
    <Toaster
      position='bottom-center'
      toastOptions={{
        duration: 1500,
        style: {
          width: '35rem',
          maxWidth: '35rem',
          height: '4rem',
          fontSize: '14px',
          padding: '1.2rem 1.6rem',
          color: colors.white,
          backgroundColor: colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          lineHeight: '2.1rem',
          fontWeight: '500',
          borderRadius: '8px',
          marginBottom: '11.5rem',
        },
        success: {
          iconTheme: {
            primary: colors.white,
            secondary: colors.primary,
          },
        },
        error: {
          style: {
            backgroundColor: colors.error,
          },
          iconTheme: {
            primary: colors.white,
            secondary: colors.error,
          },
          icon: <img src={ErrorIcon} alt='Error' style={{ marginTop: '0.5rem' }} />,
        },
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
          }}
        >
          {({ icon }) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className='icon'>{icon}</div>
                <span style={{ marginLeft: '1rem' }}>{String(t.message)}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    height: '100%',
                    borderRight: `1px solid ${colors.paleGray}`,
                    marginRight: '0.5rem',
                  }}
                ></div>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: colors.paleGray,
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  <img src={CloseIcon} alt='toast_close' />
                </button>
              </div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default ToasterContext;
