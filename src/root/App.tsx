import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore } from '@/store';
import history from '@/root/history';
import Notifier from '@/presentation/backgrounds/Notifier';
import ErrorBoundary from '@Components/others/ErrorBoundary/ErrorBoundary';
import AppRouter from '@/presentation/routers/AppRouter';
import MainTemplate from '@/presentation/templates/MainTemplate/MainTemplate';
import BrowserTab from '@/presentation/backgrounds/BrowserTab';
import ErrorDialog from '@Components/organisms/dialogs/ErrorDialog/ErrorDialog.container';

const store = configureStore({});
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarProvider maxSnack={5} preventDuplicate={false}>
          <MainTemplate>
            <AppRouter />
          </MainTemplate>
          <ErrorBoundary>
            <Notifier />
            <BrowserTab />
            <ErrorDialog />
          </ErrorBoundary>
        </SnackbarProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
