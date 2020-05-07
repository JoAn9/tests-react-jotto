import React from 'react';
import './App.css';
import Input from './Input';
import hookActions from './actions/hookActions';
import LanguagePicker from './LanguagePicker';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

const initialState = {
  secretWord: null,
  language: 'en',
};

function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    case 'setLanguage':
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setSecretWord = secretWord =>
    dispatch({ type: 'setSecretWord', payload: secretWord });

  const setLanguage = language =>
    dispatch({ type: 'setLanguage', payload: language });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  const { secretWord, language } = state;
  if (!secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Fetching secret word...</p>
      </div>
    );
  }

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <languageContext.Provider value={language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={secretWord} />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
