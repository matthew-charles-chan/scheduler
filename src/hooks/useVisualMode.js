import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [state, setState] = useState({
    mode: initial,
    history: [initial]
  })

  const removeLast = (arr) => {
    return arr.slice(0, -1)
  }

  function transition(mode, replace = false) {
    if(replace) {
      const history = removeLast(state.history); 
      setState(prev => ({...prev, mode, history: [...history, mode]}))
    } else {
      setState(prev => ({...prev, mode, history: [...state.history, mode]}))
      }
    }
    
  function back() {

    if (state.history.length > 1) {
      const history = removeLast(state.history)
      const mode = history[history.length - 1];
      setState(prev => ({...prev, mode, history}));
    }
  }

  return { ...state , transition, back }
}