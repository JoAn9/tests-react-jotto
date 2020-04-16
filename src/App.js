import React from 'react';
import './App.css';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';

function App() {
  return (
    <div className="container">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessedWords
        guessedWords={[
          { guessedWord: 'covid', letters: 1 },
          { guessedWord: 'sars', letters: 2 },
          { guessedWord: 'mers', letters: 4 },
        ]}
      />
    </div>
  );
}

export default App;
