import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';

import explainModalStore from './store/explain-modal-store';

import './assets/css/reset.css';

const stores = {
  explainModalStore
};
// for debugger
window.__APP_STORE__ = stores;

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
