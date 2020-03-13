import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

import "./NewCard.scss";

const NewCard = () => {
  const [isShow, setIsShow] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const newPost = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: titleValue,
      body: textValue
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://simpleblogapi.herokuapp.com/posts", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));
  };

  const handleClick = () => {
    if (titleValue && textValue) {
      newPost();
    }
    setIsShow(!isShow);
  };

  return (
    <div className="new-card">
      <div className="new-card__form">
        <Button className="new-card__button" onClick={() => handleClick()}>
          Add New Card
        </Button>
        {isShow && (
          <>
            <TextField
              label="Title"
              value={titleValue}
              onChange={e => setTitleValue(e.currentTarget.value)}
            />
            <TextField
              label="Text"
              multiline
              value={textValue}
              onChange={e => setTextValue(e.currentTarget.value)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NewCard;
