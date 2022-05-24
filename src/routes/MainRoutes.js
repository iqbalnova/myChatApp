import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';

import BottomTab from './BottomTab';
import Register from '../screens/Register';
import {useSelector} from 'react-redux';
import Chat from '../screens/Chat';

const Stack = createStackNavigator();

export default function MainRoutes() {
  const {_user} = useSelector(state => state.login);
  return (
    <Stack.Navigator
      initialRouteName={_user._id ? 'Main' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Main" component={BottomTab} />
      <Stack.Screen name="Chat" component={Chat} />
      {/* <Stack.Screen name="Success" component={SuccessRegister} /> */}
    </Stack.Navigator>
  );
}
