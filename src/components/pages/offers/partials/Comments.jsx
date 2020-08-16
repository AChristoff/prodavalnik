import React from 'react';
import SanitizedText from "../../../shared/SanitizedText";
import './comments.scss'
import Timestamp from "../../../shared/helpers/timestamp/Timestamp";

export default function Comments(props) {

  const {comments} = props;

  return (
    <div className="comments-list">
      {
        comments.length
          ? comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p className="comment-meta">
                <span className="comment-author">{comment.author}</span>
                <Timestamp data={comment.createdAt} customClass={"comment-date"}/>
              </p>
              <SanitizedText text={comment.content} customClass="comment-content"/>
            </div>
          ))
          : <p className="no-comments">No comments yet</p>
      }
    </div>
  );
}
