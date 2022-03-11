import React from "react";
import { Link } from "react-router-dom";

const ArticlePreview = () => {
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <Link to="/profile">
            <img src="http://i.imgur.com/Qr71crq.jpg" />
          </Link>
          <div className="info">
            <Link to="" className="author">
              Eric Simons
            </Link>
            <span className="date">January 20th</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart"></i> 29
          </button>
        </div>
        <Link to="" className="preview-link">
          <h1>How to build webapps that scale</h1>
          <p>This is the description for the post.</p>
          <span>Read more...</span>
        </Link>
      </div>
    </>
  );
};

export default ArticlePreview;
