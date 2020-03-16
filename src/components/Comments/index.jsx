import React, { useState } from "react";
import { connect } from "react-redux";
import { addNewComment } from "../../actions/postPageActions";
import { Typography, TextField, Paper, Button } from "@material-ui/core";

import "./Comments.scss";

const Comments = ({ comments, id, addNewComment }) => {
  const [commentValue, setCommentValue] = useState();

  const newComment = () => {
    if (!commentValue) {
      return;
    }
    const commentData = {
      postId: id,
      id: (comments[0] && comments[comments.length - 1].id + 1) || 0,
      body: commentValue
    };
    addNewComment(commentData);
  };
  return (
    <div className="comments">
      <Typography className="comments__title" variant="h4">
        Comments
      </Typography>

      {comments.map(comment => {
        return (
          <Paper className="comments__el" key={comment.id}>
            {comment.body}
          </Paper>
        );
      })}
      <div className="comments__input">
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
  );
};

const mapDispatchToProps = dispatch => ({
  addNewComment: ({ postId, id, body }) =>
    dispatch(addNewComment({ postId, id, body }))
});

export default connect(null, mapDispatchToProps)(Comments);
