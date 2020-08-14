import React from 'react';
import './timestamp.scss';

export default function Timestamp({data, customClass = '', addTime = true}) {

  const formatDateTime = (dataUTC) => {
    const date = new Date(dataUTC);
    const gmt = date.toString().split(' ');

    let year = [...gmt].splice(1, 3);
    const month = year.shift();
    year = `${year[0]}/${month}/${year[1]}`
    const time = [...gmt].splice(4, 1)[0].split(':').splice(0, 2).join(':');

    if (addTime) {
      return `${year} - ${time}h`
    }

    return year;
  };

  return (
    <span className={'timestamp ' + customClass}>
      {formatDateTime(data)}
    </span>
  );
}
