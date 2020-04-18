import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';

import Input from './Input';

const secretWord = ' party';

test('Input renders without error', () => {
  const wrapper = shallow(<Input secretWord={secretWord} />);
  const input = wrapper.find('[data-test="component-input"]');
  expect(input.length).toBe(1);
});

test('does not throw warning with expected type of props', () => {
  const expectedProps = { secretWord };
  const propError = checkPropTypes(
    Input.propTypes,
    expectedProps,
    'prop',
    Input.name
  );
  expect(propError).toBeUndefined();
});

describe('state controlled input field', () => {
  test('state updates with value of input box', () => {
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

    const wrapper = shallow(<Input secretWord={secretWord} />);
    const inputBox = wrapper.find('[data-test="input-box"]');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
});
