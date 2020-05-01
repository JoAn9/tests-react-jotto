import React from 'react';
import { shallow, mount } from 'enzyme';
import { checkProps } from './test/testUtils';
import Input from './Input';
import languageContext from './contexts/languageContext';

const secretWord = ' party';

const setup = ({ secretWord, language }) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContext.Provider>
  );
};

describe('languagePicker for input', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({ secretWord });
    const submitButton = wrapper.find('[data-test="submit-button"]');
    expect(submitButton.text()).toBe('Submit');
  });
  test('correctly renders submit string in emoji', () => {
    const wrapper = setup({ secretWord, language: 'emoji' });
    const submitButton = wrapper.find('[data-test="submit-button"]');
    expect(submitButton.text()).toBe('🚀');
  });
});

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
