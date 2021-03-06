import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './root/App';
import * as serviceWorker from './serviceWorker';
import ErrorBoundary from '@Components/others/ErrorBoundary/ErrorBoundary';
import { showMockdata } from './presentation/mockups';
showMockdata();

ReactDOM.render(
  <ErrorBoundary isRoot={true}>
    <App />
  </ErrorBoundary>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
