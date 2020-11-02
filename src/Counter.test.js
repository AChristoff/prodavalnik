import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Counter from './Counter';

afterEach(cleanup);

test('<Counter />', () => {
  const { debug, getByTestId } = render(<Counter />); // Renders component
  const counterButton = getByTestId('counter-btn');
  debug(); //Outputs dom as string
  expect(counterButton.tagName).toBe('BUTTON');
  expect(counterButton.textContent).toBe('0');

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('1');


  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('2');
});
