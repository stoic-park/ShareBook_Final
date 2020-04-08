import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import possibleBook from './possibleBook';
import lentedBook from './lentedBook';
import BorrowRequestedBook from './BorrowRequestedBook';
import uploeadBook from './uploadBook';
import ReturnRequestedBook from './ReturnRequestedBook';

const Tab = createMaterialTopTabNavigator();

function MyBookScreen() {
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
      <Tab.Screen name="대여가능" component={possibleBook} />
      <Tab.Screen name="대여중" component={lentedBook} />
      <Tab.Screen name="대여요청" component={BorrowRequestedBook} />
      <Tab.Screen name="반납요청" component={ReturnRequestedBook} />
      <Tab.Screen name="책 등록" component={uploeadBook} />
    </Tab.Navigator>
  );
}

export default MyBookScreen;
