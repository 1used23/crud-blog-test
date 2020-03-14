import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { addNewPost } from "../../actions/postsActions";

import "./NewCard.scss";

const NewCard = ({ addNewPost, nextId }) => {
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleSetTitleValue = e => {
    const value = e.target.value;
    setTitleValue(value);
  };

  const handleSetTextValue = e => {
    const value = e.target.value;
    setTextValue(value);
  };

  const handleClick = () => {
    if (titleValue && textValue) {
      const cardData = {
        title: titleValue,
        body: textValue,
        id: nextId
      };
      addNewPost(cardData);
    }
  };

  return (
    <div className="new-card">
      <div className="new-card__form">
        <TextField
          label="Title"
          value={titleValue}
          onChange={handleSetTitleValue}
        />
        <TextField
          label="Text"
          multiline
          value={textValue}
          onChange={handleSetTextValue}
        />

        <Button className="new-card__button" onClick={handleClick}>
          Add New Card
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addNewPost: ({ title, body, id }) => dispatch(addNewPost({ title, body, id }))
});

const mapStateToProps = state => {
  if (state.posts.length) {
    return {
      nextId: state.posts.posts[0].id + 1
    };
  } else {
    return {};
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);
