export const typography = {
  h1: {
    fontSize: '36px',
    lineHeight: 1.2,
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '28px',
    lineHeight: 1.3,
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '24px',
    lineHeight: 1.4,
    fontWeight: 600,
  },
  body: {
    fontSize: '16px',
    lineHeight: 1.5,
  },
  small: {
    fontSize: '14px',
    lineHeight: 1.5,
    fontWeight: 400,
  },
  button: {
    fontSize: '16px',
    lineHeight: 1.5,
    fontWeight: 500,
    letterSpacing: '0.01em',
  },
  label: {
    fontSize: '14px',
    lineHeight: 1.5,
    fontWeight: 500,
    letterSpacing: '0.01em',
  },
  link: {
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const; 