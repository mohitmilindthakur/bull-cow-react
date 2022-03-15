import { computeBullCowCount } from '../../utils/words';
import { WORD_LENGTH } from '../WordRow';

export interface Attempt {
  word: string;
  bullCowCount: {
    bulls: number;
    cows: number;
  };
  computed: boolean;
}

export const isValidGuess = (key: string): boolean => {
  if (!/^[a-zA-Z]+$/.test(key)) return false;

  if (key.length > 1) return false;

  return true;
};

interface AppState {
  guess: string;
  attempts: Attempt[];
}

export enum ActionTypes {
  SET_GUESS = 'SET_GUESS',
  BACKSPACE = 'BACKSPACE',
  SET_ATTEMPT = 'SET_ATTEMPT',
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

export const initialState: AppState = {
  guess: '',
  attempts: [],
};

export const reducer = function (
  state: AppState,
  action: AllActions
): AppState {
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

    case 'BACKSPACE':
      if (state.guess.length) {
        return {
          ...state,
          guess: state.guess.slice(0, state.guess.length - 1),
        };
      }

    case 'SET_ATTEMPT':
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
        guess: '',
        attempts: [...state.attempts, attempt],
      };
    default:
      return state;
  }
};
