import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./actionTypes";

import { setErrors } from "./errors";

// const instance = axios.create({
//   baseURL: "https://api-chatr.herokuapp.com/"
// });

export const checkForExpiredToken = () => {
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;
    user = jwt_decode(token);
    if (user.exp >= currentTimeInSeconds) {
      return setCurrentUser(token);
    }
  }
  return logout();
};

export const authorization = (userData, type, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/${type}/`,
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      history.replace("/");
    } catch (err) {
      console.error(err);
    }
  };
};

export const logout = () => setCurrentUser();

const setCurrentUser = token => {
  let user;
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
    user = jwt_decode(token);
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    user = null;
  }

  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
