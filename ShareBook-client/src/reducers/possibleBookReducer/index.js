// action types
export const ADD_POSSIBLE_STORE = 'ADD_POSSIBLE_STORE';
export const PICK_POSSIBLE_BOOK = 'PICK_POSSIBLE_BOOK';
export const RESET_POSSIBLE = 'RESET_POSSIBLE';

// action creators
export const addPossibleStore = books => ({
  type: ADD_POSSIBLE_STORE,
  payload: books,
});
export const pickPossibleBook = bookId => ({
  type: PICK_POSSIBLE_BOOK,
  payload: bookId,
});
export const resetPossible = () => ({
  type: RESET_POSSIBLE,
});

// state
const initialState = { current: [], possibleBookStore: [] };

// action
const possibleBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POSSIBLE_STORE':
      return {
        ...state,
        possibleBookStore: action.payload,
        // store: action.payload,
      };
    case 'PICK_POSSIBLE_BOOK':
      return {
        ...state,
        current: state.possibleBookStore.filter(
          a => a.id === action.payload,
        )[0],
      };
    case 'RESET_POSSIBLE':
      return initialState;
    default:
      return state;
  }
};

export default possibleBookReducer;
