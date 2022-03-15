import create from 'zustand';
import { Attempt } from './../components/App';

interface Store {
  attempts: Attempt[];
  setAttempt: (attempt: Attempt) => void;
  guess: string;
  setGuess: (guess: string) => void;
}

export const useStore = create<Store>((set, get) => {
  return {
    attempts: [],
    guess: "",

    setAttempt: (attempt: Attempt) => {
        console.log("**********************************************")
        set(state => ({attempts: [...state.attempts, attempt]}));
    },

    setGuess: (guess: string) => {
      set({guess: guess})
    }
  };
});
