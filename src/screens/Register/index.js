import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {register, google, facebook, twitter} from '../../assets/images';

import ImageCropPicker from 'react-native-image-crop-picker';

// Kebutuhan firebase
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import {myDb} from '../../helpers/DB';

const auth = authProvider();
const messaging = messagingProvider();

export default function Register({navigation}) {
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  // button upload avatar
  const chooseAvatar = async () => {
    await ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        handleDataUser('avatar', image.path);
      })
      .catch(err => console.log(err));
  };

  // Data register user yg dibutuhkan
  const [dataUser, setDataUser] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    avatar:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  });

  // Dinamis state
  const handleDataUser = (field, value) => {
    setDataUser(prevState => {
      prevState[field] = value;
      return {
        ...prevState,
      };
    });
  };

  // For validation inputan kosong
  const regisValidation = () => {
    const {password, username, email, bio} = dataUser;
    if (!username || !email || !password || !bio) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  useEffect(() => {
    regisValidation();
  }, [regisValidation]);

  const regisWithEmail = async () => {
    try {
      setLoading(true);
      const res = await auth.createUserWithEmailAndPassword(
        dataUser.email,
        dataUser.password,
      );
      console.log(res);
      if ('email' in res.user && res.user.email) {
        await auth.currentUser.updateProfile({
          displayName: dataUser.username,
        });
        const token = await messaging.getToken();

        if (token) {
          const payload = {
            displayName: dataUser.username,
            email: res.user.email,
            phoneNumber: res.user.phoneNumber,
            photoURL: dataUser.avatar,
            bio: dataUser.bio,
            contact: [],
            roomChat: [],
            _id: res.user.uid,
            notifToken: token,
          };
          await myDb.ref(`users/${res.user.uid}`).set(payload);
          // dispatch(setDataUser(payload));
          navigation.navigate('Login');
        }
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image style={{height: 300, width: 300}} source={register} />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <CustomInput
          label={'Username'}
          icon={
            <Feather
              name="user"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          onChange={text => handleDataUser('username', text)}
        />

        <CustomInput
          label={'Email'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          onChange={text => handleDataUser('email', text)}
        />

        <CustomInput
          label={'Password'}
          securePass={true}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          onChange={text => handleDataUser('password', text)}
        />

        <CustomInput
          label={'Bio'}
          icon={
            <MaterialCommunityIcons
              name="card-text-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          onChange={text => handleDataUser('bio', text)}
        />

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
            width: 200,
          }}>
          <Ionicons
            name="image-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity
            onPress={() => chooseAvatar()}
            style={{
              backgroundColor: '#ec995e',
              paddingVertical: 3,
              paddingHorizontal: 6,
              elevation: 2,
              borderRadius: 6,
            }}>
            <Text style={{color: '#fff'}}>Upload Avatar</Text>
          </TouchableOpacity>
          <Text style={{marginLeft: 10, color: '#ccc'}}>(Optional)</Text>
        </View>
        {/* button register */}
        <CustomButton
          label={'Register'}
          isDisable={disable}
          onPress={() => {
            regisWithEmail();
          }}
        />

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, register with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image style={{height: 24, width: 24}} source={google} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image style={{height: 24, width: 24}} source={facebook} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image style={{height: 24, width: 24}} source={twitter} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#03dfc0', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
