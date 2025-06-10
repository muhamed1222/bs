import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidSlug, isValidUrl, isColorTooLight } from '../utils/validators';

describe('validators', () => {
  it('email validation', () => {
    expect(isValidEmail('a@b.com')).toBe(true);
    expect(isValidEmail('wrong')).toBe(false);
  });

  it('slug validation', () => {
    expect(isValidSlug('abc-123')).toBe(true);
    expect(isValidSlug('bad slug')).toBe(false);
  });

  it('url validation', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('ht!tp')).toBe(false);
  });

  it('color brightness', () => {
    expect(isColorTooLight('#ffffff')).toBe(true);
    expect(isColorTooLight('#000000')).toBe(false);
  });
});
