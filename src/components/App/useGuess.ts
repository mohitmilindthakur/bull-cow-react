import { useState, useEffect, useCallback } from 'react';
import { computeBullCowCount } from '../../utils/words';
import { WORD_LENGTH } from '../WordRow';
import { useStore } from '../../store/store';

export default function () {
  let [guess, setGuess] = useState('');
  let { setAttempt } = useStore();


  

  console.log("GUESS", guess)

  const setGuessOutside = (key: string) => {
    if (key === "↵") {
      console.log("SUBMITTING")
      submitGuess()
      return;
    }

    if (!/^[a-zA-Z]+$/.test(key)) return;

    if (key.length > 1) return;

    // ADD NEW LETTER TO WORD
    setGuess((current) => {
      let newWord = current + key;
      if (newWord.length > WORD_LENGTH) {
        return current;
      }
      return newWord;
    });
  };

  const submitGuess = () => {
    if (guess.length !== WORD_LENGTH) {
      return guess;
    }

    let bullCowCount = computeBullCowCount(guess);

    let attempt = {
      word: guess,
      bullCowCount,
      computed: true,
    };

    console.log('SET ATTEMPT');
    setAttempt(attempt);
    setGuess('');
  };

  const onKeyDown = (e: KeyboardEvent) => {

    let key = e.key;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    // BACKSPACE
    if (key === 'Backspace') {
      if (guess.length) {
        setGuess(guess.slice(0, guess.length - 1));
      }
      return;
    }

    // ENTER
    if (key === 'Enter') {
      submitGuess()
      return;
    }

    setGuessOutside(key);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [guess]);

  return { guess, setGuessOutside, submitGuess };
}
