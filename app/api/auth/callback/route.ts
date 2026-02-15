import { NextRequest, NextResponse } from 'next/server';
import { GoogleDriveService } from '@/lib/googleDrive';
import { saveTokens } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    // Get the base URL from environment variable
    const baseUrl = process.env.NEXTAUTH_URL || request.url;

    // Handle OAuth errors
    if (error) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(error)}`, baseUrl)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/?error=No authorization code provided', baseUrl)
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback`;

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(
        new URL('/?error=Missing OAuth credentials', baseUrl)
      );
    }

    const driveService = new GoogleDriveService({
      clientId,
      clientSecret,
      redirectUri
    });

    // Exchange code for tokens
    const tokens = await driveService.getTokensFromCode(code);

    // Save tokens to cookies
    await saveTokens(tokens);

    // Redirect to home page with success message
    return NextResponse.redirect(new URL('/?auth=success', baseUrl));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
    const baseUrl = process.env.NEXTAUTH_URL || request.url;
    
    console.error('Error in OAuth callback:', error);
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(errorMessage)}`, baseUrl)
    );
  }
}