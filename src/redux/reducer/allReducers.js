import {combineReducers} from 'redux';
import {loginReducer} from '../../screens/Login/redux/reducer';

export const allReducers = combineReducers({
  login: loginReducer,
});
