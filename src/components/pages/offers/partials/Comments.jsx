import React from 'react';
import SanitizedText from "../../../shared/SanitizedText";
import './comments.scss'
import Timestamp from "../../../shared/helpers/timestamp/Timestamp";

export default function Comments(props) {

  const {comments} = props;

  const formatDateTime = (dataUTC) => {
    const date = new Date(dataUTC);
    const gmt = date.toString().split(' ');

    let year = [...gmt].splice(1, 3);
    const month = year.shift();
    year = `${year[0]}/${month}/${year[1]}`
    const time = [...gmt].splice(4, 1)[0].split(':').splice(0, 2).join(':');

    return `${year} - ${time}h`
  };

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
