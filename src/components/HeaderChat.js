import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HeaderChat() {
  return (
    <View
      style={{
        flex: 1,
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 2,
        marginBottom: 10,
      }}>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}>
        <Text style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>
          Chat
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#d1d1d1',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 10,
            marginTop: 10,
            flex: 1,
          }}>
          <Ionicons name="ios-search-outline" size={20} />
          <View style={{flex: 1}}>
            <TextInput placeholder="Cari" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <TouchableOpacity>
            <Text style={{color: '#0a7eff'}}>Daftar Siaran</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: '#0a7eff'}}>Grub Baru</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
