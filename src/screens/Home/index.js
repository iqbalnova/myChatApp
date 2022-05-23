import {View, Text, StatusBar, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CardChat from '../../components/CardChat';
import HeaderChat from '../../components/HeaderChat';
import {SafeAreaView} from 'react-native-safe-area-context';
import {myDb} from '../../helpers/DB';
import {useSelector} from 'react-redux';

export default function Home({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState('');

  const {_user} = useSelector(state => state.login);

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
    console.log(data, 'ini data');
  }, [getAllData]);

  const RenderItem = ({item}) => {
    const {displayName, email, photoURL} = item;
    return (
      <CardChat
        name={displayName}
        email={email}
        photo={photoURL}
        onPress={() => navigation.navigate('Chat')}
      />
    );
  };

  const searchFilter = text => {
    if (text) {
      const newData = data.filter(item => {
        const itemData = item.displayName
          ? item.displayName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(data);
      setSearch(text);
    }
  };

  const coba = () => {};

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
