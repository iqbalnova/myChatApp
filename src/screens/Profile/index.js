import {View, Text, Alert} from 'react-native';
import React from 'react';
import CardProfile from '../../components/CardProfile';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {setUser} from '../Login/redux/action';
import auth from '@react-native-firebase/auth';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const signOut = async () => {
    try {
      auth()
        .signOut()
        .then(() => {
          navigation.navigate('Login');
          console.log('out');
        });

      dispatch(setUser({}));
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 10,
      }}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          color: 'black',
          paddingHorizontal: 20,
          marginBottom: 20,
        }}>
        Profile
      </Text>
      <CardProfile />
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Logout', 'Apakah anda yakin untuk logout ?', [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {
              text: 'OK',
              onPress: () => {
                signOut();
              },
            },
          ])
        }
        style={{
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 20,
          alignItems: 'center',
          backgroundColor: '#fff',
          marginVertical: 30,
        }}>
        <Feather name="log-out" size={20} color="red" />
        <Text style={{marginLeft: 20}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
