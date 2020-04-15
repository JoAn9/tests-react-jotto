import React from 'react';
import PropTypes from 'prop-types';

function GuessedWords({ guessedWords }) {
  let content =
    guessedWords.length === 0 ? (
      <span data-test="instructions">Try to guess the secret word!</span>
    ) : (
      <span>table</span>
    );
  return <div data-test="component-guessed-words">{content}</div>;
}

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letters: PropTypes.number.isRequired,
    })
  ),
};

export default GuessedWords;
