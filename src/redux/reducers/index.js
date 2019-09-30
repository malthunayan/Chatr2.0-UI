import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";
import channelsReducer from "./channels";

export default combineReducers({
  user: authReducer,
  errors: errorReducer,
  channel: channelsReducer
});
