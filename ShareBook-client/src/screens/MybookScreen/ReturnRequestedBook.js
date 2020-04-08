import * as React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  AsyncStorage,
} from 'react-native';
// import { getTheme } from 'react-native-material-kit';
import { createStackNavigator } from '@react-navigation/stack';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
  pickReturn,
  StoreReturn,
} from '../../reducers/ReturnRequestedBookReducer/index';
import {
  Button,
  ListItem,
  ListItemAvatar,
  Card,
} from 'react-native-material-ui';
import {
  addPossibleStore,
  pickPossibleBook,
  resetPossible,
} from '../../reducers/possibleBookReducer/index';
import { Ionicons } from '@expo/vector-icons';

// const theme = getTheme();
// 1. 내가 빌린 책 목록 페이지 구성하기

const url = 'http://13.209.74.88:4000';

const styles = {
  cardStyle: {
    cardImageStyle: {
      height: 90,
      width: 90,
      flexDirection: 'row',
      resizeMode: 'center',
    },
  },
};

function MyLentBookScreen(props) {
  const { storeReturn } = props.state;
  React.useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        console.log(value);
        if (value !== null) {
          console.log('토큰 있다');
          axios
            .get(`${url}/books/lists-owner-askedToReturn`, {
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
    // axios('http://10.0.0.2:3000/books/lists-owner-askedToReturn')
    //   .then((books) => {
    //     props.add(books);
    //   })
    // setTimeout(() => {
    //   props.add(books);
    // }, 500);
  }, []);
  return (
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
                      .get(`${url}/books/lists-owner-askedToReturn`, {
                        headers: { token: value },
                      })
                      .then(bookss => {
                        //console.log(bookss.data);
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
            <Ionicons name="md-refresh" size={20} color="#DB7093"></Ionicons>
          </TouchableOpacity>
        </View>
        <FlatList
          // contentContainerStyle={{ paddingBottom: 25, paddingTop: 10 }}
          data={storeReturn}
          renderItem={({ item }) => (
            <View
              style={{
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
                    props.picks(item.id);
                    props.navigation.navigate('modal');
                  }}
                  style={{ margin: 10 }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <Image
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
  );
}

function ModalScreen(props) {
  const { current } = props.state;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
      }}
    >
      <View style={{ flex: 2, width: '100%' }}>
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
            //style={theme.cardImageStyle}
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
          style={{ paddingLeft: 35, paddingRight: 35, flex: 1, width: 350 }}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', marginLeft: 0 }}>출판사</Text>
          <Text style={{ margin: 0 }}>{current.publisher}</Text>
          <Text style={{ fontWeight: 'bold', marginLeft: 0 }}>책 상태</Text>
          <Text style={{ margin: 0 }}>{current.quelity}</Text>
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
          onPress={function() {
            const getData = async () => {
              try {
                const value = await AsyncStorage.getItem('@storage_Key');
                console.log(value);
                if (value !== null) {
                  console.log('토큰 있다');
                  axios
                    .post(
                      `${url}/books/acceptToReturn`,
                      {
                        id: current.id,
                      },
                      { headers: { token: value } },
                    )
                    .then(book => {
                      axios
                        .get(`${url}/books/lists-owner-askedToReturn`, {
                          headers: { token: value },
                        })
                        .then(bookss => {
                          console.log(bookss.data);
                          props.add(bookss.data);
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
                          // props.addPossibleStore(bookss.data);
                        })
                        .catch(function(error) {
                          console.log(error.message);
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
            // axios.put({
            //   method: 'postt',
            //   url: 'localhost:3000/books/acceptToReturn',
            //   data: {
            //     id: current.id,
            //   },
            // });
            alert('반납 요청이 수락 됐습니다');
            props.navigation.goBack();
          }}
          text="수락하기"
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

const MainStack = createStackNavigator();

function mapStateToProps(state) {
  return {
    state: state.returnRequestReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      picks: pickReturn,
      add: StoreReturn,
      addStore: addPossibleStore,
    },
    dispatch,
  );
}

const Modals = connect(mapStateToProps, mapDispatchToProps)(ModalScreen);
const List = connect(mapStateToProps, mapDispatchToProps)(MyLentBookScreen);

function ReturnRequestedBook() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Lent Books" component={List} />
      <MainStack.Screen name="modal" component={Modals} />
      <MainStack.Screen name="ImageModal" component={ImageModal} />
    </MainStack.Navigator>
  );
}

export default ReturnRequestedBook;
