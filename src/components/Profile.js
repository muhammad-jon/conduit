import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import agent from "../agent";
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from "../constants/actionTypes";
import ArticleList from "./ArticleList";

const EditProfileSettings = ({ isUser }) => {
  if (isUser) {
    return (
      <Link
        to={`/settings`}
        className={`btn btn-sm btn-outline-secondary action-btn`}
      >
        <i className="ion-gear-a"></i>Edit profile settings
      </Link>
    );
  }
  return null;
};
const FollowUserButton = ({ isUser, user, unfollow, follow }) => {
  if (isUser) {
    return null;
  }
  let classes = "btn btn-sm action-btn";
  if (user?.following) {
    classes += " btn-secondary";
  } else {
    classes += " btn-outline-secondary";
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (user?.following) {
      unfollow(user?.username);
    } else {
      follow(user?.username);
    }
  };

  return (
    <button className={classes} onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp; {user?.following ? "Unfollow" : "Follow"} {user?.username}
    </button>
  );
};
const Tabs = ({ profile }) => {
  {
    <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <Link className="nav-link active" to={`/@${profile?.username}`}>
          My Articles
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={`/@${profile?.username}`}>
          Favorited Articles
        </Link>
      </li>
    </ul>;
  }
};
const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  const {
    articleList: globalArticleList,
    common: globalCommon,
    profile: globalProfile,
  } = useSelector((state) => state);

  const onFollow = (username) => {
    dispatch({ type: FOLLOW_USER, payload: agent.Profile.follow(username) });
  };
  const onUnFollow = (username) => {
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username),
    });
  };
  useEffect(() => {
    dispatch({
      type: PROFILE_PAGE_LOADED,
      payload: Promise.all([
        agent.Profile.get(params?.username),
        agent.Articles.byAuthor(params?.username),
      ]),
    });
  }, []);

  if (!globalProfile) {
    return null;
  }
  const isUser =
    globalCommon?.currentUser &&
    globalProfile?.username === globalCommon?.currentUser?.username;
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={globalProfile?.image}
                className="user-img"
                alt={globalProfile?.username}
              />
              <h4>{globalProfile?.username}</h4>
              <p>{globalProfile?.bio}</p>
              <EditProfileSettings isUser={isUser} />
              <FollowUserButton
                isUser={isUser}
                user={globalProfile}
                follow={onFollow}
                unfollow={onUnFollow}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <Tabs profile={globalProfile} />
            </div>

            <ArticleList
              pager={globalArticleList?.pager}
              articles={globalArticleList?.articles}
              articleCount={globalArticleList?.articleCount}
              state={globalArticleList?.currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
