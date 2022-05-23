import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';

import BottomTab from './BottomTab';
import Register from '../screens/Register';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

export default function MainRoutes() {
  const {_user} = useSelector(state => state.login);
  return (
    <Stack.Navigator
      initialRouteName={_user ? 'Main' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Main" component={BottomTab} />
      {/* <Stack.Screen name="Detail" component={DetailBook} />
      <Stack.Screen name="Success" component={SuccessRegister} /> */}
    </Stack.Navigator>
  );
}
