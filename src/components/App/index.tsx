import WordRow from '../WordRow';
import Keyboard from '../Keyboard';
import { useCallback, useEffect, useReducer } from 'react';
import {reducer, initialState, ActionTypes} from './reducer'

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
    }

    else if (key === "←") {
      return dispatch({type: ActionTypes.BACKSPACE})
    }

    else {
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
