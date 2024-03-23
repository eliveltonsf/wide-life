import { ReactNode } from 'react';

import { ToastProvider } from './toast';

type ToastProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: ToastProviderProps) => <ToastProvider>{children}</ToastProvider>;

export default AppProvider;
