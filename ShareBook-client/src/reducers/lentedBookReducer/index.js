// action types
export const ADD_LENTED_STORE = 'ADD_LENTED_STORE';
export const PICK_LENTED_BOOK = 'PICK_LENTED_BOOK';
export const RESET_LENTED = 'RESET_LENTED';

// action creators
export const addLentedStore = books => ({
  type: ADD_LENTED_STORE,
  payload: books,
});
export const pickLentedBook = bookId => ({
  type: PICK_LENTED_BOOK,
  payload: bookId,
});
export const resetLented = () => ({
  type: RESET_LENTED,
});

// state
const initialState = { current: [], lentedBookStore: [] };

// action
const lentedBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LENTED_STORE':
      return {
        ...state,
        lentedBookStore: action.payload,
        // store: action.payload,
      };
    case 'PICK_LENTED_BOOK':
      return {
        ...state,
        current: state.lentedBookStore.filter(a => a.id === action.payload)[0],
      };
    case 'RESET_LENTED':
      return initialState;
    default:
      return state;
  }
};

export default lentedBookReducer;
