import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER, UPDATE_FIELD_AUTH } from "../constants/actionTypes";
import agent from "../agent";
import ListErrors from "./ListErrors";

const Register = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const changeEmail = (e) => {
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value: e.target.value });
  };
  const changePassword = (e) => {
    dispatch({
      type: UPDATE_FIELD_AUTH,
      key: "password",
      value: e.target.value,
    });
  };
  const changeUsername = (e) => {
    dispatch({
      type: UPDATE_FIELD_AUTH,
      key: "username",
      value: e.target.value,
    });
  };
  const submitForm = (username, email, password) => (e) => {
    e.preventDefault();
    dispatch({
      type: REGISTER,
      payload: agent.Auth.register(username, email, password),
    });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ListErrors errors={authState.errors} />

            <form
              onSubmit={submitForm(
                authState.username,
                authState.email,
                authState.password
              )}
            >
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  value={authState.username}
                  onChange={changeUsername}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  value={authState.email}
                  onChange={changeEmail}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={authState.password}
                  onChange={changePassword}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled={authState.inProgress}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
