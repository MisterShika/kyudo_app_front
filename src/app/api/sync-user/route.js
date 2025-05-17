import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const EXPRESS_API = process.env.NEXT_PUBLIC_API_BASE_URL;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export async function POST(req) {
  const token = await getToken({ req, secret: NEXTAUTH_SECRET });

  if (!token?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(`${EXPRESS_API}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-email': token.email,
      },
      body: JSON.stringify({ email: token.email }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Backend error' }, { status: 500 });
  }
}
