import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
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
  const propError = checkPropTypes(
    GuessedWords.propTypes,
    defaultProps,
    'prop',
    GuessedWords.name
  );
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

describe('if there are guessed words', () => {});
