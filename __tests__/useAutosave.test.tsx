import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAutosave } from '../hooks/useAutosave';
import * as cloud from '../services/cloud';
vi.mock('../components/ToastProvider', () => ({
  useToast: () => ({ showError: vi.fn(), showSuccess: vi.fn() }),
}));

vi.useFakeTimers();

describe('useAutosave', () => {
  it('saves state to storage', async () => {
    const saveSpy = vi.spyOn(cloud, 'saveData').mockResolvedValue();
    const { result, rerender } = renderHook(({ state }) => useAutosave('u1', 'p1', state), { initialProps: { state: { a: 1 } } });

    rerender({ state: { a: 2 } });
    expect(result.current.saved).toBe(false);

    await vi.runAllTimersAsync();
    await vi.runAllTicks();

    expect(localStorage.getItem('draft_u1_p1')).toContain('"a":2');
    expect(saveSpy).toHaveBeenCalled();
    saveSpy.mockRestore();
  });

  it('reports error if localStorage fails', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('fail'); });
    const { result, rerender } = renderHook(({ state }) => useAutosave('u1', 'p2', state), { initialProps: { state: { a: 1 } } });

    rerender({ state: { a: 3 } });
    await vi.runAllTimersAsync();

    expect(result.current.saved).toBe(false);
    setItem.mockRestore();
  });

  it('loads and clears draft', async () => {
    const loadSpy = vi.spyOn(cloud, 'loadData').mockResolvedValue({ a: 5 });
    const delSpy = vi.spyOn(cloud, 'deleteData').mockResolvedValue();
    localStorage.removeItem('draft_u1_p3');
    const { result } = renderHook(() => useAutosave('u1', 'p3', { a: 0 }));

    expect(result.current.loadDraft()).toBeUndefined();
    await Promise.resolve();
    expect(loadSpy).toHaveBeenCalled();

    act(() => result.current.clearDraft());
    expect(localStorage.getItem('draft_u1_p3')).toBeNull();
    expect(delSpy).toHaveBeenCalled();
    loadSpy.mockRestore();
    delSpy.mockRestore();
  });
});
