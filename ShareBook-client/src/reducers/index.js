import { combineReducers } from 'redux';
import getAddressReducer from './LoginReducer';
import uploadBookReducer from './uploadBookReducer';
import regionReducer from './RegionBookReducer';
import possibleBookReducer from './possibleBookReducer';
import lentedBookReducer from './lentedBookReducer';
import borrowRequestReducer from './BorrowRequestedBookReducer';
import returnRequestReducer from './ReturnRequestedBookReducer';
import MyChatReducer from './MyChatReducer';
import LentChatReducer from './LentChatReducer';

const allReducers = combineReducers({
  getAddressReducer,
  uploadBookReducer,
  regionReducer,
  possibleBookReducer,
  lentedBookReducer,
  borrowRequestReducer,
  returnRequestReducer,
  MyChatReducer,
  LentChatReducer,
});

export default allReducers;
