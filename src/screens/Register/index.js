import React, {useState} from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {register, google, facebook, twitter} from '../../assets/images';

export default function Register({navigation}) {
  const [coba, setCoba] = useState('');
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
          onChange={text => setCoba(text)}
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
            onPress={() => console.log()}
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

        <CustomButton label={'Register'} onPress={() => {}} />

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
