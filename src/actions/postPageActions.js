import {
  ADD_NEW_COMMENT_SUCCESSFUL,
  GET_SELECTED_POST_SUCCESSSUL,
  CLOSE_POST
} from "../constants/constants";

export const closePost = () => dispatch => {
  dispatch({
    type: CLOSE_POST
  });
};

export const getSelectedPost = ({ id }) => dispatch => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(
    `https://simpleblogapi.herokuapp.com/posts/${id}?_embed=comments`,
    requestOptions
  )
    .then(response => response.json())
    .then(result =>
      dispatch({
        type: GET_SELECTED_POST_SUCCESSSUL,
        payload: result
      })
    )
    .catch(error => console.log("error", error));
};

export const addNewComment = ({ postId, id, body }) => dispatch => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ postId: +postId, body: body });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://simpleblogapi.herokuapp.com/comments", requestOptions)
    .then(response => response.text())
    .then(() => {
      dispatch({
        type: ADD_NEW_COMMENT_SUCCESSFUL,
        payload: {
          body,
          id
        }
      });
    });
};
