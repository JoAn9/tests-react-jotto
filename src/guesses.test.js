import React from 'react';
import { mount } from 'enzyme';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import Input from './Input';
import GuessedWords from './GuessedWords';

function setup(guessedWordsStrings = [], secretWord = 'party') {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );
  const inputBox = wrapper.find('[data-test="input-box"]');
  const submitButton = wrapper.find('[data-test="submit-button"]');

  guessedWordsStrings.map(item => {
    const mockEvent = { target: { value: item } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click');
  });

  return [wrapper, inputBox, submitButton];
}

describe('test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitButton;

  describe('empty guessedWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup([], 'party');
    });

    test('table reflects the number of guessed words, when there was not any guessedWords', () => {
      const mockEvent = { target: { value: 'star' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');
      const guessedWordRow = wrapper.find('[data-test="guessed-word-item"]');
      expect(guessedWordRow.length).toBe(1);
    });
  });

  describe('non-empty guessedWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(['scrum'], 'party');
    });

    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });

      test('Input component contains no children', () => {
        const inputComponent = wrapper.find('[data-test="component-input"]');
        expect(inputComponent.children().length).toBe(0);
      });

      test('table with guessed words reflects number of guessed words', () => {
        const guessedWordRow = wrapper.find('[data-test="guessed-word-item"]');
        expect(guessedWordRow.length).toBe(2);
      });
    });

    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
      test('input box remains', () => {
        expect(inputBox.exists()).toBe(true);
      });
      test('table with guessed words reflects number of guessed words', () => {
        const guessedWordRow = wrapper.find('[data-test="guessed-word-item"]');
        expect(guessedWordRow.length).toBe(2);
      });
    });
  });
});
