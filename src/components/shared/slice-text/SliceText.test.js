import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SliceText from './SliceText';

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

const tag = 'p'
const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
const slicedTextLength = 10;
const shade = true;

test('<SliceText />', () => {
  const { getByTestId } = render(<SliceText text={text} tag={tag} length={slicedTextLength} shade={shade} />);
  const expectedLength = () => {
    return text.length > slicedTextLength
      ? slicedTextLength + 5 // + 5 is fo the '. . .' added at the end of string
      : text.length;
  };

  const hiddenText = text.length > slicedTextLength && shade ? 'hidden-text-active' : 'hidden-text';

  expect(getByTestId('slice-text').tagName).toBe(tag.toUpperCase());
  expect(getByTestId('slice-text').className).toBe(hiddenText);
  expect(getByTestId('slice-text').textContent).toHaveLength(expectedLength());
});
