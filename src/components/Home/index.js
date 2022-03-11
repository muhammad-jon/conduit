import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import MainView from "./MainView";
import Tags from "./Tags";

const Home = () => {
  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <MainView />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
