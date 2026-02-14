import { cookies } from 'next/headers';

const TOKEN_COOKIE_NAME = 'gdrive_tokens';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expiry_date?: number;
  token_type?: string;
  scope?: string;
}

/**
 * Save tokens to cookies
 */
export async function saveTokens(tokens: TokenData): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME, JSON.stringify(tokens), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  });
}

/**
 * Get tokens from cookies
 */
export async function getTokens(): Promise<TokenData | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(TOKEN_COOKIE_NAME);
  
  if (!tokenCookie?.value) {
    return null;
  }

  try {
    return JSON.parse(tokenCookie.value);
  } catch (error) {
    console.error('Error parsing tokens:', error);
    return null;
  }
}

/**
 * Clear tokens from cookies
 */
export async function clearTokens(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
}

/**
 * Check if tokens exist
 */
export async function hasTokens(): Promise<boolean> {
  const tokens = await getTokens();
  return tokens !== null && tokens.access_token !== undefined;
}