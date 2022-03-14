import create from 'zustand';
import { Attempt } from './../components/App';

interface Store {
  attempts: Attempt[];
  setAttempt: (attempt: Attempt) => void;
}

export const useStore = create<Store>((set, get) => {
  return {
    attempts: [],

    setAttempt: (attempt: Attempt) => {
        console.log("**********************************************")
        set(state => ({attempts: [...state.attempts, attempt]}));
    },
  };
});
