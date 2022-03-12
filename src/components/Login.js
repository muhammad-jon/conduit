import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, UPDATE_FIELD_AUTH } from "../constants/actionTypes";
import agent from "../agent";
import ListErrors from "./ListErrors";

const Login = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  React.useEffect(() => {
    console.log(authState);
  });

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

  const submitForm = (email, password) => (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">You need an account?</Link>
            </p>
            <ListErrors errors={authState.errors} />

            <form onSubmit={submitForm(authState.email, authState.password)}>
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
