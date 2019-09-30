import axios from "axios";
import { FETCH_CHANNELS, FETCH_CHANNEL } from "./actionTypes";
import { setErrors } from "./errors";

export const fetchAllChannels = fetch => {
  return async dispatch => {
    if (fetch) {
      try {
        const res = await axios.get(
          "https://api-chatr.herokuapp.com/channels/"
        );
        const channels = res.data;
        dispatch({
          type: FETCH_CHANNELS,
          payload: channels
        });
      } catch (error) {
        console.error(error);
        dispatch(setErrors(error));
      }
    } else {
      dispatch({ type: FETCH_CHANNELS, payload: [] });
    }
  };
};

export const fetchChannel = channelID => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}`
      );
      const channel = res.data;
      dispatch({
        type: FETCH_CHANNEL,
        payload: channel
      });
    } catch (error) {
      console.error(error);
    }
  };
};
