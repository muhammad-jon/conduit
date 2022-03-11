import React from "react";
import { Link } from "react-router-dom";
import ArticleList from "../ArticleList";
import ArticlePreview from "../ArticlePreview";

const MainView = () => {
  return (
    <>
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <Link className="nav-link disabled" to="">
              Your Feed
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="">
              Global Feed
            </Link>
          </li>
        </ul>
      </div>
      <ArticleList />
    </>
  );
};

export default MainView;
