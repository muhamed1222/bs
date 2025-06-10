import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useUndoRedo } from '../hooks/useUndoRedo';

describe('useUndoRedo', () => {
  it('handles set, undo and redo', () => {
    const { result } = renderHook(() => useUndoRedo(1));

    act(() => result.current.set(2));
    expect(result.current.state).toBe(2);
    expect(result.current.canUndo).toBe(true);
    act(() => result.current.undo());
    expect(result.current.state).toBe(1);
    expect(result.current.canRedo).toBe(true);
    act(() => result.current.redo());
    expect(result.current.state).toBe(2);
  });
});
