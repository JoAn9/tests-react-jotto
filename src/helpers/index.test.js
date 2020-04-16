import { getLettersMatch } from './';

describe('get number of matching letters', () => {
  const secretWord = 'party';

  test('returns correct number when there are no matching letters', () => {
    const letters = getLettersMatch('bones', secretWord);
    expect(letters).toBe(0);
  });

  test('returns correct number when there are 3 matching letters', () => {
    const letters = getLettersMatch('train', secretWord);
    expect(letters).toBe(3);
  });

  test('returns correct number when there are duplicate correct letters in the guess', () => {
    const letters = getLettersMatch('parka', secretWord);
    expect(letters).toBe(3);
  });
});
