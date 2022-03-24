import React from "react";
import { Link } from "react-router-dom";
import ArticleActions from "./ArticleActions";

const ArticleMeta = ({ article, canModify }) => {
  return (
    <div className="article-meta">
      <Link to={`/@${article?.author?.username}`}>
        <img src={`${article?.author?.image}`} />
      </Link>
      <div className="info">
        <Link to={`/@${article?.author?.username}`} className="author">
          {article?.author?.username}
        </Link>
        <span className="date">
          {new Date(article?.cereatedAt).toDateString()}
        </span>
      </div>
      <ArticleActions canModify={canModify} article={article} />
      {/* <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; Follow {article?.author?.username}{" "}
        <span className="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp; Favorite Post <span className="counter">(29)</span>
      </button> */}
    </div>
  );
};

export default ArticleMeta;
