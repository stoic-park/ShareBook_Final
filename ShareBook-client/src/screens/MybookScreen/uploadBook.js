/* eslint-disable guard-for-in */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  // Button,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import { TextField } from 'react-native-materialui-textfield';
import { RadioButton } from 'react-native-paper';
import { getTheme, ListItem, Button, Card } from 'react-native-material-ui';
import Postcode from 'react-native-daum-postcode';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { bindActionCreators } from 'redux';
import { Searchbar } from 'react-native-paper';
import {
  addUploadStore,
  pickUploadBook,
  resetUpload,
  getAddressBook,
  getAddressImage,
} from '../../reducers/uploadBookReducer/index'; // action creator
import { Ionicons } from '@expo/vector-icons';
import { addPossibleStore } from '../../reducers/possibleBookReducer/index';
// import { Ionicons } from '@expo/vector-icons';

// 책 주소 입력하기
let searchAddress;
function AddressModal(props) {
  const handlePostCode = data => {
    searchAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
    props.getAddressBook(searchAddress);
    props.navigation.goBack();
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
      <Postcode
        style={{ width: 400 }}
        jsOptions={{ animated: true }}
        onSelected={data => handlePostCode(data)}
      />
    </View>
  );
}

// 카메라
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

// const theme = getTheme();

// FIX_ME
const API_KEY = 'FIX_ME';
// Server URL
const url = 'http://13.209.74.88:4000';

// 카메라
function cameraScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  // // 찍은 이미지 경로
  const [path, setPath] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const snap = async () => {
    const { status_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (camera) {
      const photo = await camera.takePictureAsync({
        quelity: 1,
        exif: true,
      });
      setPath(`${photo.uri}`);
      const asset = await MediaLibrary.createAssetAsync(`${photo.uri}`);
      console.log(path);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }} tabBarVisible>
      <StatusBar animated hidden />
      <Camera
        ref={ref => {
          setCamera(ref);
        }}
        style={{ flex: 1 }}
        type={type}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}
              Flip{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              snap();
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}
              Snap{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}
              Done{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

function ModalScreen(props) {
  const { books } = props.state;
  return (
    <View style={{ backgroundColor: '#FFE4E1', flex: 1 }}>
      <View
        style={{
          // flex: 1,
          margin: 20,
          justifyContent: 'space-between',
          marginTop: 30,
          marginBottom: 50,
          // backgroundColor: '#E6E6FA',
        }}
      >
        <FlatList
          data={books}
          keyExtractor={item => item.isbn}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                paddingTop: 10,
                marginLeft: 10,
                marginRight: 10,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.5,
              }}
            >
              <Card>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      props.pickBook(item.isbn);
                      props.navigation.navigate('책 올리기');
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', flex: 1, padding: 10 }}
                    >
                      <Image
                        style={{ flex: 1 }}
                        source={{
                          uri: item.thumbnail,
                          width: 50,
                          height: 100,
                          resizeMode: 'stretch',
                        }}
                      />
                      <View style={{ flex: 3, padding: 10 }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            textAlign: 'auto',
                            fontWeight: 'bold',
                            flex: 2,
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text style={{ flex: 1 }}>{item.publisher}</Text>
                        <Text style={{ flex: 1 }}>{item.authors}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          )}
        />
        <View style={{ alignItems: 'center' }}>
          <Button
            raised
            primary
            style={{
              container: {
                // alignItems: 'center',
                borderRadius: 20,
                width: 100,
                margin: 5,
                // marginBottom: 50,
                // backgroundColor: '#87CEFA',
                // backgroundColor: '#DDA0DD',
                // backgroundColor: '#9400D3',
                // backgroundColor: '#FFB6C1',
                backgroundColor: '#DB7093',
              },
            }}
            text="돌아가기"
            onPress={() => props.navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
}

// Main Component
function uploadBook(props) {
  // console.log(props);
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [authors, setAuthors] = useState('');
  const [bookStatus, setbookStatus] = useState('');
  const [description, setDescription] = useState('');
  const [searchText, setSearchText] = useState('');
  const { current } = props.state;
  const { resUri, setResUri } = useState({});
  //
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  // 찍은 이미지 경로
  const [path, setPath] = useState('');
  // 선택한 이미지
  const [gallery, setGallery] = useState('');

  // 접근 허용
  const checkPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const pickImage = async () => {
    const { status_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (!result.cancelled) {
      // setTimeout(setGallery(result), 100);
      setGallery(result);
      console.log('pick image Success', gallery);
    }
  };

  const showAlert = () => {
    // 카메라, 갤러리 접근 허가
    checkPermission();
    Alert.alert(
      null,
      'Select menu',
      [
        {
          text: 'Camera',
          onPress: () => props.navigation.navigate('카메라'),
        },
        { text: 'Gallery', onPress: () => pickImage() },
      ],
      { cancelable: true },
    );
  };

  const handleSearchBook = input => {
    axios(
      `https://dapi.kakao.com/v3/search/book?target=title&query=${input.searchText}`,
      {
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      },
    ).then(res => {
      const results = res.data.documents;
      props.addStore(results);
    });
  };

  const handleUriRequest = () => {
    // console.log(props);
    const formData = new FormData();
    formData.append('photo', {
      name: gallery.uri,
      type: 'image/jpeg',
      uri: gallery.uri,
    });
    axios
      .post(`${url}/upload`, formData, {
        header: { 'content-type': 'multipart/form-Data' },
      })
      .then(res => {
        console.log(res.data);
        // setResUri(res.data);
        props.getAddressImage(res.data);
        Alert.alert(null, '사진이 등록 됐습니다');
      });
  };

  const handleSubmitBookInfo = input => {
    // title, publisher, authors, bookStatus, description, addressImage, addressBook
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        // console.log(value); // 토큰

        if (value !== null) {
          console.log('토큰이 존재합니다');

          const submitBookData = {
            name: current.title,
            publisher: current.publisher,
            writer: `${current.authors}`,
            quelity: input.bookStatus,
            description: input.description,
            image: props.state.addressImage,
            bookRegion: props.state.addressBook,
          };

          let isChk = true;

          // eslint-disable-next-line no-restricted-syntax
          for (const key in submitBookData) {
            console.log(key, '의 값은' + submitBookData[key] + '입니다.');

            if (
              submitBookData[key] === 'undefined' ||
              submitBookData[key] === ''
            ) {
              isChk = false;
            }
          }

          console.log(isChk);
          // 위에 반복문을 돌렸을 때 빈 값이 있으면 알람창을 띄우고 밑에 코드를 실행하지 않아야함
          // 위에 반목문이 끝났을 때 이상이 없을 때 밑에 코드를 실행해야함
          if (isChk === true) {
            axios
              .post(`${url}/books/registerBook`, submitBookData, {
                headers: { token: value },
              })
              // .then(res => {
              //   console.log(res);
              //   console.log(res.status);
              // })
              .then(res => {
                axios
                  .get(`${url}/books/lists-owner-CanLend`, {
                    headers: { token: value },
                  })
                  .then(res => {
                    console.log(res.data);
                    props.addPossibleStore(res.data);
                    // getData();
                    props.reset();
                    Alert.alert(
                      '책 등록 요청',
                      `${current.title} 이 등록됐습니다!`,
                      [
                        {
                          text: '확인',
                          onPress: () => {
                            props.navigation.navigate('대여가능');
                            props.reset();
                          },
                        },
                      ],
                    );
                  })
                  .catch(function(error) {
                    console.log(error.message);
                  });
              });
          } else {
            Alert.alert('입력되지 않은 내용이 있는지 확인해주세요.');
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    // 초기화 우찌 시키지?
  };

  return (
    <View
      style={{
        backgroundColor: '#FFE4E1',
      }}
    >
      <View style={{ margin: 15 }}>
        <ScrollView>
          <Card
            style={{
              container: { borderRadius: 10, margin: 10, padding: 5 },
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 30,
                marginRight: 30,
                // backgroundColor: 'white',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                {/* <TextField
            label="검색"
            style={{ flex: 1 }}
            value={searchText}
            onChangeText={searchText => setSearchText(searchText)}
          /> */}
                <Searchbar
                  style={{ flex: 2 }}
                  placeholder="검색"
                  value={searchText}
                  onChangeText={searchText => setSearchText(searchText)}
                  iconColor="#DB7093"
                  onIconPress={() => {
                    props.reset();
                    handleSearchBook({ searchText });
                    props.navigation.navigate('모달');
                  }}
                />
                {/* <Button
                  raised
                  primary
                  text="검색"
                  style={{
                    flex: 1,
                    container: {
                      borderRadius: 10,
                      width: 60,
                      marginLeft: 5,
                      backgroundColor: '#DB7093',
                      // backgroundColor: '#87CEFA',
                    },
                  }}
                  onPress={function() {
                    props.reset();
                    handleSearchBook({ searchText });
                    props.navigation.navigate('모달');
                  }}
                /> */}
              </View>

              <View>
                <TextField
                  style={{ flex: 1 }}
                  label="책 이름"
                  value={current.title}
                  tintColor="#DB7093"
                  // onChangeText={title => setBookname(title)}
                />
                <TextField
                  style={{ flex: 1 }}
                  label="출판사"
                  tintColor="#DB7093"
                  value={current.publisher}
                  // onChangeText={publisher => setPublisher(publisher)}
                />
                <TextField
                  style={{ flex: 1 }}
                  label="작가"
                  tintColor="#DB7093"
                  value={current === '' ? '' : `${current.authors}`}
                />
                <TextField
                  style={{ flex: 1 }}
                  label="책 상태"
                  tintColor="#DB7093"
                  value={bookStatus}
                  // onChangeText={bookStatus => setbookStatus(bookStatus)}
                />
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <RadioButton.Item
                    style={{}}
                    label="좋음"
                    value="좋음"
                    status={bookStatus === '좋음' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setbookStatus('좋음');
                    }}
                  />
                  <RadioButton.Item
                    style={{}}
                    label="보통"
                    value="보통"
                    status={bookStatus === '보통' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setbookStatus('보통');
                    }}
                  />
                  <RadioButton.Item
                    style={{}}
                    label="나쁨"
                    value="나쁨"
                    status={bookStatus === '나쁨' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setbookStatus('나쁨');
                    }}
                  />
                </View>

                <TextField
                  style={{ flex: 1 }}
                  label="책 설명"
                  tintColor="#DB7093"
                  value={description}
                  onChangeText={description => setDescription(description)}
                />
                <View
                  style={{
                    flex: 5,
                    alignItems: 'center',
                    margin: 20,
                  }}
                >
                  <Image
                    source={{ uri: gallery.uri }}
                    style={{
                      width: 200,
                      height: 250,
                      flex: 3,
                      resizeMode: 'cover',
                      borderColor: 'grey',
                      borderWidth: 0.5,
                      margin: 10,
                    }}
                  />
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Button
                      raised
                      primary
                      text="사진 선택"
                      style={{
                        flex: 1,
                        container: {
                          borderRadius: 20,
                          width: 100,
                          margin: 5,
                          backgroundColor: '#DB7093',
                          // backgroundColor: '#87CEFA',
                        },
                      }}
                      onPress={() => {
                        showAlert();
                      }}
                    />
                    <Button
                      raised
                      primary
                      text="사진 등록"
                      style={{
                        flex: 1,
                        container: {
                          borderRadius: 20,
                          width: 100,
                          margin: 5,
                          backgroundColor: '#C71585',
                          // backgroundColor: '#87CEFA',
                        },
                      }}
                      value={gallery}
                      onPress={gallery => {
                        handleUriRequest(gallery);
                      }}
                    />
                  </View>
                </View>
                <TextField
                  numberOfLines={2}
                  style={{ flex: 1 }}
                  label="사진 경로"
                  tintColor="#DB7093"
                  value={props.state.addressImage}
                />
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 5 }}>
                      <TextField
                        style={{ flex: 1 }}
                        label="지역"
                        tintColor="#DB7093"
                        value={props.state.addressBook}
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
                          props.navigation.navigate('주소모달');
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

                  <View
                    style={{
                      alignItems: 'center',
                      // flexDirection: 'row',
                      // flex: 1,
                    }}
                  >
                    {/* <Button
                      raised
                      primary
                      style={{
                        flex: 1,
                        container: {
                          borderRadius: 20,
                          width: 100,
                          margin: 5,
                          backgroundColor: '#DB7093',
                          // backgroundColor: '#87CEFA',
                        },
                      }}
                      text="지역 찾기"
                      onPress={() => {
                        props.navigation.navigate('주소모달');
                      }}
                    /> */}
                    <Button
                      raised
                      primary
                      text="등록하기"
                      style={{
                        flex: 1,
                        container: {
                          borderRadius: 20,
                          width: 100,
                          margin: 5,
                          backgroundColor: '#C71585',
                          // backgroundColor: '#87CEFA',
                        },
                      }}
                      onPress={() => {
                        handleSubmitBookInfo({
                          bookStatus,
                          description,
                        });
                        // props.reset();
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    state: state.uploadBookReducer,
    statePossible: state.possibleBookReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addStore: addUploadStore,
      pickBook: pickUploadBook,
      reset: resetUpload,
      getAddressBook: getAddressBook,
      getAddressImage: getAddressImage,
      addPossibleStore: addPossibleStore,
    },
    dispatch,
  );
}

const Modals = connect(mapStateToProps, mapDispatchToProps)(ModalScreen);
const UploadBook = connect(mapStateToProps, mapDispatchToProps)(uploadBook);
const Address = connect(mapStateToProps, mapDispatchToProps)(AddressModal);

const MainStack = createStackNavigator();

function StackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode="modal"
    >
      <MainStack.Screen name="책 올리기" component={UploadBook} />
      <MainStack.Screen name="모달" component={Modals} />
      <MainStack.Screen name="주소모달" component={Address} />
      <MainStack.Screen
        name="카메라"
        component={cameraScreen}
        navigationOptions={{ header: null, tabBarVisible: false }}
      />
    </MainStack.Navigator>
  );
}

export default StackScreen;
