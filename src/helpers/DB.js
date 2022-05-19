import {firebase} from '@react-native-firebase/database';

export const myDb = firebase
  .app()
  .database(
    'https://my-chat-app-1e805-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );
