import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import ApplicationContextProvider from '@/components/app/AppContextProvider';
import { Suspense } from 'react';
import { Popup } from '@/components/popup';
import { LoginPage } from '@/components/login';

import { SidePanel } from './SidePanel';
import { AuthRedirect } from './AuthRedirect';
import { Settings } from './Settings';

import '@/styles/app.scss';

import LoginAuth from '@/components/login/LoginAuth';
import { AUTH_CALLBACK_PATH } from '@/services/service_impl';
import AppTheme from './AppTheme';
import { useTranslation } from 'react-i18next';
export function App(): JSX.Element {
  // Handle translation loading with improved type-safety
  // FIXME: Type instantiation is excessively deep and possibly infinite.
  // @ts-ignore
  const { ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }

  return (
    <AppContainer>
      <AppRoutes />
    </AppContainer>
  );
}

// Encapsulate the app layout and context
function AppContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // FIXME: It seems like chrome extension only support HashRouter, but HashRouter
  // is not supported for login redirect
  return (
    <HashRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <AppTheme>
        <ApplicationContextProvider>{children}</ApplicationContextProvider>
      </AppTheme>
    </HashRouter>
  );
}

// Separate routing logic for clarity
function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/popup' replace />} />
      <Route path='/popup' element={<Popup />} />
      <Route path='/side-panel' element={<SidePanel />} />
      <Route path='/auth-redirect' element={<AuthRedirect />} />
      <Route path='/settings' element={<Settings />} />
      <Route path={AUTH_CALLBACK_PATH} element={<LoginAuth />} />
      <Route
        path='/login'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
