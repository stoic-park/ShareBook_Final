// 액션
export const GET_ADDRESS = 'GET_ADDRESS';
export const SET_ADDRESS = 'SET_ADDRESS';

// 액션함수
export const getAddress = address => ({
  type: GET_ADDRESS,
  payload: address,
});

export const setAddress = () => ({
  type: SET_ADDRESS,
});

// 초기값
const initialState = '';

// 리듀서
const getAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: '',
      };
    default:
      return state;
  }
};
export default getAddressReducer;
