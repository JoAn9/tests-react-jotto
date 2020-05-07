import React from 'react';
import { shallow } from 'enzyme';
import GuessedWords from './GuessedWords';
import guessedWordsContext from './contexts/guessedWordsContext';

const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />);
};

describe('if there are no guessed words', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
  });

  test('renders component without error', () => {
    const component = wrapper.find('[data-test="component-guessed-words"]');
    expect(component.length).toBe(1);
  });
  test('renders instructions', () => {
    const instructions = wrapper.find('[data-test="instructions"]');
    expect(instructions.text().length).not.toBe(0);
  });
});

describe('if there are guessed words', () => {
  let wrapper;

  const guessedWords = [
    { guessedWord: 'covid', letters: 1 },
    { guessedWord: 'sars', letters: 2 },
    { guessedWord: 'mers', letters: 4 },
  ];

  beforeEach(() => {
    wrapper = setup(guessedWords);
  });

  test('renders without error', () => {
    const component = wrapper.find('[data-test="component-guessed-words"]');
    expect(component.length).toBe(1);
  });
  test('renders table without error', () => {
    const table = wrapper.find('[data-test="table"]');
    expect(table.length).toBe(1);
  });
  test('correct number of guessed words', () => {
    const items = wrapper.find('[data-test="guessed-word-item"]');
    expect(items.length).toBe(guessedWords.length);
  });
});

describe('languagePicker in instruction', () => {
  test('correctly renders instructions in english by default', () => {
    const wrapper = setup([]);
    const instructions = wrapper.find('[data-test="instructions"]');
    expect(instructions.text()).toBe('Try to guess the secret word!');
  });

  test('correctly renders instructions in emoji', () => {
    const mockUseContext = jest.fn().mockReturnValue('emoji');
    React.useContext = mockUseContext;
    const wrapper = setup([]);
    const instructions = wrapper.find('[data-test="instructions"]');
    expect(instructions.text()).toBe('🤔🤫🔤');
  });
});
