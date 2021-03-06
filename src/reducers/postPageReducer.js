import {
  ADD_NEW_COMMENT_SUCCESSFUL,
  GET_SELECTED_POST_SUCCESSSUL,
  CLOSE_POST
} from "../constants/constants";

const initialState = {
  selectedPost: []
};

export const postPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_POST_SUCCESSSUL:
      return {
        ...action.payload
      };
    case ADD_NEW_COMMENT_SUCCESSFUL:
      return { ...state, comments: [...state.comments, action.payload] };
    case CLOSE_POST:
      return { selectedPost: [] };
    default:
      return state;
  }
};
