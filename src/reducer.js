import article from './reducers/reservation';
import reservationList from './reducers/reservationList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  article,
  reservationList,
  auth,
  common,
  editor,
  home,
  settings,
  router: routerReducer
});
