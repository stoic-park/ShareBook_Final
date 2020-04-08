/* eslint-disable no-use-before-define */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import TabNav from './src/screens/index';
import LoginScreen from './src/screens/LoginScreen';
import SignUp from './src/screens/LoginScreen/SignUp';
import allReducer from './src/reducers';

const store = createStore(allReducer, applyMiddleware(logger));
const StackNav = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <StackNav.Screen name="LoginScreen" component={LoginScreen} />
          <StackNav.Screen name="SignUp" component={SignUp} />
          <StackNav.Screen name="TabNav" component={TabNav} />
        </StackNav.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
