import React from 'react';
import './App.css';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import hookActions from './actions/hookActions';

const initialState = {
  secretWord: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setSecretWord = secretWord =>
    dispatch({ type: 'setSecretWord', payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  return <div className="container" data-test="component-app"></div>;
}

export default App;
