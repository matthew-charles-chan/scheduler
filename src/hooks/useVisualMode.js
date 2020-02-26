/* eslint-disable func-style */
import { useState } from "react";


export default function useVisualMode(initial) {
  const [state, setState] = useState({
    mode: initial,
    history: [initial]
  });

  // helper function to remove last item in an array
  const removeLast = (arr) => {
    return arr.slice(0, -1);
  };

  // transitions to given mode and updates history
  function transition(mode, replace = false) {
    if (replace) {
      // if replace is true, remove last element in history
      const history = removeLast(state.history);
      // transistion to current mode and add append history
      setState(prev => ({...prev, mode, history: [...history, mode]}));
    } else {
      // transistion to current mode and add append history
      setState(prev => ({...prev, mode, history: [...state.history, mode]}));
    }
  }
    
  // transitions to previous mode and updates history
  function back() {
    // if not on initial mode
    if (state.history.length > 1) {
      // remove last item from history
      const history = removeLast(state.history);
      // set mode to previous mode
      const mode = history[history.length - 1];
      // set state to updated history and mode
      setState(prev => ({...prev, mode, history}));
    }
  }

  return { ...state , transition, back };
}