import React from 'react';
import "./sliceText.scss"
import SanitizedText from '../SanitizedText';

export default function SliceText({tag = 'p', text = '', length = '100', isSanitized = false, shade = true, className = ''}) {

  const Tag = tag;
  const textLength = Number(length);
  const slicedText = text.length > textLength
    ? text.slice(0, textLength) + '. . .'
    : text;

  const hiddenText = text.length > textLength && shade
    ? 'hidden-text-active'
    : 'hidden-text';

  className ? className += ' ' + hiddenText : className = hiddenText;

  return (
    isSanitized
      ? <SanitizedText data-testid="slice-text" tag={Tag} text={slicedText} customClass={className}/>
      : <Tag data-testid="slice-text" className={className}>{slicedText}</Tag>
  );
}
