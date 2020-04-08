/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, AsyncStorage, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { render } from 'react-dom';
import myBookChat from './myBookChat';
import lentBookChat from './lentBookChat';

// Advanced
// 내가 올린 책 / 내가 빌린 책

const Tab = createMaterialTopTabNavigator();

function ChatScreen() {
  return (
    <Tab.Navigator
      style={{ marginTop: 25 }}
      tabBarOptions={{
        style: {
          backgroundColor: 'white',
        },
        indicatorStyle: { backgroundColor: '#DB7093' },
      }}
    >
      <Tab.Screen name="내가 올린 책" component={myBookChat} />
      <Tab.Screen name="내가 빌린 책" component={lentBookChat} />
    </Tab.Navigator>
  );
}

export default ChatScreen;
