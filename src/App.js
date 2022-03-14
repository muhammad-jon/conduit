import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Editor from "./components/Editor";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Settings from "./components/Settings";
import ProfileFavorites from "./components/ProfileFavorites";
import Home from "./components/Home";
import Article from "./components/Article";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { APP_LOAD, REDIRECT } from "./constants/actionTypes";
// import common from "./reducers/common";
import agent from "./agent";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commonState = useSelector((state) => state.common);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }
    // console.log("common state", commonState);
    dispatch({ type: APP_LOAD, payload: agent.Auth.current(), token });
  }, []);

  useEffect(() => {
    if (commonState?.redirectTo) {
      navigate(commonState?.redirectTo);
      dispatch({ type: REDIRECT });
    }
  }, [commonState?.redirectTo]);

  if (commonState?.appLoaded) {
    return (
      <div>
        <Header
          appName={commonState?.appName}
          currentUser={commonState?.currentUser}
        />

        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/editor"} element={<Editor />} />
          <Route path={"/article/:id"} element={<Article />} />
          <Route path={"/settings"} element={<Settings />} />
          <Route
            path={"/@:username/favorites"}
            element={<ProfileFavorites />}
          />
          <Route path={"/@:username"} element={<Profile />} />
        </Routes>
      </div>
    );
  }
  return (
    <Header
      appName={commonState?.appName}
      currentUser={commonState?.currentUser}
    />
  );
};

export default App;
