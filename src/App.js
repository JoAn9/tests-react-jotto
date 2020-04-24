import React from 'react';
import './App.css';
import Input from './Input';
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

  const { secretWord } = state;
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
      <Input secretWord={secretWord} />
    </div>
  );
}

export default App;
