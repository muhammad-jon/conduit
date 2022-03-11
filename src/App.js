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

const App = () => {
  return (
    <div>
      <Header appName={"ConDuit"} />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/editor"} element={<Editor />} />
        <Route path={"/article/:id"} element={<Article />} />
        <Route path={"/settings"} element={<Settings />} />
        <Route path={"/@:username/favorites"} element={<ProfileFavorites />} />
        <Route path={"/@:username"} element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
