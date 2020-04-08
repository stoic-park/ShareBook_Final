// 액션 + 리듀서
export const PICKRETURN = 'PickReturn';
export const STORERETURN = 'StoreReturn';
// action functions
export const pickReturn = bookId => ({
  type: PICKRETURN,
  payload: bookId,
});

export const StoreReturn = books => ({
  type: STORERETURN,
  payload: books,
});

// initial state
const initialState = {
  current: {},
  booksReturn: [],
  storeReturn: [],
};

// action
const returnRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case PICKRETURN:
      return {
        ...state,
        current: state.booksReturn.filter(a => a.id === action.payload)[0],
      };
    case STORERETURN:
      return {
        ...state,
        booksReturn: action.payload,
        storeReturn: action.payload,
      };
    default:
      return state;
  }
};

export default returnRequestReducer;
