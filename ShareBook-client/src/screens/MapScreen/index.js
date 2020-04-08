/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, AsyncStorage, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { render } from 'react-dom';

// Advanced

function MapScreen() {
  // const [isToken, setIsToken] = React.useState(false);
  React.useLayoutEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        console.log(value);
        if (value !== null) {
          console.log('토큰 있다');
        } else {
          console.log('null?', value);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  // console.log(isToken);

  return (
    // <View>{isToken ? <Text>MapScreen</Text> : <Text>get out here!</Text>}</View>
    <View>
      <Text>dddd</Text>
    </View>
  );
}

export default MapScreen;
