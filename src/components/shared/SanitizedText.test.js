import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SanitizedText from './SanitizedText';

// Fix Error: Not implemented: HTMLFormElement.prototype.submit
beforeEach(() => {
  ['warn', 'error'].forEach((type) => {
    window.console[type] = jest.fn()
  })
})

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

const text = 'Electronics &amp; Appliances, &#x27;Low-Cost Furniture Design&#x27;'
const tag = 'p'

test('<SanitizedText />', () => {

  const { getByTestId } = render(<SanitizedText text={text} tag={tag}/>);
  
  expect(getByTestId('sanitized-text').tagName).toBe(tag.toUpperCase());
  expect(getByTestId('sanitized-text').textContent).toBe("Electronics & Appliances, 'Low-Cost Furniture Design'");

});
