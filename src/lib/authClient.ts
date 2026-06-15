'use client';

export const getAccessTokenFromCookies = (): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie
    ?.split(';')
    .map(chunk => chunk.trim())
    .find(chunk => chunk.startsWith('accessToken='));

  if (!match) return null;

  const [, value] = match.split('=');
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};
