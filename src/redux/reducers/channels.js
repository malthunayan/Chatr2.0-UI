import {
  FETCH_CHANNELS,
  FETCH_MESSAGES,
  SET_LOADING,
  CREATE_NEW_CHANNEL,
  SEND_MESSAGE
  // FETCH_NEW_MESSAGES
} from "../actions/actionTypes";

const initialState = {
  allChannels: [],
  loadedChannels: [],
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      return {
        ...state,
        allChannels: payload
      };
    case FETCH_MESSAGES:
      const fetchedMessages = payload;
      let channels = state.loadedChannels;
      let oldMessages = channels.find(
        channel => channel.id === fetchedMessages.id
      );
      if (oldMessages) {
        // if (oldMessages.length !== fetchedMessages.length) {
        oldMessages.messages = oldMessages.messages.concat(
          fetchedMessages.messages
        );
        // }
      } else {
        channels = channels.concat(fetchedMessages);
      }
      return {
        ...state,
        loadedChannels: [...channels],
        loading: false
      };
    case CREATE_NEW_CHANNEL:
      return {
        ...state,
        allChannels: state.allChannels.concat(payload)
      };
    case SEND_MESSAGE:
      channels = state.loadedChannels;
      oldMessages = channels.find(channel => channel.id === payload.channel);
      oldMessages.messages = oldMessages.messages.concat(payload);
      return {
        ...state,
        loadedChannels: [...channels]
      };
    // case FETCH_NEW_MESSAGES:
    //   return {
    //     ...state,
    //     messages: state.messages.concat(payload)
    //   };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default reducer;
