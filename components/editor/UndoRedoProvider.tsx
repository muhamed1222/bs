import React, { createContext, useContext, useReducer, useCallback } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

type HistoryAction<T> =
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET'; payload: T }
  | { type: 'RESET'; payload: T };

function historyReducer<T>(state: HistoryState<T>, action: HistoryAction<T>): HistoryState<T> {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO': {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case 'REDO': {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case 'SET': {
      return {
        past: [...past, present],
        present: action.payload,
        future: [],
      };
    }

    case 'RESET': {
      return {
        past: [],
        present: action.payload,
        future: [],
      };
    }
  }
}

interface UndoRedoContextType<T> {
  state: T;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  setState: (newState: T) => void;
  reset: (newState: T) => void;
}

const UndoRedoContext = createContext<UndoRedoContextType<any> | null>(null);

export function UndoRedoProvider<T>({ children, initialState }: { children: React.ReactNode; initialState: T }) {
  const [state, dispatch] = useReducer(historyReducer, {
    past: [],
    present: initialState,
    future: [],
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo]);

  const setState = useCallback((newState: T) => {
    dispatch({ type: 'SET', payload: newState });
  }, []);

  const reset = useCallback((newState: T) => {
    dispatch({ type: 'RESET', payload: newState });
  }, []);

  return (
    <UndoRedoContext.Provider
      value={{
        state: state.present,
        canUndo,
        canRedo,
        undo,
        redo,
        setState,
        reset,
      }}
    >
      {children}
    </UndoRedoContext.Provider>
  );
}

export function useUndoRedo<T>() {
  const context = useContext(UndoRedoContext);
  if (!context) {
    throw new Error('useUndoRedo must be used within an UndoRedoProvider');
  }
  return context as UndoRedoContextType<T>;
} 