import { FETCH_CHANNELS, FETCH_CHANNEL } from "../actions/actionTypes";

const initialState = {
  allChannels: [],
  currentChannel: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      const newChannels = payload;
      return {
        ...state,
        allChannels: newChannels
      };
    case FETCH_CHANNEL:
      const newChannel = payload;
      return {
        ...state,
        currentChannel: newChannel
      };
    default:
      return state;
  }
};

export default reducer;
