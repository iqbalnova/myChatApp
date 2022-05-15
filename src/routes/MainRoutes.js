import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';

import BottomTab from './BottomTab';

const Stack = createStackNavigator();

export default function MainRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Register" component={Register} /> */}
      <Stack.Screen name="Main" component={BottomTab} />
      {/* <Stack.Screen name="Detail" component={DetailBook} />
      <Stack.Screen name="Success" component={SuccessRegister} /> */}
    </Stack.Navigator>
  );
}
