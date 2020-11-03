import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import MovieForm from './MovieForm';

// Fix Error: Not implemented: HTMLFormElement.prototype.submit
beforeEach(() => {
  ['log', 'warn', 'error'].forEach((type) => {
    window.console[type] = jest.fn()
  })
})

afterEach(cleanup);

const onSubmit = jest.fn();

test('<MovieForm>', () => {
  const { debug, getByTestId, queryByTestId, container, getByText, getByLabelText } = render(<MovieForm submitForm={onSubmit}/>);

  expect(queryByTestId('movie-form')).toBeTruthy();

  getByLabelText('Label').value = 'Label';
  fireEvent.change(getByLabelText('Label'));

  fireEvent.change(getByLabelText('Label'), { 
    target: { value: 'hello'}
  });

  fireEvent.click(getByText('Submit'));

  expect(onSubmit).toHaveBeenCalledTimes(1); 
  expect(onSubmit).toHaveBeenCalledWith({text: "hello"});
  // debug();
})