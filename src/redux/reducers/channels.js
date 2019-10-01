import {
  FETCH_CHANNELS,
  FETCH_CHANNEL,
  SET_LOADING,
  CREATE_NEW_CHANNEL,
  SEND_MESSAGE
} from "../actions/actionTypes";

const initialState = {
  allChannels: [],
  currentChannel: [],
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      return {
        ...state,
        allChannels: payload,
        loading: false
      };
    case FETCH_CHANNEL:
      return {
        ...state,
        currentChannel: payload,
        loading: false
      };
    case CREATE_NEW_CHANNEL:
      return {
        ...state,
        allChannels: state.allChannels.concat(payload)
      };
    case SEND_MESSAGE:
      return {
        ...state,
        currentChannel: state.currentChannel.concat(payload)
      };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default reducer;
