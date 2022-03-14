import { combineReducers } from "redux";

import auth from "./reducers/auth";
import common from "./reducers/common";

const combine = combineReducers({
  auth,
  common,
});

export default combine;
