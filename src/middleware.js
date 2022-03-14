import agent from "./agent";
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

//view => dispatch => middleware => reducer => store      {async_start, subtype: login}
//view(login) => dispatch (login ) => middleware(login) = > reducer(async_start) => store (async_start)

const promiseMiddleware = (store) => (next) => (action) => {
  if (isPromise(action.payload)) {
    console.log("herere");
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    console.log("herere");
    action.payload.then(
      (res) => {
        console.log("herere");
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      (error) => {
        console.log(error);
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );
    return;
  }
  next(action);
};

const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem("jwt", action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem("jwt", "");
    agent.setToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === "function";
}

export { promiseMiddleware, localStorageMiddleware };
