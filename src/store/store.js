import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

export default store;
