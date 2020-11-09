import React from 'react';

// Converts HTML Entities from DB texts to display the corresponding symbols
export default function SanitizedText({tag = 'p', text = '', customClass = ''}) {
  const Tag = tag;
  return (
    <Tag data-testid="sanitized-text" className={customClass} dangerouslySetInnerHTML={{__html: text}} />
  );
}
