import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 30,
          right: 30,
          elevation: 2,
          backgroundColor: '#fff',
          borderRadius: 25,
          height: 60,
          elevation: 1,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Ionicons
                name="ios-chatbubbles-outline"
                size={27}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => {
            return <Feather name="user" size={27} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
