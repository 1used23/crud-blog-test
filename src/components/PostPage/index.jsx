import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { closePost } from "../../actions/postsActions";
import { addNewComment, getSelectedPost } from "../../actions/commentsActions";
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

const PostPage = ({
  closePost,
  addNewComment,
  getSelectedPost,
  selectedPost
}) => {
  const { id } = useParams();
  const [commentValue, setCommentValue] = useState();

  const newComment = () => {
    if (!commentValue) {
      return;
    }
    const commentData = {
      postId: id,
      id:
        (selectedPost.comments[0] &&
          selectedPost.comments[selectedPost.comments.length - 1].id + 1) ||
        0,
      body: commentValue
    };
    addNewComment(commentData);
  };

  useEffect(() => getSelectedPost({ id: id }), [id, getSelectedPost]);

  return (
    <div className="post-page">
      {selectedPost.comments && (
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
          <Card post={selectedPost} single />
          <div className="post-page__comments">
            <Typography className="post-page__comments_title" variant="h4">
              Comments
            </Typography>

            {selectedPost.comments.map(comment => {
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
  closePost: () => dispatch(closePost()),
  addNewComment: ({ postId, id, body }) =>
    dispatch(addNewComment({ postId, id, body })),
  getSelectedPost: ({ id }) => dispatch(getSelectedPost({ id }))
});

const mapStateToProps = state => ({
  selectedPost: state.selectedPost
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
