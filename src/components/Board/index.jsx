import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllPosts, removeCard } from "../../actions/postsActions";
import { Card } from "../../components";
import "./Board.scss";

const Board = ({ data, getAllPosts }) => {
  useEffect(getAllPosts, []);
  const postData = data.posts;

  return (
    <div className="board">
      {postData && postData.length
        ? postData.map(post => {
            if (post.title || post.body)
              return (
                <div key={post.id}>
                  <Card post={post} key={post.id} />
                </div>
              );
            return 0;
          })
        : "Постов нет"}
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.posts
});

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts()),
  removeCard: id => dispatch(removeCard(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
