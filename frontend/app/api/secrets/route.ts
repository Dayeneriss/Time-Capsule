import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedSecret = searchParams.get('secret');

  if (requestedSecret === 'NEXT_PUBLIC_PINATA_JWT') {
    return NextResponse.json({
      NEXT_PUBLIC_PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT
    });
  }

  return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
}
