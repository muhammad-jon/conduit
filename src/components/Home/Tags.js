import React from "react";
import { Link } from "react-router-dom";
import agent from "../../agent";

const Tags = ({ tags, onClickTag }) => {
  if (tags) {
    return (
      <>
        <div className="tag-list">
          {tags?.map((tag) => {
            const handleClick = (e) => {
              e.preventDefault();
              onClickTag(
                tag,
                (page) => agent.Articles.byTag(tag, page),
                agent.Articles.byTag(tag)
              );
            };
            return (
              <a
                to=""
                className="tag-pill tag-default"
                key={tag}
                onClick={handleClick}
              >
                {tag}
              </a>
            );
          })}
        </div>
      </>
    );
  } else {
    return <div> Loading tags ...</div>;
  }
};

export default Tags;
