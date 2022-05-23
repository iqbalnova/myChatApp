import {View, Text, StatusBar, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CardChat from '../../components/CardChat';
import HeaderChat from '../../components/HeaderChat';
import {SafeAreaView} from 'react-native-safe-area-context';
import {myDb} from '../../helpers/DB';
import {useSelector} from 'react-redux';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {_user} = useSelector(state => state.login);

  const getAllData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await myDb.ref('/users').once('value');
      const userList = Object.values(res.val()).filter(
        val => val._id !== _user._id,
      );
      setData(userList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [_user.email]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const RenderItem = ({item = {displayName: '', email: '', photoURL: ''}}) => {
    const {displayName, email, photoURL} = item;
    return (
      <CardChat name={displayName} email={email} photo={photoURL} {...item} />
    );
  };
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={RenderItem}
        // ListEmptyComponent={() => {
        //   return <EmptyComponent search />;
        // }}
        ListHeaderComponent={() => {
          return <HeaderChat />;
        }}
      />
    </SafeAreaView>
  );
}
