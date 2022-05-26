import {Alert, RefreshControl, StatusBar, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CardChat from '../../components/CardChat';
import HeaderChat from '../../components/HeaderChat';
import {SafeAreaView} from 'react-native-safe-area-context';
import {myDb} from '../../helpers/DB';
import {useDispatch, useSelector} from 'react-redux';
import {setChoosenUser} from './redux/action';
import {generateRoomId} from '../../helpers/generateRoomId';
import EmptyComponent from '../../components/EmptyComponent';

export default function Home({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState('');

  const [contactList, setContactList] = useState([]);

  const {_user} = useSelector(state => state.login);
  const {_choosenUser} = useSelector(state => state.home);

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    getAllData();
    setRefresh(false);
  };

  const dispatch = useDispatch();

  const getAllData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await myDb.ref('/users').once('value');
      const userList = Object.values(res.val()).filter(
        val => val._id !== _user._id,
      );
      setData(userList);
      setFilterData(userList);
      console.log('INI USER LIST :  ', userList);
      myDb.ref(`contactRooms/${_user.displayName}`).on('value', snapshot => {
        const res = snapshot.val();
        if (res && res.contact) {
          setContactList(res.contact);
        } else {
          setContactList([]);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [_user.email]);

  useEffect(() => {
    getAllData();
    return () => {
      setData([]); // This worked for me
      setFilterData([]);
    };
  }, [getAllData]);

  const selectedUser = item => {
    newContact(item);
    console.log('++++++ ', _choosenUser);
  };

  const newContact = async item => {
    try {
      //check friends

      const fren = await myDb.ref(`chatRooms/`).once('value');
      const dataFren = fren.val();
      console.log('INI DATAFREN ', dataFren);

      // Create new chatroom
      await myDb
        .ref(`chatRooms/${generateRoomId(_user._id, _choosenUser._id)}`)
        .update({
          firstUser: _user.displayName,
          secondUser: item.displayName,
        });

      // add contact
      await myDb.ref(`contactRooms/${_user.displayName}`).update({
        contact: [...contactList, {...item}],
      });
      const friendContact = await myDb
        .ref(`contactRooms/${item.displayName}`)
        .once('value');
      console.log(friendContact.val());
      if (friendContact.val()) {
        await myDb.ref(`contactRooms/${item.displayName}`).update({
          contact: [...friendContact.val().contact, {..._user}],
        });
      } else {
        await myDb.ref(`contactRooms/${item.displayName}`).update({
          contact: [{..._user}],
        });
      }

      dispatch(setChoosenUser(item));
      navigation.navigate('Chat');
    } catch (error) {
      console.log(error);
    }
  };

  const RenderItem = ({item}) => {
    const {displayName, email, photoURL} = item;
    return (
      <CardChat
        name={displayName}
        email={email}
        photo={photoURL}
        {...item}
        onPress={() => {
          Alert.alert('Add Friend', 'Apakah anda yakin untuk add friend ?', [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {
              text: 'OK',
              onPress: () => {
                selectedUser(item);
              },
            },
          ]);
        }}
      />
    );
  };

  const searchFilter = text => {
    if (text) {
      const newData = data.filter(i =>
        i.displayName.toUpperCase().includes(text.toUpperCase()),
      );
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(data);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        data={filterData}
        keyExtractor={item => item._id}
        renderItem={RenderItem}
        ListEmptyComponent={() => {
          return <EmptyComponent />;
        }}
        ListHeaderComponent={() => {
          return (
            <HeaderChat
              value={search}
              title="All User"
              onChangeText={text => searchFilter(text)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
