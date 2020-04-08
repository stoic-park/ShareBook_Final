/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import * as React from 'react';
import { YellowBox } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyBookScreen from './MybookScreen';
import MyLentBookScreen from './MyLentBookScreen';
import RegionBookListScreen from './RegionBookListScreen';
import ChatScreen from './ChatScreen';
import { Ionicons } from '@expo/vector-icons';

YellowBox.ignoreWarnings(['Remote debugger']);

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '내가 올린 책') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === '내가 빌린 책') {
            iconName = focused ? 'ios-clock' : 'md-clock';
          } else if (route.name === '우리동네 책 빌리기') {
            iconName = focused ? 'ios-bicycle' : 'md-bicycle';
          } else if (route.name === '대화 목록') {
            iconName = focused ? 'ios-map' : 'md-map';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        // activeTintColor: '#9400D3',
        // activeTintColor: '#DDA0DD',
        activeTintColor: '#DB7093',
        // activeTintColor: '#87CEFA',
        // '#87CEFA' // #E6E6FA // #DDA0DD //#DB7093
        inactiveTintColor: 'gray',
        style: {
          // backgroundColor: 'white',
          // backgroundColor: '#E6E6FA',
        },
      }}
    >
      <Tab.Screen name="내가 올린 책" component={MyBookScreen} />
      <Tab.Screen name="내가 빌린 책" component={MyLentBookScreen} />
      <Tab.Screen name="우리동네 책 빌리기" component={RegionBookListScreen} />
      <Tab.Screen name="대화 목록" component={ChatScreen} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
