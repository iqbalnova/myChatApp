import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CardProfile({onPress}) {
  const {_user} = useSelector(state => state.login);
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 10}}>
            <Image
              source={{uri: _user.photoURL}}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
          </View>
          <View>
            <Text style={{color: 'black', fontSize: 16}}>
              {_user.displayName}
            </Text>
            <Text>{_user.bio}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="md-qr-code-outline" size={30} color="#0a7eff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
