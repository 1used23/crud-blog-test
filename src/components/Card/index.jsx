import {
  Button,
  Card as CardUI,
  IconButton,
  Typography
} from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";
import { removeCard } from "../../actions/postsActions";
import { connect } from "react-redux";

const Card = ({ post, single, removeCard }) => {
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
              onClick={() => {
                removeCard(post.id);
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

const mapDispatchToProps = dispatch => ({
  removeCard: id => dispatch(removeCard(id))
});

export default connect(null, mapDispatchToProps)(Card);
