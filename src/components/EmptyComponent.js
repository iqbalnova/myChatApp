import {View, Text, Image} from 'react-native';
import React from 'react';
import {empty} from '../assets/images';

export default function EmptyComponent() {
  return (
    <View flex={1}>
      <View
        style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={empty} style={{width: 360, height: 360}} />
        <Text style={{color: '#999', fontWeight: 'bold', fontSize: 26}}>
          Let's add new firends!
        </Text>
      </View>
    </View>
  );
}
