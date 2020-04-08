// 액션 + 리듀서
export const PICK = 'Pick';
export const STORE = 'Store';
// action functions
export const pick = bookId => ({
  type: PICK,
  payload: bookId,
});

export const Store = books => ({
  type: STORE,
  payload: books,
});

// initial state
const initialState = {
  current: {},
  books: [],
  store: [],
};

// action
const borrowRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case PICK:
      return {
        ...state,
        current: state.books.filter(a => a.id === action.payload)[0],
      };
    case STORE:
      return {
        ...state,
        books: action.payload,
        store: action.payload,
      };
    default:
      return state;
  }
};

export default borrowRequestReducer;
