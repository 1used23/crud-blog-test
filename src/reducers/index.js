import { combineReducers } from "redux";
import { postsReducer } from "./postsReducer";
import { postPageReducer } from "./postPageReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  selectedPost: postPageReducer
});

export default rootReducer;
