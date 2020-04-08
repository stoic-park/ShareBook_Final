// action types
export const ADD_CHAT_MY = 'ADD_CHAT_MY';
export const PICK_CHAT_MY = 'PICK_CHAT_MY';
export const RESET_CHAT_MY = 'RESET_CHAT_MY';

// action creators
export const addChatMy = rooms => ({
  type: ADD_CHAT_MY,
  payload: rooms,
});
export const pickChatMy = roomId => ({
  type: PICK_CHAT_MY,
  payload: roomId,
});
export const resetChatMy = () => ({
  type: RESET_CHAT_MY,
});

// state
const initialState = { current: [], MyChatStore: [] };

// action
const MyChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHAT_MY':
      return {
        ...state,
        MyChatStore: action.payload,
      };
    case 'PICK_CHAT_MY':
      return {
        ...state,
        current: state.MyChatStore.filter(a => a.id === action.payload)[0],
      };
    case 'RESET_CHAT_MY':
      return initialState;
    default:
      return state;
  }
};

export default MyChatReducer;
