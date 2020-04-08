/* eslint-disable object-shorthand */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  // Button,
  Text,
  Alert,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-materialui-textfield';
import { RadioButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Postcode from 'react-native-daum-postcode';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { getAddress } from '../../reducers/LoginReducer/index';
import { Ionicons } from '@expo/vector-icons';

let searchAddress;
const url = 'http://13.209.74.88:4000';

const styles = StyleSheet.create({
  display: {
    flex: 0.8,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    marginBottom: 30,
    // borderColor: 'grey',
    // borderWidth: 5,
  },
  buttons: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  paragraph: {
    // color: '#48D1CC',
    // color: '#FFE4E1',
    color: '#DB7093',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
  },
  check: {
    marginTop: 20,
    marginLeft: 100,
    marginRight: 100,
  },
});

// 행정구역 API 모달창 스크린

function ModalScreen(props) {
  const handleComplete = data => {
    searchAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
    // 원하는 주소값만 가져와서 보내주기
    props.getAddress(searchAddress);
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
      <Postcode
        style={{ width: 400 }}
        jsOptions={{ animated: true }}
        onSelected={data => handleComplete(data)}
      />
    </View>
  );
}
const MainStack = createStackNavigator();

function SignUp(props) {
  const [email, setEmail] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [name, setName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  // const [region, setRegion] = React.useState(''); 이 부분을 리덕스 사용

  const info = [email, nickname, name, gender, password, passwordCheck];

  const submitUserInfo = {
    name: name,
    nickname: nickname,
    email: email,
    password: password,
    gender: gender,
    region: props.state.address,
  };

  const checkInfo = () => {
    let chk = 'false';
    // eslint-disable-next-line react/destructuring-assignment
    if (password !== passwordCheck) {
      console.log('please check password!!');
      Alert.alert(
        '입력하신 비밀번호와 동일하지 않습니다. 다시 한번 확인해주세요.',
      );
    } else if (!email.includes('@', '.')) {
      console.log('이메일을 올바른 형식으로 입력해주세요.');
      Alert.alert('이메일을 올바른 형식으로 입력해주세요.');
    } else if (password.length < 4) {
      console.log('비밀번호는 네자리 이상 입력해주세요.');
      Alert.alert('비밀번호는 네자리 이상 입력해주세요.');
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in info) {
        if (info[key] === '') {
          chk = 'false';
          console.log(`입력하지 않은 부분이 있는지 다시 확인해주세요.`);
          Alert.alert(`입력하지 않은 부분이 있는지 다시 확인해주세요.`);
          break;
        } else {
          chk = 'ok';
        }
      }
    }
    // 회원가입 조건 충족하는지
    if (chk === 'ok') {
      chk = 'true';
    }
    return chk;
  };

  const postSignUpRequest = submitUserInfo => {
    return axios
      .post(`${url}/users/signup`, submitUserInfo)
      .then(res => {
        console.log('회원가입 완료');
        Alert.alert(`회원가입 완료`);
        console.log(submitUserInfo);

        props.navigation.goBack();
      })
      .catch(err => {
        if (err.response.status === 409) {
          Alert.alert('이미 존재하는 이메일입니다.');
        }
      });
  };

  return (
    <>
      {/* <View style={{ backgroundColor: '#FFE4E1', flex: 1 }}> */}
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          // borderColor: 'grey',
          // borderWidth: 5,
        }}
      >
        <ScrollView>
          <View style={styles.display}>
            {/* <Text style={styles.paragraph}>Sharebook</Text> */}
            <Text style={styles.paragraph}>회원가입</Text>
            <TextField
              // label="Email"
              label="이메일 주소"
              value={email}
              onChangeText={email => setEmail(email)}
              tintColor="#DB7093"
            />
            <TextField
              // label="Nickname"
              label="별명"
              value={nickname}
              onChangeText={nickname => setNickname(nickname)}
              tintColor="#DB7093"
            />
            <TextField
              label="Name"
              label="이름"
              value={name}
              onChangeText={name => setName(name)}
              tintColor="#DB7093"
            />
            <TextField
              // label="Gender"
              label="성별"
              value={gender}
              tintColor="#DB7093"
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RadioButton.Item
                style={{ flex: 1 }}
                label="남자"
                value="Man"
                status={gender === 'Man' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setGender('Man');
                }}
              />
              <RadioButton.Item
                style={{ flex: 1 }}
                label="여자"
                value="Woman"
                status={gender === 'Woman' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setGender('Woman');
                }}
              />
            </View>

            <TextField
              // label="Password"
              label="비밀번호"
              // value={password}
              value={`${password.replace(/[0-9a-zA-Z가-힣]/, '*')}`}
              onChangeText={password => setPassword(password)}
              tintColor="#DB7093"
            />
            <TextField
              // label="Password Check"
              label="비밀번호 확인"
              // value={passwordCheck}
              value={`${passwordCheck.replace(/[0-9a-zA-Z가-힣]/, '*')}`}
              onChangeText={passwordCheck => setPasswordCheck(passwordCheck)}
              tintColor="#DB7093"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ flex: 5 }}>
                <TextField
                  // label="Region"

                  label="우리 동네"
                  value={props.state.address} // region을 보여주기만 함 상태에 값은 넣지않은 상태
                  tintColor="#DB7093"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('modal');
                  }}
                >
                  <Ionicons
                    name="md-search"
                    size={30}
                    color="#DB7093"
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.check}> */}
            {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Button
                raised
                primary
                // color="#DB7093"
                style={{
                  flex: 1,
                  container: {
                    borderRadius: 20,
                    width: 200,
                    margin: 5,
                    backgroundColor: '#DB7093',
                    // backgroundColor: '#87CEFA',
                  },
                }}
                onPress={() => {
                  props.navigation.navigate('modal');
                }}
                // title="check address"
                // title="우리 동네 찾기"
                text="우리 동네 찾기"
              />
            </View> */}
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Button
                raised
                primary
                // title="Submit"
                // title="가입하기"
                text="가입하기"
                // color="#4169E1"
                // color="#C71585"
                style={{
                  flex: 1,
                  container: {
                    borderRadius: 20,
                    width: 200,
                    margin: 5,
                    backgroundColor: '#C71585',
                    // backgroundColor: '#87CEFA',
                  },
                }}
                onPress={() => {
                  if (checkInfo() === 'false') {
                    console.log('회원가입 실패');
                  } else if (props.state.address === undefined) {
                    console.log('주소데이터를 가져와주세요');
                    Alert.alert('주소데이터를 가져와주세요.');
                  } else {
                    // 회원정보 전송
                    // 전송 성공/실패 분기 => 메서드하나만들어서 거기 안에서 분기처리까지 하자
                    postSignUpRequest(submitUserInfo);
                  }
                }}
              />
            </View>
          </View>
          {/* <View style={styles.buttons}> */}
        </ScrollView>
      </View>
    </>
  );
}

const mapStateToProps = state => {
  return {
    state: state.getAddressReducer,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAddress: getAddress,
    },
    dispatch,
  );
};

const modalConnect = connect(mapStateToProps, mapDispatchToProps)(ModalScreen);
const signupConnect = connect(mapStateToProps, mapDispatchToProps)(SignUp);

function rootScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="signUp" component={signupConnect} />
      <MainStack.Screen name="modal" component={modalConnect} />
    </MainStack.Navigator>
  );
}

export default rootScreen;
