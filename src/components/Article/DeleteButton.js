import React from "react";
import { useDispatch } from "react-redux";
import agent from "../../agent";
import { DELETE_COMMENT } from "../../constants/actionTypes";

const DeleteButton = ({ show, slug, commentId }) => {
  const dispatch = useDispatch();
  const del = () => {
    const payload = agent.Comments.delete(slug, commentId);
    dispatch({ type: DELETE_COMMENT, payload, commentId });
  };
  if (show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }
  return null;
};

export default DeleteButton;
