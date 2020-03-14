import { combineReducers } from "redux";
import { postsReducer } from "./postsReducer";
import { commentsReducer } from "./commentsReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer
});

export default rootReducer;
