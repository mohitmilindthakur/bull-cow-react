import WordRow from '../WordRow';
import { useStore } from '../../store/store';
import useGuess from './useGuess';
import Keyboard from '../Keyboard';
import {useCallback} from 'react';

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
  let { attempts } = useStore();

  let { guess, setGuessOutside } = useGuess();

  let isGameOver = attempts.length === MAX_ATTEMPTS;

  const onClick = useCallback((key: string) => {
    console.log("KEY", key);
    setGuessOutside(key)

  }, [])

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
