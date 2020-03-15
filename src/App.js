import React from "react";
import "./App.scss";
import { NewPost, Board, PostPage } from "./components";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <NewPost />
        <Board />
      </Route>

      <Route path="/posts/:id">
        <PostPage />
      </Route>
    </div>
  );
}

export default App;
