import {
  ADD_NEW_POST_REQUEST,
  ADD_NEW_POST_SUCCESSFUL,
  ADD_NEW_POST_FAILED,
  GET_ALL_POST_SUCCESSFUL,
  REMOVE_POST,
  OPEN_POST,
  CLOSE_POST
} from "../constants/constants";

export const getAllPosts = () => dispatch => {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("https://simpleblogapi.herokuapp.com/posts", requestOptions)
    .then(response => response.json())
    .then(result =>
      dispatch({
        type: GET_ALL_POST_SUCCESSFUL,
        payload: result.reverse()
      })
    )
    .catch(error => console.log("error", error));
};

export const removeCard = id => dispatch => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(`https://simpleblogapi.herokuapp.com/posts/${id}`, requestOptions)
    .then(response => response.text())
    .then(() => {
      dispatch({
        type: REMOVE_POST,
        payload: id
      });
    })
    //.then(result => console.log(result))
    .catch(error => console.log("error", error));
};

export const addNewPost = ({ title, body }) => dispatch => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title,
    body
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  dispatch({
    type: ADD_NEW_POST_REQUEST
  });

  fetch("https://simpleblogapi.herokuapp.com/posts", requestOptions)
    .then(response => response.text())
    .then(() => {
      dispatch({
        type: ADD_NEW_POST_SUCCESSFUL,
        payload: {
          title,
          body
        }
      });
    })
    .catch(error => {
      dispatch({
        type: ADD_NEW_POST_FAILED
      });
      console.log("error", error);
    });
};
