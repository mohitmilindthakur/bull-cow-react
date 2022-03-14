import WordRow, { WORD_LENGTH } from '../WordRow';
// import useGuess from './useGuess';
import {useState, useEffect, useCallback, createContext} from 'react'
import { computeBullCowCount } from '../../utils/words';

import { useStore } from '../../store/store';

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
  let [attempts, setAttempt] = useState<Attempt[]>([])
  let [guess, setGuess] = useState('');

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
        setAttempt(current => {
          return [...current, attempt]
        });

        return '';
      });
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

  useEffect(() => {
    console.log("EFFECT", attempts)
  }, [attempts])

  // console.log("ATTEMPTS", attempts)

  let isGameOver = attempts.length === MAX_ATTEMPTS;

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
    </div>
  );
};

export default App;
