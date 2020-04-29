import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from './test/testUtils';

import Input from './Input';

const secretWord = ' party';

test('Input renders without error', () => {
  const wrapper = shallow(<Input secretWord={secretWord} />);
  const input = wrapper.find('[data-test="component-input"]');
  expect(input.length).toBe(1);
});

test('does not throw warning with expected type of props', () => {
  const expectedProps = { secretWord };
  const propError = checkProps(Input, expectedProps);
  expect(propError).toBeUndefined();
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = shallow(<Input secretWord={secretWord} />);
  });

  test('state updates with value of input box', () => {
    const inputBox = wrapper.find('[data-test="input-box"]');
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('input is cleared after clicking submit button', () => {
    const submitButton = wrapper.find('[data-test="submit-button"]');
    submitButton.simulate('click', { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
