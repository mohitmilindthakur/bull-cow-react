import WordRow, { WORD_LENGTH } from '../WordRow';
import { useStore } from '../../store/store';
import useGuess from './useGuess';
import Keyboard from '../Keyboard';
import {useCallback, useEffect, useState} from 'react';
import { computeBullCowCount } from '../../utils/words';

export interface Attempt {
  word: string;
  bullCowCount: {
    bulls: number;
    cows: number;
  };
  computed: boolean;
}

const MAX_ATTEMPTS = 5;

const App: React.FC = () => {

  // let { setGuessOutside } = useGuess();
  let { attempts, setAttempt } = useStore();
  let [guess, setGuess] = useState("")

  let isGameOver = attempts.length === MAX_ATTEMPTS;

  function setGuessOutside(key: string) {
    console.log("GUESS", guess)
    if (key === '↵') {
      console.log('SUBMITTING');
      submitGuess();
      return;
    }

    if (!/^[a-zA-Z]+$/.test(key)) return;

    if (key.length > 1) return;

    // ADD NEW LETTER TO WORD

    let newWord = guess + key;
    if (newWord.length > WORD_LENGTH) {
      return;
    }

    setGuess(newWord);
  }

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
      submitGuess();
      return;
    }

    setGuessOutside(key);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [guess])

  const onClick = (key: string) => {
    console.log("GUESS", guess)
    console.log("KEY", key);
    setGuessOutside(key)
  }

  return (
    <div>
      {isGameOver && <h1>Game Over</h1>}

      <h1>{attempts.length}</h1>

      <header className="my-5">
        <h5 className="text-center font-semibold text-2xl">Bulls And Cows</h5>
      </header>
      <div className="flex justify-center">
        <div className="flex flex-col gap-12">
          {attempts.map((item, index) => (
            <WordRow
              letters={item.word}
              bullCowCount={item.bullCowCount}
              computed={item.computed}
              key={index}
            />
          ))}

          <WordRow letters={guess} />
        </div>
      </div>

      <div className="flex justify-center align-center text-center mt-12">
        <Keyboard onClick={onClick} />
      </div>
    </div>
  );
};

export default App;
