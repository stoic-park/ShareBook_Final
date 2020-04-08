// action types
export const ADD_UPLOAD_STORE = 'ADD_UPLOAD_STORE';
export const PICK_UPLOAD_BOOK = 'PICK_UPLOAD_BOOK';
export const RESET_UPLOAD = 'RESET_UPLOAD';
export const GET_ADDRESS_BOOK = 'GET_ADDRESS_BOOK';
export const GET_ADDRESS_IMAGE = 'GET_ADDRESS_IMAGE';

// action creators
export const addUploadStore = books => ({
  type: ADD_UPLOAD_STORE,
  payload: books,
});
export const pickUploadBook = bookId => ({
  type: PICK_UPLOAD_BOOK,
  payload: bookId,
});
export const resetUpload = () => ({
  type: RESET_UPLOAD,
});
export const getAddressBook = address => ({
  type: GET_ADDRESS_BOOK,
  payload: address,
});
export const getAddressImage = image => ({
  type: GET_ADDRESS_IMAGE,
  payload: image,
});

// state
const initialState = {
  current: '',
  books: [],
  addressBook: '',
  addressImage: '',
};

// action
const uploadBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_UPLOAD_STORE':
      return {
        ...state,
        books: action.payload,
        // store: action.payload,
      };
    case 'PICK_UPLOAD_BOOK':
      return {
        ...state,
        current: state.books.filter(a => a.isbn === action.payload)[0],
      };
    case 'RESET_UPLOAD':
      return initialState;
    case 'GET_ADDRESS_BOOK':
      return {
        ...state,
        addressBook: action.payload,
      };
    case 'GET_ADDRESS_IMAGE':
      return {
        ...state,
        addressImage: action.payload,
      };
    default:
      return state;
  }
};

export default uploadBookReducer;
