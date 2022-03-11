import { Action } from "history";
import { agent } from "./agent";

import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "./constants/actionTypes";

//redux => sync
//middleware ==== sideEffect ( saga, thunk)

//view => dispatch (action ) => reducer = > Store -> redux
//view => dispatch (action ) => (middleware) = >reducer =>  Store -> middleware

const localStorageMiddleware = (store) => (next) => (action) => {};

function isPromise(v) {
  return v && typeof v.then === "function";
}
