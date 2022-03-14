import React from "react";
// import { Link } from "react-router-dom";
import Banner from "./Banner";
import MainView from "./MainView";
import Tags from "./Tags";
import { useDispatch, useSelector } from "react-redux";
import agent from "../../agent";
import {
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
} from "../../constants/actionTypes";

const Home = () => {
  const dispatch = useDispatch();
  const { common, home } = useSelector((state) => state);
  const onClickTag = (tag, pager, payload) => {
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
  };
  React.useEffect(() => {
    const tab = common?.token ? "feed" : "all";
    const articlePromise = common?.token
      ? agent.Articles.feed
      : agent.Articles.all;
    dispatch({
      type: HOME_PAGE_LOADED,
      tab,
      articlePromise,
      payload: Promise.all([agent.Tags.getAll(), articlePromise()]),
    });
  }, []);

  return (
    <div className="home-page">
      <Banner appName={common?.appName} token={common?.token} />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <MainView />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Tags tags={home?.tags} onClickTag={onClickTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
