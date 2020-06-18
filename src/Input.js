import React from 'react';
import PropTypes from 'prop-types';
import stringsModule from './helpers/strings';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

function Input({ secretWord }) {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [currentGuess, setCurrentGuess] = React.useState('');

  if (success) return null;
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          type="text"
          className="mb-2 mx-sm-3"
          placeholder={stringsModule.getStringByLanguage(
            language,
            'guessInputPlaceholder'
          )}
          value={currentGuess}
          onChange={e => setCurrentGuess(e.target.value)}
        />
        <button
          data-test="submit-button"
          onClick={e => {
            e.preventDefault();
            if (currentGuess === secretWord) setSuccess(true);
            setCurrentGuess('');
          }}
          className="btn btn-primary mb-2"
        >
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
