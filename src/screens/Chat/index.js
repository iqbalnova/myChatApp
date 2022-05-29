import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {myDb} from '../../helpers/DB';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {generateRoomId} from '../../helpers/generateRoomId';
import {fcmUrl, servertoken} from '../../helpers/API';
import axios from 'axios';

export default function Chat({navigation}) {
  const [user, setUser] = useState({messages: []});
  const {_user} = useSelector(state => state.login);
  const {_choosenUser} = useSelector(state => state.home);

  const createIntialData = useCallback(() => {
    try {
      myDb
        .ref(`chatRooms/${generateRoomId(_user._id, _choosenUser._id)}`)
        .on('value', res => {
          const userData = res.val();
          console.log('USER DATA======= ', userData);
          console.log(_choosenUser._id);
          if (userData) {
            if (userData.messages) {
              setUser(userData);
            } else {
              setUser(prevState => {
                return {...prevState, ...userData, messages: []};
              });
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [_choosenUser._id, _user._id]);

  useEffect(() => {
    createIntialData();
  }, [createIntialData]);

  const onSend = useCallback(
    async (sendedMessage = []) => {
      let isUpdating = true;
      await myDb
        .ref(`chatRooms/${generateRoomId(_user._id, _choosenUser._id)}`)
        .update({
          messages: [
            ...user.messages,
            {
              ...sendedMessage[0],
              idx: user.messages?.length + 1,
              sender: _user.displayName,
              createdAt: new Date(),
            },
          ],
        });

      isUpdating = false;
      if (!isUpdating) {
        const body = {
          to: _choosenUser.notifToken,
          notification: {
            body: sendedMessage[0].text,
            title: `New Message from ${_user.displayName}`,
          },
          data: {
            body: sendedMessage[0].text,
            title: `New Messages from ${_user.displayName}`,
          },
        };
        await axios.post(fcmUrl, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'key=' + servertoken,
          },
        });
      }
    },

    [
      user.messages,
      _user._id,
      _choosenUser._id,
      _user.displayName,
      _choosenUser.notifToken,
    ],
  );
  console.log('USER MESSAGE : ', user.messages);

  const renderSend = props => {
    return (
      <Send {...props}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
            marginRight: 5,
          }}>
          <Feather name="send" size={26} color="#0a7eff" />
        </View>
      </Send>
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 20,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={32} color="#0a7eff" />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            marginLeft: 10,
          }}>
          <Image
            style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}}
            source={{uri: _choosenUser.photoURL}}
          />
          <Text>{_choosenUser.displayName}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginRight: 10}}>
            <Ionicons name="videocam-outline" size={30} color="#0a7eff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-call-outline" size={28} color="#0a7eff" />
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg',
        }}
        style={{flex: 1}}>
        <GiftedChat
          messages={user?.messages?.sort(function (a, b) {
            return b.idx - a.idx;
          })}
          onSend={messages => onSend(messages)}
          user={{
            _id: _user._id,
            avatar: _user.photoURL,
          }}
          scrollToBottom
          alwaysShowSend
          renderSend={renderSend}
        />
      </ImageBackground>
    </>
  );
}
