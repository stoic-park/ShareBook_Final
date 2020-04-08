import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  // Button,
  FlatList,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-material-ui';
import { createStackNavigator } from '@react-navigation/stack';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
  addPossibleStore,
  pickPossibleBook,
  resetPossible,
} from '../../reducers/possibleBookReducer/index';
import { Ionicons } from '@expo/vector-icons';
// Server URL
const url = 'http://13.209.74.88:4000';

function possibleBook(props) {
  const { possibleBookStore } = props.state;
  React.useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        console.log(value);
        if (value !== null) {
          console.log('토큰 있다');
          axios
            .get(`${url}/books/lists-owner-CanLend`, {
              headers: { token: value },
            })
            .then(res => {
              console.log(res.data);
              props.addStore(res.data);
            })
            .catch(function(error) {
              console.log(error.message);
            });
        } else {
          console.log('null?', value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    // <View style={{ backgroundColor: '#E6E6FA', flex: 1 }}>
    <View style={{ backgroundColor: '#FFE4E1', flex: 1 }}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              const getData = async () => {
                try {
                  const value = await AsyncStorage.getItem('@storage_Key');
                  console.log(value);
                  if (value !== null) {
                    console.log('토큰 있다');
                    axios
                      .get(`${url}/books/lists-owner-CanLend`, {
                        headers: { token: value },
                      })
                      .then(bookss => {
                        //console.log(bookss.data);
                        props.addStore(bookss.data);
                      })
                      .catch(function(error) {
                        console.log(error.message);
                      });
                  } else {
                    console.log('null?', value);
                  }
                } catch (e) {
                  console.log(e);
                }
              };

              getData();
            }}
          >
            <Ionicons name="md-refresh" size={20} color="#DB7093"></Ionicons>
          </TouchableOpacity>
        </View>
        <FlatList
          data={possibleBookStore}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                // padding: 10,
                // paddingTop: 10,
                // marginLeft: 10,
                // marginRight: 10,
                // borderBottomColor: 'grey',
                // borderBottomWidth: 0.5,
                marginBottom: 10,
              }}
            >
              <Card
                style={{
                  container: { borderRadius: 5 },
                }}
              >
                <TouchableOpacity
                  onPress={function() {
                    props.pickBook(item.id);
                    props.navigation.navigate('modal');
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={{ margin: 10 }}
                      resizeMode="center"
                      source={{ uri: item.image, width: 90, height: 90 }}
                    />
                    <View
                      style={{
                        width: '30%',
                        flex: 2,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          marginBottom: 5,
                        }}
                        numberOfLines={2}
                      >
                        {item.name}
                      </Text>
                      {/* <Text style={{ flex: 1 }}>{item.publisher}</Text> */}
                      <Text style={{ fontSize: 15 }}>{item.writer}</Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // marginLeft: 7,
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {item.quelity}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>
          )}
        />
      </View>
    </View>
  );
}

// 모달창 => 세부정보
// 세부정보 : 이미지, title, publisher, writer, quelity, description
function ModalScreen(props) {
  // console.log(props.state);
  const { current } = props.state;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
      }}
    >
      <View style={{ flex: 2, width: '100%' }}>
        <TouchableOpacity
          style={{
            top: 0,
            height: '100%',
            padding: 10,
            // backgroundColor: '#333221',
            backgroundColor: '#FFE4E1',
            // backgroundColor: '#E6E6FA',
          }}
          onPress={() =>
            props.navigation.navigate('ImageModal', {
              image: current.image,
            })
          }
        >
          <Image
            style={{
              resizeMode: 'contain',
              height: '100%',
            }}
            source={{ uri: current.image }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1.2 }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '700',
            paddingTop: 5,
          }}
        >
          {current.name}
        </Text>
        <Text
          style={{
            padding: 5,
            fontSize: 15,
            textAlign: 'center',
          }}
        >
          by {current.writer}
        </Text>
        <ScrollView
          style={{
            paddingLeft: 35,
            paddingRight: 35,
            flex: 1,
            width: 350,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', marginLeft: 0 }}>출판사</Text>
          <Text style={{ marginLeft: 0 }}>{current.publisher}</Text>
          <Text style={{ fontWeight: 'bold', marginLeft: 0 }}>책 상태</Text>
          <Text style={{ marginLeft: 0 }}>{current.quelity}</Text>
          <Text style={{ fontWeight: 'bold', marginLeft: 0 }}>책 정보</Text>
          <Text style={{ marginLeft: 0 }}>{current.description}</Text>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 0.3,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          padding: 5,
        }}
      >
        <Button
          raised
          primary
          style={{
            container: {
              borderRadius: 20,
              width: 100,
              margin: 5,
              // backgroundColor: '#87CEFA',
              // backgroundColor: '#DDA0DD',
              // backgroundColor: '#9400D3',
              // backgroundColor: '#FFB6C1',
              backgroundColor: '#DB7093',
            },
          }}
          onPress={() => props.navigation.goBack()}
          text="돌아가기"
        />
      </View>
    </View>
  );
}

function ImageModal({ navigation, route }) {
  return (
    <View
      style={{
        // backgroundColor: '#333221',
        // backgroundColor: '#E6E6FA',
        backgroundColor: '#FFE4E1',
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
      }}
    >
      <Image
        source={{ uri: route.params.image }}
        style={{
          marginTop: 30,
          height: '80%',
          width: '80%',
          resizeMode: 'contain',
        }}
      />
      <Button
        style={{
          container: {
            width: 100,
            borderRadius: 20,
            margin: 20,
            backgroundColor: '#DB7093',
            // backgroundColor: '#87CEFA',
            // backgroundColor: '#C71585',
          },
        }}
        raised
        primary
        text="돌아가기"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const MainStack = createStackNavigator();

function mapStateToProps(state) {
  return {
    state: state.possibleBookReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      pickBook: pickPossibleBook,
      addStore: addPossibleStore,
      reset: resetPossible,
    },
    dispatch,
  );
}

const PossibleBookList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(possibleBook);
const Modals = connect(mapStateToProps, mapDispatchToProps)(ModalScreen);

function StackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Possible Books" component={PossibleBookList} />
      <MainStack.Screen name="modal" component={Modals} />
      <MainStack.Screen name="ImageModal" component={ImageModal} />
    </MainStack.Navigator>
  );
}

export default StackScreen;
