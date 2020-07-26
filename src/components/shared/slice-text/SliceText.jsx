import React from 'react';
import "./sliceText.scss"
import SanitizedText from '../SanitizedText';

export default function SliceText({tag = 'p', text = '', length = '100', isSanitized = false}) {

  const Tag = tag;
  const textLength = Number(length);
  const slicedText = text.length > textLength
    ? text.slice(0, textLength) + '. . .'
    : text;

  const hiddenText = text.length > textLength
    ? 'hidden-text-active'
    : 'hidden-text';

  return (
    isSanitized
      ? <SanitizedText tag={Tag} text={slicedText} customClass={hiddenText}/>
      : <Tag className={hiddenText}>{slicedText}</Tag>
  );
}
