export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const slugRegex = /^[a-zA-Z0-9-]+$/;

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function isValidSlug(slug: string): boolean {
  return slugRegex.test(slug);
}

export function isValidUrl(val: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(val);
    return true;
  } catch {
    return false;
  }
}

export function isValidText(text: string, maxLength: number): boolean {
  return text.trim().length > 0 && text.length <= maxLength;
}

export function isColorTooLight(color: string): boolean {
  const hex = color.replace('#', '');
  if (hex.length !== 6) return false;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 240;
}
