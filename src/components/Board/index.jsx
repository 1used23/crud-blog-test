import React, { useEffect, useState } from "react";
import "./Board.scss";
import { Card } from "../../components";

const Board = () => {
  const getData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("https://simpleblogapi.herokuapp.com/posts", requestOptions)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState();

  return (
    <div className="board">
      {data && data.length
        ? data.reverse().map(post => {
            if (post.title || post.body)
              return <Card post={post} key={post.id} />;
            return 0;
          })
        : "Постов нет"}
    </div>
  );
};

export default Board;
