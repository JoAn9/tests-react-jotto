import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function GuessedWords({ guessedWords }) {
  let content =
    guessedWords.length === 0 ? (
      <span data-test="instructions">Try to guess the secret word!</span>
    ) : (
      <Fragment>
        <h3>Guessed Words</h3>
        <table data-test="table" className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>Guess</th>
              <th>Matching letters</th>
            </tr>
          </thead>
          <tbody>
            {guessedWords.map(item => (
              <tr data-test="guessed-word-item" key={item.guessedWord}>
                <td>{item.guessedWord}</td>
                <td>{item.letters}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
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
