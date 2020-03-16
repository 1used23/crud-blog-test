import React, { useEffect } from "react";
import { connect } from "react-redux";
import { closePost } from "../../actions/postPageActions";
import { getSelectedPost } from "../../actions/postPageActions";
import { Link, useParams } from "react-router-dom";
import { Card, Comments } from "../../components";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "./PostPage.scss";

const PostPage = ({ closePost, getSelectedPost, selectedPost }) => {
  const { id } = useParams();

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
          <Comments comments={selectedPost.comments} id={id} />
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  closePost: () => dispatch(closePost()),
  getSelectedPost: ({ id }) => dispatch(getSelectedPost({ id }))
});

const mapStateToProps = state => ({
  selectedPost: state.selectedPost
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
