import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSlugValidation } from '../hooks/useSlugValidation';
import * as slugService from '../services/slugService';

describe('useSlugValidation', () => {
  it('returns null for empty slug', () => {
    const { result } = renderHook(() => useSlugValidation(''));
    expect(result.current).toBeNull();
  });

  it('rejects invalid or reserved slug', () => {
    const { result, rerender } = renderHook(({ slug }) => useSlugValidation(slug, ['admin']), { initialProps: { slug: 'ad' } });
    expect(result.current).toBe(false);
    rerender({ slug: 'admin' });
    expect(result.current).toBe(false);
  });

  it('checks availability', async () => {
    vi.spyOn(slugService, 'checkSlug').mockResolvedValue({ available: true });
    const { result } = renderHook(() => useSlugValidation('my-slug'));
    await waitFor(() => expect(result.current).toBe(true));
  });

  it('handles service failure', async () => {
    vi.spyOn(slugService, 'checkSlug').mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useSlugValidation('errslug'));
    await waitFor(() => expect(result.current).toBe(false));
  });
});
