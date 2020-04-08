// action types
export const ADD_CHAT_LENT = 'ADD_CHAT_LENT';
export const PICK_CHAT_LENT = 'PICK_CHAT_LENT';
export const RESET_CHAT_LENT = 'RESET_CHAT_LENT';

// action creators
export const addChatLent = rooms => ({
  type: ADD_CHAT_LENT,
  payload: rooms,
});
export const pickChatLent = roomId => ({
  type: PICK_CHAT_LENT,
  payload: roomId,
});
export const resetChatLent = () => ({
  type: RESET_CHAT_LENT,
});

// state
const initialState = { current: [], LentChatStore: [] };

// action
const LentChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHAT_LENT':
      return {
        ...state,
        LentChatStore: action.payload,
      };
    case 'PICK_CHAT_LENT':
      return {
        ...state,
        current: state.LentChatStore.filter(a => a.id === action.payload)[0],
      };
    case 'RESET_CHAT_LENT':
      return initialState;
    default:
      return state;
  }
};

export default LentChatReducer;
