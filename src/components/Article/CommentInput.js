import React, { useState } from "react";
import { useDispatch } from "react-redux";
import agent from "../../agent";
import { ADD_COMMENT } from "../../constants/actionTypes";

const CommentInput = ({ slug, currentUser }) => {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const changeBody = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  };
  const createComment = (e) => {
    e.preventDefault();
    const payload = agent.Comments.create(slug, { body });
    setBody("");
    dispatch({ type: ADD_COMMENT, payload });
  };
  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows="3"
          value={body}
          onChange={changeBody}
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={currentUser.image}
          className="comment-author-img"
          alt={currentUser.username}
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
