import {
  ADD_NEW_COMMENT_SUCCESSFUL,
  GET_SELECTED_POST_SUCCESSSUL
} from "../constants/constants";

const initialState = {
  selectedPost: []
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_POST_SUCCESSSUL:
      return {
        ...action.payload
      };
    case ADD_NEW_COMMENT_SUCCESSFUL:
      return { ...state, comments: [...state.comments, action.payload] };
    default:
      return state;
  }
};
