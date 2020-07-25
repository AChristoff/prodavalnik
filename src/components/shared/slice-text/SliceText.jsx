import React from 'react';
import "./sliceText.scss"

export default function SliceText({tag = 'p', text = '', length='100'}) {

  const Tag = tag;
  const textLength = Number(length);
  const slicedText = text.length > textLength
    ? text.slice(0, textLength) + '. . .'
    : text;

  const hiddenText = text.length > textLength
    ? 'hidden-text-active'
    : 'hidden-text';

  return (
    <Tag className={hiddenText}>{slicedText}</Tag>
  );
}
