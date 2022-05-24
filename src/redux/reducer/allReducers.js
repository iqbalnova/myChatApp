import {combineReducers} from 'redux';
import {homeReducer} from '../../screens/Home/redux/reducer';
import {loginReducer} from '../../screens/Login/redux/reducer';

export const allReducers = combineReducers({
  login: loginReducer,
  home: homeReducer,
});
