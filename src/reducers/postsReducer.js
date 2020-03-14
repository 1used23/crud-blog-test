import {
  ADD_NEW_POST_REQUEST,
  ADD_NEW_POST_SUCCESSFUL,
  ADD_NEW_POST_FAILED,
  GET_ALL_POST_SUCCESSFUL,
  REMOVE_POST,
  CLOSE_POST
} from "../constants/constants";

const initialState = {
  posts: [],
  isLoading: false,
  isError: false
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_POST_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case ADD_NEW_POST_SUCCESSFUL:
      console.log(state);
      return {
        ...state,
        posts: [action.payload].concat(state.posts),
        // posts: state.posts.concat([action.payload]),
        isLoading: false,
        isError: false
      };
    case ADD_NEW_POST_FAILED:
      return { ...state, isLoading: false, isError: true };
    case GET_ALL_POST_SUCCESSFUL:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
        isLoading: false,
        isError: false
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case CLOSE_POST:
      return { posts: [] };
    default:
      return state;
  }
};
