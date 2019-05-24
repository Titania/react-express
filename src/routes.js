import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './redux/reducers';
import { Provider } from 'react-redux'
import rootSaga from './redux/sagas'
import { PrivateRoute } from './pages/PrivateRoute';
import LoginPage from './pages/LoginPage';
import HeaderComponent from './components/HeaderComponent';
import NewPage from './pages/NewPage';
import MemberPage from './pages/MemberPage';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081/api'

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

function isLoggedIn() {
  if (localStorage.getItem('user')) {
    console.log('true')
    return true;
  }
  console.log('false')
  return false;
}

function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: 'login'
    });
  }
}

const Routes = (props) => (
<Provider store={store}>
  <BrowserRouter>
    <div>
      <HeaderComponent/>
      <Route path="/login" component={LoginPage} />
      <PrivateRoute exact path="/" component={MemberPage} />
      <PrivateRoute path="/members" component={MemberPage} />
      <PrivateRoute path="/new" component={NewPage} />
    </div>
  </BrowserRouter>
</Provider>
);
 
export default Routes;