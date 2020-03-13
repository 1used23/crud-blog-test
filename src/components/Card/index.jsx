import React from "react";
import {
  Card as CardUI,
  Button,
  Typography,
  IconButton
} from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ post, single }) => {
  const deleteCard = cardId => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`https://simpleblogapi.herokuapp.com/posts/${cardId}`, requestOptions)
      .then(response => response.text())
      //.then(result => console.log(result))
      .catch(error => console.log("error", error));
  };
  return (
    <CardUI className="card">
      <Typography variant="h5" className="card__title">
        {post.title}
      </Typography>
      <div className="card__text">{post.body}</div>
      {!single && (
        <>
          <hr />
          <div className="card__bottom">
            <Link to={`posts/${post.id}`}>
              <Button>READ MORE</Button>
            </Link>
            <IconButton
              data-id={post.id}
              onClick={e => {
                deleteCard(e.currentTarget.dataset.id);
              }}
            >
              <DeleteOutline />
            </IconButton>
          </div>
        </>
      )}
    </CardUI>
  );
};

export default Card;
