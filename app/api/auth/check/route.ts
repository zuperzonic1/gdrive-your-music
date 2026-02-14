import { NextResponse } from 'next/server';
import { hasTokens } from '@/lib/auth';

export async function GET() {
  try {
    const authenticated = await hasTokens();
    return NextResponse.json({ authenticated });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}