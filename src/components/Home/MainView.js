import React from "react";
import { Link } from "react-router-dom";
import ArticleList from "../ArticleList";
import ArticlePreview from "../ArticlePreview";
import agent from "../../agent";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TAB } from "../../constants/actionTypes";
// import { tab } from "@testing-library/user-event/dist/tab";

const YourFeedTab = ({ token, onTabClicked, tab }) => {
  if (token) {
    const clickHandler = (e) => {
      e.preventDefault();
      onTabClicked("feed", agent.Articles.feed, agent.Articles.feed());
    };
    return (
      <li className="nav-item">
        <a
          className={tab === "feed" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
          href=""
        >
          Your Feed
        </a>
      </li>
    );
  }
};
const GlobalFeedTab = ({ onTabClicked, tab }) => {
  const clickHandler = (e) => {
    e.preventDefault();
    onTabClicked("all", agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        className={tab === "all" ? "nav-link active" : "nav-link"}
        onClick={clickHandler}
        href=""
      >
        Globall Feed
      </a>
    </li>
  );
};
const TagFilterTab = ({ tag }) => {
  if (!tag) {
    return null;
  }
  return (
    <li className="nav-item">
      <a className={"nav-link active"} href="">
        {tag}
      </a>
    </li>
  );
};
const MainView = () => {
  const dispatch = useDispatch();
  const { home, common, articleList } = useSelector((state) => state);

  const onTabClicked = (tab, pager, payload) => {
    dispatch({ type: CHANGE_TAB, tab, pager, payload });
  };
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab
            token={common?.token}
            tab={articleList?.tab}
            onTabClicked={onTabClicked}
          />
          <GlobalFeedTab tab={articleList?.tab} onTabClicked={onTabClicked} />
          <TagFilterTab tag={articleList?.tag} />
        </ul>
      </div>
      <ArticleList
        pager={articleList?.pager}
        articles={articleList?.articles}
        loading={articleList?.loading}
        articlesCount={articleList?.articlesCount}
        currentPage={articleList?.currentPage}
      />
    </div>
  );
};

export default MainView;
