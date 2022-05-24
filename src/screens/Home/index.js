import {View, Text, StatusBar, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CardChat from '../../components/CardChat';
import HeaderChat from '../../components/HeaderChat';
import {SafeAreaView} from 'react-native-safe-area-context';
import {myDb} from '../../helpers/DB';
import {useDispatch, useSelector} from 'react-redux';
import {setChoosenUser} from './redux/action';

export default function Home({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState('');

  const {_user} = useSelector(state => state.login);
  const {_choosenUser} = useSelector(state => state.home);

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [_user.email]);

  useEffect(() => {
    getAllData();
    console.log(data, 'ini data db');
    console.log(_user, 'ini data user');
  }, [getAllData]);

  const selectedUser = item => {
    dispatch(setChoosenUser(item));
    console.log(_choosenUser, 'ini data choosen');
  };

  const RenderItem = ({item}) => {
    const {displayName, email, photoURL} = item;
    return (
      <CardChat
        name={displayName}
        email={email}
        photo={photoURL}
        {...item}
        onPress={() => selectedUser(item)}
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
        data={filterData}
        keyExtractor={item => item._id}
        renderItem={RenderItem}
        // ListEmptyComponent={() => {
        //   return <EmptyComponent search />;
        // }}
        ListHeaderComponent={() => {
          return (
            <HeaderChat
              value={search}
              onChangeText={text => searchFilter(text)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
