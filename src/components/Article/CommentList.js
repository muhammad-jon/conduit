import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments, slug, currentUser }) => {
  console.log("Comments : ", comments);
  return (
    <div>
      {comments?.map((comment) => {
        return (
          <Comment
            comment={comment}
            currentUser={currentUser}
            slug={slug}
            key={comment?.id}
          />
        );
      })}
      <Comment />
    </div>
  );
};

export default CommentList;
