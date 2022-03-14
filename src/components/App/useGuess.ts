import { useState, useEffect, useCallback } from 'react';
import { computeBullCowCount } from '../../utils/words';
import { WORD_LENGTH } from '../WordRow';
import { useStore } from '../../store/store';

export default function () {
  console.log('USE GUESS');
  let [guess, setGuess] = useState('');
  console.log("GUESS", guess)
  let {setAttempt} = useStore();

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    let key = e.key;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    // BACKSPACE
    if (key === 'Backspace') {
      setGuess((current) => {
        if (current.length) {
          return current.slice(0, current.length - 1);
        }
        return '';
      });
      return;
    }

    // ENTER
    if (key === 'Enter') {
      setGuess((current) => {
        if (current.length !== WORD_LENGTH) {
          return current;
        }

        let bullCowCount = computeBullCowCount(current);

        let attempt = {
          word: current,
          bullCowCount,
          computed: true,
        };

        console.log('SET ATTEMPT');
        setAttempt(attempt);

        return '';
      });

      //   setGuess("");
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
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return { guess, setGuess };
}
