import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { closePost } from "../../actions/postsActions";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components";
import {
  IconButton,
  Typography,
  Paper,
  TextField,
  Button
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "./PostPage.scss";

const PostPage = ({ closePost }) => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState();
  const [commentValue, setCommentValue] = useState();

  const getSinglePost = () => {
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
      .then(result => setSinglePost(result))
      .catch(error => console.log("error", error));
  };

  const newComment = () => {
    if (!commentValue) {
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ postId: +id, body: commentValue });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://simpleblogapi.herokuapp.com/comments", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));
  };

  useEffect(getSinglePost, []);

  return (
    <div className="post-page">
      {singlePost && (
        <>
          <div className="post-page__comeback">
            <Link to="/">
              <IconButton
                onClick={() => {
                  closePost();
                }}
              >
                <ArrowBackIcon className="" />
              </IconButton>
            </Link>
          </div>
          <Card post={singlePost} />
          <div className="post-page__comments">
            <Typography className="post-page__comments_title" variant="h4">
              Comments
            </Typography>

            {singlePost.comments.map(comment => {
              return (
                <Paper className="post-page__comments_el" key={comment.id}>
                  {comment.body}
                </Paper>
              );
            })}
            <div className="post-page__comments_input">
              <TextField
                multiline
                value={commentValue}
                onChange={e => {
                  setCommentValue(e.currentTarget.value);
                }}
              />
              <Button
                onClick={() => {
                  newComment();
                  setCommentValue("");
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  closePost: () => dispatch(closePost())
});

export default connect(null, mapDispatchToProps)(PostPage);
