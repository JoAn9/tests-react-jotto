// @returns { number } - number of letters matched between guessed words and secret word

export function getLettersMatch(guessedWord, secretWord) {
  const guessedLetterSet = new Set(guessedWord.split(''));
  const secretLetterSet = new Set(secretWord.split(''));
  return [...secretLetterSet].filter(l => guessedLetterSet.has(l)).length;
}
