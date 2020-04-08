import React, { useState, useEffect } from 'react';
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
  TextInput,
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-material-ui';
import { createStackNavigator } from '@react-navigation/stack';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
  addChatMy,
  pickChatMy,
  resetChatMy,
} from '../../reducers/MyChatReducer/index';
// import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import socketIO from 'socket.io-client';

// Server URL
const url = 'http://13.209.74.88:4000';

// let rooms = [
//   { id: 0, roomname: '팀장31', bookname: '미움받을용기' },
//   { id: 1, roomname: '레고티비11', bookname: '11분(양장본HardCover)' },
//   { id: 2, roomname: '범진51', bookname: '지우개 따먹기 법칙(작은도서관 33)' },
// ];

// let messages = [
//   { id: 0, roonname: '팀장31', username: '팀장', message: '안녕하세요' },
//   { id: 1, roonname: '팀장31', username: '레고티비', message: '반갑습니다' },
//   {
//     id: 2,
//     roonname: '팀장31',
//     username: '팀장',
//     message: '책을 빌리고 싶습니다',
//   },
//   {
//     id: 3,
//     roonname: '팀장31',
//     username: '레고티비',
//     message: '어디서 만날까요',
//   },
//   {
//     id: 4,
//     roonname: '팀장31',
//     username: '팀장',
//     message: 'ㅇㅇ역 3번 출구에서 만나요',
//   },
// ];

function myBookChat(props) {
  const { MyChatStore } = props.state;
  // React.useEffect(() => {
  //   // props.addChatMy(rooms);
  // }, []);

  return (
    <View
      style={{
        backgroundColor: '#FFE4E1',
        flex: 1,
        // borderColor: 'grey',
        // borderWidth: 3,
      }}
    >
      <FlatList
        data={MyChatStore}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              // borderColor: 'grey',
              // borderWidth: 3,
              margin: 10,
            }}
          >
            <TouchableOpacity
              onPress={function() {
                props.pickChatMy(item.id);
                props.navigation.navigate('내책채팅방');
              }}
            >
              <Card
                style={{
                  container: {
                    borderRadius: 5,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                }}
              >
                <Text>{item.bookname} 빌린 사람과 대화</Text>
              </Card>
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

function ModalScreen(props) {
  // console.log(props.state);
  const { current } = props.state;
  // 메세지 관련 스테이트
  const [message, setMessage] = useState('');
  const [getMessage, setGetMessage] = useState([]);
  // const { nickname, msg } = this.state;

  // 1. 개설요청
  const socket = socketIO.connect('http://13.209.74.88:4000/chat');
  console.log(socket);
  socket.on('hahaha', () => {
    console.log('an GGick hi nae');
  });
  // 보내는 거
  // handleSubmitMessage = () => {
  //   // nickname : 보내는 사람 이름
  //   // msg : 입력한 텍스트
  //   socket.emit('chat message', { nickname, msg });
  //   // rooname, username
  //   // socekt.emit
  // };

  // 받는 거
  // 1. db에 저장됐던 메세지 데이터들을 랜더한 뒤에 소켓을 이용한 실시간 채팅 데이터를 랜더 한다
  // 2. db에 저장됐던 메세지들을 랜더한 뒤에 소켓을 이용한 실시간 채팅데이터를 바로 리덕스에 추가한다음 랜더한다

  // socket.on("chat message", ({ nickname, msg }) => {
  //   this.setState({
  //     chat: [...this.state.chat, { nickname, msg }]
  //   });
  // });

  // useEffect(() => {
  //   (async () => {
  //     socket.on('chat message', ({ nickname, msg }) => {
  //       setGetMessage({ nickname, msg });
  //     });
  //   })();
  // }, []);

  return (
    <View
      style={{
        flex: 11,
        // borderWidth: 1,
        // borderColor: 'red',
        // margin: 5,
        backgroundColor: '#FFE4E1',
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          // justifyContent: 'space-between',
          // justifyContent: 'space-between',
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
          {/* <Text>OOO 님과의 대화입니다 </Text>
          <Text>대화가 시작됩니다 </Text> */}
          <Text>{current.bookname} 대여 희망자와</Text>
          <Text>대화가 시작됩니다 </Text>
          {/* <Text>{current}님과의 대화입니다 </Text> */}
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
            {/* <Text>뒤 로</Text> */}
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
          data={messages}
          keyExtractor={item => item.id.toString()}
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
                <Text>{item.username}</Text>
                <Text>{item.message}</Text>
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
          // value={message}
          // onChangeText={sendMessage => setMessage(sendMessage)}
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
          // onPress={() => handleSubmitMessage(message)}
          >
            <Ionicons
              name="ios-checkmark-circle-outline"
              size={40}
              color="#DB7093"
            ></Ionicons>
          </TouchableOpacity>
        </View>
        {/* socket.emit */}
      </View>
    </View>
  );
}

const MainStack = createStackNavigator();

function mapStateToProps(state) {
  return {
    state: state.MyChatReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addChatMy: addChatMy,
      pickChatMy: pickChatMy,
      resetChatMy: resetChatMy,
    },
    dispatch,
  );
}

const MyBookChat = connect(mapStateToProps, mapDispatchToProps)(myBookChat);
const modal = connect(mapStateToProps, mapDispatchToProps)(ModalScreen);

function StackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MyChat" component={MyBookChat} />
      <MainStack.Screen name="내책채팅방" component={modal} />
    </MainStack.Navigator>
  );
}

export default StackScreen;
