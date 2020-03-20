import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore } from '@/store';
import history from '@/root/history';

const store = configureStore({});
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <p>あああああ</p>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
