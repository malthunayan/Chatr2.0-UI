import axios from "axios";
import {
  FETCH_CHANNELS,
  FETCH_CHANNEL,
  SET_LOADING,
  CREATE_NEW_CHANNEL,
  SEND_MESSAGE
} from "./actionTypes";
// import { setErrors } from "./errors";

export const fetchAllChannels = fetch => {
  return async dispatch => {
    if (fetch) {
      try {
        dispatch({
          type: SET_LOADING
        });
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
        // dispatch(setErrors(error));
      }
    } else {
      dispatch({ type: FETCH_CHANNELS, payload: [] });
    }
  };
};

export const fetchChannel = channelID => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_LOADING
      });
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}/`
      );
      const channel = res.data;
      dispatch({
        type: FETCH_CHANNEL,
        payload: channel
      });
    } catch (error) {
      console.error(error);
      // dispatch(setErrors(error));
    }
  };
};

export const createNewChannel = channelName => {
  return async dispatch => {
    try {
      const newChannel = { name: channelName };
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        newChannel
      );
      const channel = res.data;
      dispatch({
        type: CREATE_NEW_CHANNEL,
        payload: channel
      });
    } catch (error) {
      console.error(error);
      // dispatch(setErrors(error));
    }
  };
};

export const sendMessage = (channelID, message, user) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        message
      );
      const messageObject = {
        id: user.user_id,
        username: user.username,
        message: res.data.message,
        timestamp: new Date(),
        channel: channelID
      };
      dispatch({
        type: SEND_MESSAGE,
        payload: messageObject
      });
    } catch (error) {
      console.error(error);
      // dispatch(setErrors(error));
    }
  };
};
