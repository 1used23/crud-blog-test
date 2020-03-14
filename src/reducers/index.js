import { combineReducers } from "redux";
import { postsReducer } from "./postsReducer";
import { commentsReducer } from "./commentsReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  selectedPost: commentsReducer
});

export default rootReducer;
