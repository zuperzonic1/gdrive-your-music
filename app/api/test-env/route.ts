import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasClientId: !!process.env.GOOGLE_CLIENT_ID,
    clientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0,
    clientIdEndsCorrectly: process.env.GOOGLE_CLIENT_ID?.endsWith('.apps.googleusercontent.com'),
    clientIdPreview: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
    hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    clientSecretLength: process.env.GOOGLE_CLIENT_SECRET?.length || 0,
    clientSecretStartsCorrectly: process.env.GOOGLE_CLIENT_SECRET?.startsWith('GOCSPX-'),
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
  });
}