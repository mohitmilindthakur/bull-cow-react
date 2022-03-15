import WordRow, { WORD_LENGTH } from '../WordRow';
import Keyboard from '../Keyboard';
import { useCallback, useEffect, useReducer } from 'react';
import { computeBullCowCount } from '../../utils/words';

export interface Attempt {
  word: string;
  bullCowCount: {
    bulls: number;
    cows: number;
  };
  computed: boolean;
}

function isValidGuess(key: string): boolean {
  if (!/^[a-zA-Z]+$/.test(key)) return false;

  if (key.length > 1) return false;

  return true;
}

interface AppState {
  guess: string;
  attempts: Attempt[];
}

enum ActionTypes {
  SET_GUESS = "SET_GUESS",
  BACKSPACE = "BACKSPACE",
  SET_ATTEMPT = "SET_ATTEMPT"
}

interface ActionSetGuess {
  type: ActionTypes.SET_GUESS;
  payload: string;
}

interface ActionBackspace {
  type: ActionTypes.BACKSPACE;
}

interface ActionSetAttempt {
  type: ActionTypes.SET_ATTEMPT;
}

type AllActions = ActionSetGuess | ActionBackspace | ActionSetAttempt;

const initialState: AppState = {
  guess: '',
  attempts: [],
};

const reducer = function (state: AppState, action: AllActions): AppState {
  switch (action.type) {
    case 'SET_GUESS':
      if (!isValidGuess(action.payload)) {
        return state;
      }

      let newGuess = state.guess + action.payload;
      if (newGuess.length > WORD_LENGTH) {
        return state;
      }

      return { ...state, guess: state.guess + action.payload };

    case "BACKSPACE":
      if (state.guess.length) {
        return {...state, guess: state.guess.slice(0, state.guess.length - 1)}
      }

    case "SET_ATTEMPT":
      if (state.guess.length !== WORD_LENGTH) {
        return state;
      }
  
      let bullCowCount = computeBullCowCount(state.guess);
  
      let attempt = {
        word: state.guess,
        bullCowCount,
        computed: true,
      };

      return {
        guess: "",
        attempts: [...state.attempts, attempt]
      }
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const onKeyDown = (e: KeyboardEvent) => {
    let key = e.key;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    // BACKSPACE
    if (key === 'Backspace') {
      return dispatch({type: ActionTypes.BACKSPACE})
    }

    // ENTER
    if (key === 'Enter') {
      return dispatch({type: ActionTypes.SET_ATTEMPT})
    }

    return dispatch({type: ActionTypes.SET_GUESS, payload: key})
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const onClick = useCallback((key: string) => {
    if (key === '↵') {
      return dispatch({type: ActionTypes.SET_ATTEMPT})
    } else {
      return dispatch({type: ActionTypes.SET_GUESS, payload: key})
    }
  }, []);

  return (
    <div>
      <h1>{state.attempts.length}</h1>

      <header className="my-5">
        <h5 className="text-center font-semibold text-2xl">Bulls And Cows</h5>
      </header>
      <div className="flex justify-center">
        <div className="flex flex-col gap-12">
          {state.attempts.map((item, index) => (
            <WordRow
              letters={item.word}
              bullCowCount={item.bullCowCount}
              computed={item.computed}
              key={index}
            />
          ))}

          <WordRow letters={state.guess} />
        </div>
      </div>

      <div className="flex justify-center align-center text-center mt-12">
        <Keyboard onClick={onClick} />
      </div>
    </div>
  );
};

export default App;
