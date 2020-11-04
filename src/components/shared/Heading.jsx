import React from 'react';

export default function Heading({size = '4', text = 'Heading'}) {
  const Tag = `h${size}`;
  return (
    <Tag data-testid="page-heading" className="page-heading">{text}</Tag>
  );
}
