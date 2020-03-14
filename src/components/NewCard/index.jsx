import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { addNewPost } from "../../actions/postsActions";

import "./NewCard.scss";

const NewCard = ({ addNewPost }) => {
  const [isShow, setIsShow] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");

  // const newPost = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const raw = JSON.stringify({
  //     title: titleValue,
  //     body: textValue
  //   });

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow"
  //   };

  //   fetch("https://simpleblogapi.herokuapp.com/posts", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log("error", error));
  // };

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
        body: textValue
      };
      addNewPost(cardData);
    }
    setIsShow(!isShow);
  };

  return (
    <div className="new-card">
      <div className="new-card__form">
        <Button className="new-card__button" onClick={handleClick}>
          Add New Card
        </Button>
        {isShow && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addNewPost: ({ title, body }) => dispatch(addNewPost({ title, body }))
});

export default connect(null, mapDispatchToProps)(NewCard);
