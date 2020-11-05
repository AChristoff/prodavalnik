import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Heading from './Heading';

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

const text = 'Page heading text'

test('<Heading />', async () => {

  const { debug, getByTestId } = render(<Heading text={text}/>);

  expect(getByTestId('page-heading').textContent).toBe(text);

  debug();
});
