import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import agent from "../../agent";
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import ArticleMeta from "./ArticleMeta";
import CommentContainer from "./CommentContainer";

const Article = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { article: globalArticle, common: globalCommon } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch({
      type: ARTICLE_PAGE_LOADED,
      payload: Promise.all([
        agent.Articles.get(params?.id),
        agent.Comments.forArticle(params?.id),
      ]),
    });
  }, []);

  if (!globalArticle?.article) {
    return null;
  }

  const markup = {
    __html: marked(globalArticle?.article?.body, { sanitize: true }),
  };
  const canModify =
    globalCommon?.currentUser &&
    globalCommon?.currentUser?.username ===
      globalArticle?.article?.author?.username;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{globalArticle?.article?.title}</h1>

          <ArticleMeta article={globalArticle?.article} canModify={canModify} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div dangerouslySetInnerHTML={markup}></div>
            <ul className="tag-list">
              {globalArticle?.article?.tagList?.map((tag) => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-md-12">
            <p>
              Web development technologies have evolved at an incredible clip
              over the past few years.
            </p>
            <h2 id="introducing-ionic">Introducing RealWorld.</h2>
            <p>It's a great solution for learning how other frameworks work.</p>
          </div>
        </div>

        <hr />
        {/* 
        <div className="article-actions">
          <div className="article-meta">
            <Link to="profile.html">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </Link>
            <div className="info">
              <Link to="" className="author">
                Eric Simons
              </Link>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div> */}

        <div className="row">
          {console.log("fsadf", globalArticle?.comments)}
          <CommentContainer
            comments={globalArticle?.comments || []}
            errors={globalArticle?.commentErrors}
            slug={params?.id}
            currentUser={globalCommon?.currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Article;
