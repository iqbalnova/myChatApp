import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Root from './src/routes/Root';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <Root />;
}
