import {View, Text, StatusBar, RefreshControl, FlatList} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderChat from '../../components/HeaderChat';
import {myDb} from '../../helpers/DB';
import {useDispatch, useSelector} from 'react-redux';
import CardChat from '../../components/CardChat';
import {setChoosenUser} from '../Home/redux/action';
import EmptyComponent from '../../components/EmptyComponent';

export default function Dashboard({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {_user} = useSelector(state => state.login);
  const {_choosenUser} = useSelector(state => state.home);

  const dispatch = useDispatch();

  const getAllData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await myDb
        .ref(`contactRooms/${_user.displayName}`)
        .once('value');
      setData(res.val().contact);
      console.log(res.val());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [_user.email]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const selectedUser = item => {
    dispatch(setChoosenUser(item));
    navigation.navigate('Chat');
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

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    getAllData();
    setRefresh(false);
  };

  console.log('INI DATA User: ', _user);
  console.log('INI DATA Choosen: ', _choosenUser);
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        data={data}
        keyExtractor={item => item._id}
        renderItem={RenderItem}
        ListEmptyComponent={() => {
          return <EmptyComponent />;
        }}
        ListHeaderComponent={() => {
          return (
            <HeaderChat
              title="Chat"
              // onChangeText={text => searchFilter(text)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
