import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  AsyncStorage,
  Text,
  View,
  Image,
  // Button,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ListItem, Button, Subheader, Card } from 'react-native-material-ui';
// import { getTheme, Textfield, MKColor } from 'react-native-material-kit';
import { createStackNavigator } from '@react-navigation/stack';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
  pickBook,
  searchBook,
  addStore,
} from '../../reducers/RegionBookReducer/index';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';
import {
  addChatLent,
  pickChatLent,
  resetChatLent,
} from '../../reducers/LentChatReducer/index';

// 소켓

// 1. 지역 책 리스트 띄우고
// 2. 클릭했을 때 세부 정보 모달 창 뜨고
// 3. 대여 요청

const url = 'http://13.209.74.88:4000';

let messages = [
  // { id: 0, roonname: '팀장31', username: '팀장', message: '안녕하세요' },
  // { id: 1, roonname: '팀장31', username: '레고티비', message: '반갑습니다' },
  // {
  //   id: 2,
  //   roonname: '팀장31',
  //   username: '팀장',
  //   message: '책을 빌리고 싶습니다',
  // },
  // {
  //   id: 3,
  //   roonname: '팀장31',
  //   username: '레고티비',
  //   message: '어디서 만날까요',
  // },
  // {
  //   id: 4,
  //   roonname: '팀장31',
  //   username: '팀장',
  //   message: 'ㅇㅇ역 3번 출구에서 만나요',
  // },
];
const socket = io.connect('http://13.209.74.88:4000/');
// const socket = io.connect('http://10.0.2.2:6000');

function ChatModal(props) {
  const { current } = props.state;
  const [msgs, setMsg] = useState([]);
  const [text, setText] = useState('');
  // const [roomname, setRoomname] = useState('');

  useEffect(() => {
    socket.on('chat message', ({ nickname, msg }) => {
      setMsg(ms => [
        ...ms,
        {
          nickname,
          msg,
        },
      ]);
    });
  }, []);

  function onMessageSubmit() {
    const nick = '쉐어북';
    console.log(text);
    socket.emit('chat message', {
      nickname: nick,
      msg: text,
    });
    setText('');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFE4E1' }}>
      <View
        style={{
          flex: 11,
          marginTop: 15,
          backgroundColor: '#FFE4E1',
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            margin: 10,
            // borderWidth: 1,
            // borderColor: 'red',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'grey',
              flex: 5,
              alignItems: 'center',
            }}
          >
            <Text>" {current.name} " 책 주인과</Text>
            <Text>대화가 시작됩니다 </Text>
          </View>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'grey',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Ionicons name="md-arrow-round-back" size={30} color="#DB7093" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 8,
            // borderWidth: 1,
            // borderColor: 'red',
            // justifyContent: 'center',
          }}
        >
          <FlatList
            data={msgs}
            // keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  // alignItems: 'center',
                  // borderColor: 'red',
                  // borderWidth: 1,
                  margin: 10,
                  width: '90%',
                }}
              >
                <Card
                  style={{
                    container: {
                      borderRadius: 5,
                      width: '100%',
                      margin: 5,
                      padding: 5,
                    },
                  }}
                >
                  <Text>{item.nickname}</Text>
                  <Text>{item.msg}</Text>
                </Card>
              </View>
            )}
          ></FlatList>
        </View>
        <View
          style={{
            flex: 1,
            // borderWidth: 1,
            // borderColor: 'red',
            // alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            margin: 5,
          }}
        >
          <TextInput
            style={{ flex: 5 }}
            placeholder="    대화를 입력하세요"
            backgroundColor="white"
            value={text}
            onChangeText={setText}
          ></TextInput>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <TouchableOpacity
              // value={message}
              onPress={() => onMessageSubmit()}
            >
              <Ionicons
                name="ios-checkmark-circle-outline"
                size={40}
                color="#DB7093"
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

function ModalScreen(props) {
  const { current } = props.state;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        marginTop: 20,
      }}
    >
      <View style={{ flex: 2, width: '100%' }}>
        {/* <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'red',
          }}
        > */}
        <TouchableOpacity
          style={{
            top: 0,
            height: '100%',
            padding: 10,
            backgroundColor: '#FFE4E1',
            // backgroundColor: '#333221',
          }}
          onPress={() =>
            props.navigation.navigate('ImageModal', {
              image: current.image,
            })
          }
        >
          <Image
            source={{ uri: current.image }}
            style={{
              resizeMode: 'contain',
              height: '100%',
            }}
          />
        </TouchableOpacity>

        {/* </View> */}
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
            //width: '90%',
            // marginTop: 10,
            // marginBottom: 10,
            paddingLeft: 35,
            paddingRight: 35,
            flex: 1,
            width: 350,
            // backgroundColor: '#fffbfc',
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
          <Text style={{ marginLeft: 0 }}>{current.describtion}</Text>
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
              backgroundColor: '#DB7093',
            },
          }}
          // eslint-disable-next-line react/jsx-no-bind
          onPress={function() {
            // props.navigation.navigate('RequestModal');
            // axios({
            //   method: 'post',
            //   url: 'localhost:3000/books/requestToRental',
            //   data: {
            //     id: current.id
            //   },
            // });
            // props.navigation.goBack();
            const getData = async () => {
              try {
                const value = await AsyncStorage.getItem('@storage_Key');
                console.log(value);
                if (value !== null) {
                  console.log('토큰 있다');
                  axios
                    .post(
                      `${url}/books/requestToRental`,
                      {
                        id: current.id,
                      },
                      { headers: { token: value } },
                    )
                    .then(book => {
                      axios
                        .get(`${url}/books/listsInOurRegion`, {
                          headers: { token: value },
                        })
                        .then(bookss => {
                          console.log(bookss.data);
                          props.add(bookss.data);
                        });
                      console.log(book);
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
            alert(`${current.name} 대여 요청이 보내졌습니다`);

            props.navigation.goBack();
          }}
          text="대여 요청"
        />

        <Button
          raised
          primary
          style={{
            container: {
              borderRadius: 20,
              width: 100,
              margin: 5,
              backgroundColor: '#C71585',
            },
          }}
          text="대화하기"
          onPress={function() {
            // console.log(current.book.nickname);
            const getData = async () => {
              // let data = { id: 5, roomname: '안녕', bookname: current.name };
              // props.addChatLent(data);
              // try {
              //   const value = await AsyncStorage.getItem('@storage_Key');
              //   console.log(value);
              //   if (value !== null) {
              //     console.log('토큰 있다');
              //     axios
              //       .post(
              //         `${url}/chat`,
              //         {
              //           // roomname: current.book.nickname + current.id,
              //           // bookname: current.name,
              //         },
              //         { headers: { token: value } },
              //       )
              //       .then(res => {
              //         // res.data.roomname
              //         props.addChatLent(res.data);
              //       })
              //       .catch(function(error) {
              //         console.log(error.message);
              //       });
              //   } else {
              //     console.log('null?', value);
              //   }
              // } catch (e) {
              //   console.log(e);
              // }
            };
            getData();
            // Alert.alert('채팅하기', `${current.name} 채트 요청이 보내졌습니다`);
            // props.navigation.navigate('대화 목록');
            props.navigation.navigate('채팅');
          }}
        />

        <Button
          raised
          accent
          style={{ container: { borderRadius: 20, width: 100, margin: 5 } }}
          primary
          style={{
            container: {
              borderRadius: 20,
              width: 100,
              margin: 5,
              backgroundColor: '#DB7093',
              // backgroundColor: '#C71585',
            },
          }}
          onPress={() => props.navigation.goBack()}
          text="돌아가기"
        />
      </View>
    </View>
  );
}

const MainStack = createStackNavigator();

const styles = {
  cardStyle: {
    cardImageStyle: {
      height: 90,
      width: 90,
      flexDirection: 'row',
      resizeMode: 'center',
      // margin: 5,
    },
  },
};

function RegionBookListScreen(props) {
  const { books } = props.state;

  React.useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        console.log(value);
        if (value !== null) {
          console.log('토큰 있다');
          axios
            .get(`${url}/books/listsInOurRegion`, {
              headers: { token: value },
            })
            .then(bookss => {
              console.log(bookss.data);
              props.add(bookss.data);
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

    // axios
    //   .get('http://13.209.19.199:4000/books/listsInOurRegion')
    //   .then(bookss => {
    //     props.add(bookss);
    //   })
    //   .catch(function(error) {
    //     console.log(error.message);
    //   });
    // setTimeout(() => {
    //   props.add(boox);
    // }, 500);
  }, []);

  return (
    <View style={{ backgroundColor: '#FFE4E1', flex: 1 }}>
      <View style={{ flex: 1, marginBottom: 60 }}>
        <View style={{ backgroundColor: '#FFE4E1', flex: 1 }}>
          <View style={{ marginTop: 30, margin: 20 }}>
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
                          .get(`${url}/books/listsInOurRegion`, {
                            headers: { token: value },
                          })
                          .then(bookss => {
                            console.log(bookss.data);
                            props.add(bookss.data);
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
                <Ionicons
                  name="md-refresh"
                  size={20}
                  color="#DB7093"
                ></Ionicons>
              </TouchableOpacity>
            </View>
            {/* <Button
          raised
          primary
          style={{
            container: {
              borderRadius: 20,
              width: 100,
              margin: 5,
              backgroundColor: '#DB7093',
            },
          }}
          text="리프레시"
          onPress={() => {
            const getData = async () => {
              try {
                const value = await AsyncStorage.getItem('@storage_Key');
                console.log(value);
                if (value !== null) {
                  console.log('토큰 있다');
                  axios
                    .get(`${url}/books/listsInOurRegion`, {
                      headers: { token: value },
                    })
                    .then(bookss => {
                      console.log(bookss.data);
                      props.add(bookss.data);
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
        /> */}
            <TextInput
              // tintColor={MKColor.Lime}
              // textInputStyle={{ color: MKColor.Orange }}
              placeholder="책 검색"
              onChangeText={text => props.search(text)}
              style={{
                marginLeft: 20,
                marginRight: 20,
              }}
            />
            <Subheader
              style={{
                container: {
                  margin: 0,
                  padding: 0,
                  height: 35,
                },
              }}
              text={
                books[0]
                  ? `${books[0].bookRegion}에서 ${books.length}권의 책을 찾았습니다`
                  : `책을 찾지 못했습니다`
              }
              // text={`${books.length} books found ${books[0].bookRegion}`}
              // text={`${books.length} books found ${books[0].bookRegion}`}
            />
            <FlatList
              // contentContainerStyle={{ paddingBottom: 100 }}
              data={books}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <Card
                    style={{
                      container: { borderRadius: 5 },
                    }}
                  >
                    <TouchableOpacity
                      onPress={function() {
                        props.pick(item.id);
                        props.navigation.navigate('책');
                      }}
                      style={{
                        margin: 10,
                        // marginTop: 0,
                        // marginBottom: 0,
                        // borderBottomColor: 'grey',
                        // borderBottomWidth: 0.5,
                        // backgroundColor: '#FFFFF5',
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={styles.cardStyle.cardImageStyle}
                        />
                        <View
                          style={{
                            width: '30%',
                            flex: 2,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            padding: 10,
                            // marginLeft: 7,
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
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function ImageModal({ navigation, route }) {
  return (
    <View
      style={{
        backgroundColor: '#FFE4E1',
        // backgroundColor: '#333221',
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
            width: 90,
            borderRadius: 20,
            margin: 20,
            backgroundColor: '#DB7093',
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

function mapStateToProps(state) {
  return {
    state: state.regionReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      pick: pickBook,
      search: searchBook,
      add: addStore,
      // addBookName: addBookName,
      addChatLent: addChatLent,
    },
    dispatch,
  );
}
const ChatTab = connect(mapStateToProps, mapDispatchToProps)(ChatModal);
const Modals = connect(mapStateToProps, mapDispatchToProps)(ModalScreen);
const List = connect(mapStateToProps, mapDispatchToProps)(RegionBookListScreen);

function StackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {},
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}
      mode="modal"
    >
      <MainStack.Screen name="지역 책" component={List} />
      <MainStack.Screen name="책" component={Modals} />
      <MainStack.Screen name="ImageModal" component={ImageModal} />
      <MainStack.Screen name="채팅" component={ChatTab} />
    </MainStack.Navigator>
  );
}

export default StackScreen;
