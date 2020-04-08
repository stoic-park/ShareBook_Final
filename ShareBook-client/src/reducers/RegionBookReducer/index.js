export const PICKBOOK = 'PickBook';
export const SEARCHBOOK = 'SearchBook';
export const ADDSTORE = 'AddStore';
export const PICKBOOK2 = 'PickBook2';
export const ADDLENT = 'AddLent';

// action functions
export const pickBook = bookId => ({
  type: PICKBOOK,
  payload: bookId,
});

export const pickBook2 = bookId => ({
  type: PICKBOOK2,
  payload: bookId,
});

export const searchBook = search => ({
  type: SEARCHBOOK,
  payload: search,
});

export const addStore = books => ({
  type: ADDSTORE,
  payload: books,
});

export const addLent = books => ({
  type: ADDLENT,
  payload: books,
});

// initial state
const initialState = {
  search: '',
  current: {},
  books: [],
  store: [],
  lentStore: [],
};

// action
const regionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PICKBOOK:
      return {
        ...state,
        current: state.books.filter(a => a.id === action.payload)[0],
      };
    case PICKBOOK2:
      return {
        ...state,
        lentCurrent: state.lentStore.filter(a => a.id === action.payload)[0],
      };
    case SEARCHBOOK:
      return {
        ...state,
        search: action.payload,
        books: state.store.filter(a => a.name.includes(action.payload)),
      };
    case ADDSTORE:
      return {
        ...state,
        books: action.payload,
        store: action.payload,
      };
    case ADDLENT:
      return {
        ...state,
        lentStore: action.payload,
      };
    default:
      return state;
  }
};

export default regionReducer;
