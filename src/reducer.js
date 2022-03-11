import { combineReducers } from "redux";

import auth from "./reducers/auth";

const combine = combineReducers({
  auth,
});

export default combine;
