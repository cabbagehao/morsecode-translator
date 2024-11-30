import React, { createContext, useContext, useReducer, useCallback } from 'react';

interface HistoryState {
  past: Array<{ text: string; morse: string }>;
  present: { text: string; morse: string };
  future: Array<{ text: string; morse: string }>;
}

type HistoryAction =
  | { type: 'UPDATE'; payload: { text: string; morse: string } }
  | { type: 'UNDO' }
  | { type: 'REDO' };

const initialState: HistoryState = {
  past: [],
  present: { text: '', morse: '' },
  future: [],
};

function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
  switch (action.type) {
    case 'UPDATE':
      // Only add to history if the content actually changed
      if (
        state.present.text === action.payload.text &&
        state.present.morse === action.payload.morse
      ) {
        return state;
      }
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    case 'UNDO':
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
      };
    case 'REDO':
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
      };
    default:
      return state;
  }
}

interface HistoryContextType {
  state: HistoryState;
  canUndo: boolean;
  canRedo: boolean;
  update: (text: string, morse: string) => void;
  undo: () => void;
  redo: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(historyReducer, initialState);

  const update = useCallback((text: string, morse: string) => {
    dispatch({ type: 'UPDATE', payload: { text, morse } });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const value = {
    state,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    update,
    undo,
    redo,
  };

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}