import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore } from '@/store';
import history from '@/root/history';
import Notifier from '@/presentation/backgrounds/Notifier';
import ErrorBoundary from '@Components/others/ErrorBoundary/ErrorBoundary';

const store = configureStore({});
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarProvider maxSnack={5} preventDuplicate={false}>
          <p>あああああ</p>
          <ErrorBoundary>
            <Notifier />
          </ErrorBoundary>
        </SnackbarProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
