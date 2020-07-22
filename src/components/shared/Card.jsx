import React from 'react';

export default function Card({title, subtitle, content, price, image}) {
  return (
    <div className="offer">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <p>{content}</p>
      <p>{price}</p>
    </div>
  );
}
