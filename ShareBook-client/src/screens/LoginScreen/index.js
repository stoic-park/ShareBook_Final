/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  AsyncStorage,
  Image,
} from 'react-native';
import { TextField } from 'react-native-materialui-textfield';
import axios from 'axios';

const url = 'http://13.209.74.88:4000';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  display: {
    flex: 0.8,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    // backgroundColor: '#B0E0E6',
  },
  buttons: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },

  paragraph: {
    color: '#DB7093',
    textAlign: 'center',
    fontSize: 50,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold',
  },
});

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLogin, setIsLogin] = React.useState('false');

  const submitUserData = {
    email: email,
    password: password,
  };
  // const fakeuser = {
  //   email: '5@gmail.com',
  //   password: '1234',
  // };

  const postSignInRequest = submitUserData => {
    return (
      axios
        .post(`${url}/users/signin`, submitUserData)
        // .then(res => console.log(res.status))

        .then(res => {
          // console.log(res.data.token); jwt 토큰
          const storeData = async () => {
            try {
              await AsyncStorage.setItem('@storage_Key', res.data.token);
            } catch (e) {
              console.log(e);
            }
          };

          if (res.status === 200) {
            storeData();
            console.log(
              '------------------------------------------------------------',
            );
            console.log(AsyncStorage);
            console.log(
              '------------------------------------------------------------',
            );

            setIsLogin('true');
            Alert.alert('로그인 성공');
          }
        })
        .catch(err => {
          if (err.response.status === 400) {
            Alert.alert('회원이 아닙니다.');
          } else {
            Alert.alert(err);
          }
        })
    );
  };

  const checkUserInfo = () => {
    if (email === '' || password === '') {
      Alert.alert('입력하지 않은 부분이 있는지 확인하세요.');
      console.log('입력하지 않은 부분이 있는지 확인하세요.');
    } else {
      // 유저 데이터 전송시 값
      console.log(submitUserData);
      // 유저 데이터 전송
      postSignInRequest(submitUserData);
    }
  };

  if (isLogin === 'false') {
    return (
      <>
        {/* <View style={{ backgroundColor: '#FFE4E1', flex: 1 }}> */}
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            // borderColor: 'grey',
            // borderWidth: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              margin: 20,
              // borderColor: 'grey',
              // borderWidth: 10,
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                // borderColor: 'grey',
                // borderWidth: 10,
                marginTop: 30,
                margin: 10,
              }}
            >
              <Image
                // source={require('../../../assets/logo/sharebookLogo3.png')}
                source={require('../../../assets/logo/고래1.png')}
                style={{
                  // borderColor: 'grey',
                  // borderWidth: 10,
                  height: 200,
                  width: 250,
                  flex: 1,
                  // marginTop: 30,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                // borderColor: 'grey',
                // borderWidth: 10,
                margin: 10,
              }}
            >
              <TextField
                style={{ flex: 1 }}
                // lineWidth={{10}}
                // label="Email"
                label="이메일 주소"
                value={email}
                onChangeText={setEmail}
                tintColor="#DB7093"
              />
              <TextField
                style={{ flex: 1 }}
                // label="Password"
                label="비밀번호"
                // value={password}
                value={`${password.replace(/[0-9a-zA-Z가-힣]/, '*')}`}
                onChangeText={setPassword}
                tintColor="#DB7093"
              />
            </View>
            <View
              style={{
                flex: 1,
                // marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
                // borderColor: 'grey',
                // borderWidth: 10,
                margin: 10,
              }}
            >
              <View
                style={{
                  // marginTop: 10,
                  width: 200,
                  // marginBottom: 20,
                }}
              >
                <Button
                  title="로그인하기"
                  // color="#FA8072"
                  color="#DB7093"
                  onPress={() => checkUserInfo(submitUserData)}
                />
              </View>

              <View
                style={{
                  marginTop: 10,
                  width: 200,
                }}
              >
                <Button
                  title="회원가입하기"
                  // color="#FA8072"
                  color="#C71585"
                  onPress={() => {
                    // props.state.address = '';
                    navigation.navigate('SignUp');
                  }}
                />
              </View>
              {/* <View style={{ flex: 0.3 }}></View> */}
            </View>
          </View>
        </View>
      </>
    );
  }

  if (isLogin === 'true') {
    return (
      // <View style={styles.buttons}>
      //   <Button
      //     title="welcome to Share-book"
      //     onPress={() => {
      //       navigation.navigate('TabNav');
      //     }}
      //   />
      // </View>
      <View>{navigation.navigate('TabNav')}</View>
    );
  }
}

export default LoginScreen;
