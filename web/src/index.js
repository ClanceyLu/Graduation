import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Cookie from 'js-cookie'
import { login } from './redux/actions'

import reducers from './redux/reducers'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

const token = Cookie.get('token')
if (token) {
  const userInfo = localStorage.userInfo || null
  store.dispatch(login(JSON.parse(userInfo)))
}

ReactDOM.render(
  (<Provider store={ store }>
    <Router>
      <App />
    </Router>
  </Provider>),
  document.getElementById('root')
);
registerServiceWorker();
