import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from './test/testUtils';
import GuessedWords from './GuessedWords';

const defaultProps = {
  guessedWords: [
    {
      guessedWord: 'hophop',
      letters: 2,
    },
  ],
};

test('does not throw a warning with expected props', () => {
  const propError = checkProps(GuessedWords, defaultProps);
  expect(propError).toBeUndefined();
});

describe('if there are no guessed words', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GuessedWords guessedWords={[]} />);
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
    wrapper = shallow(<GuessedWords guessedWords={guessedWords} />);
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
