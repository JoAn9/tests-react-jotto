import React, { Fragment } from 'react';
import stringsModule from './helpers/strings';
import languageContext from './contexts/languageContext';
import guessedWordsContext from './contexts/guessedWordsContext';

function GuessedWords() {
  const language = React.useContext(languageContext);
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const content =
    guessedWords.length === 0 ? (
      <span data-test="instructions">
        {stringsModule.getStringByLanguage(language, 'guessPrompt')}
      </span>
    ) : (
      <Fragment>
        <h3>
          {stringsModule.getStringByLanguage(language, 'guessColumnHeader')}
        </h3>
        <table data-test="table" className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>
                {stringsModule.getStringByLanguage(language, 'guessedWords')}
              </th>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  'matchingLettersColumnHeader'
                )}
              </th>
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

export default GuessedWords;
