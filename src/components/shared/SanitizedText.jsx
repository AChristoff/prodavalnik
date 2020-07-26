import React from 'react';

// Converts HTML Entities from DB texts to display the corresponding symbols
export default function SanitizedText({tag = 'p', text = ''}) {
  const Tag = tag;
  return (
    <Tag dangerouslySetInnerHTML={{__html: text}} />
  );
}
