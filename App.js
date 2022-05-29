import {View, LogBox} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Root from './src/routes/Root';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });
    return unsubscribe;
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
