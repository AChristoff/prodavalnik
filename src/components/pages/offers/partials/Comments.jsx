import React from 'react';

export default function Comments(props) {

  const {comments} = props;

  const formatDateTime = (data) => {
    data = data.split('.')[0];
    const year = data.split('T')[0].split('-').join('/');
    const time = data.split('T')[1].split(':');
    const setLocalTime = (time) => {
      if (Number(time[0]) === 21) {
        return '00';
      } else if (Number(time[0]) === 22) {
        return '01';
      } else if (Number(time[0]) === 23) {
        return '02';
      } else {
        return (Number(time[0]) + 4);
      }
    };

    const localTime = `${setLocalTime(time)}:${time[1]}`;

    return `${localTime} - ${year}`
  };

  return (
    <div className="comments-list">
      {
        comments.map((comment) => (
          <div>
            <p>{comment.author}</p>
            <p>{comment.content}</p>
            <p>{formatDateTime(comment.createdAt)}</p>
          </div>
        ))
      }
    </div>
  );
}
