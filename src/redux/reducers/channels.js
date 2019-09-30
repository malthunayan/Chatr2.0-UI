import { FETCH_CHANNELS } from "../actions/actionTypes";

const initialState = {
  allChannels: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      const newChannels = payload;
      return {
        ...state,
        allChannels: newChannels
      };
    default:
      return state;
  }
};

export default reducer;
