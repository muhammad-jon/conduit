import React from "react";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import reducer from "./reducer";

const getMiddleware = () => {
  return applyMiddleware(
    promiseMiddleware,
    localStorageMiddleware,
    createLogger()
  );
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
