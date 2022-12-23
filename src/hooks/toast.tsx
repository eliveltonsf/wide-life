/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useCallback, useState } from 'react';

import Toast from 'components/Toast';

interface ToastContextData {
  addToast(message: ToastMessage): void;
  removeToast(): void;
}

export interface ToastMessage {
  type: string;
  title: string;
  description?: string;
  visible: boolean;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider = ({ children }: any) => {
  const [message, setMessage] = useState<ToastMessage>({} as ToastMessage);

  const addToast = useCallback((message: ToastMessage) => {
    setMessage(message);
  }, []);

  const removeToast = useCallback(() => setMessage({} as ToastMessage), []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toast message={message} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
