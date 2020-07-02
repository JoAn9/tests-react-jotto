import React from 'react';
import { mount } from 'enzyme';
import { checkProps } from './test/testUtils';
import Input from './Input';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

const secretWord = ' party';

const setup = ({ secretWord, language, success }) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
  success = success || false;
  return mount(
    <languageContext.Provider value={language}>
      <guessedWordsContext.GuessedWordsProvider>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
          <Input secretWord={secretWord} />
        </successContext.SuccessProvider>
      </guessedWordsContext.GuessedWordsProvider>
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
  const wrapper = setup({});
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
    wrapper = setup({});
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

test('input does not render when success is true', () => {
  const wrapper = setup({ success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
