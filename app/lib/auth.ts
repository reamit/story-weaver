import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';

export interface User {
  email: string;
  loginAt: string;
}

export async function createSession(email: string) {
  const user: User = {
    email,
    loginAt: new Date().toISOString()
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });
  
  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });

  return user;
}

export async function getSession(): Promise<User | null> {
  const token = cookies().get('auth-token');
  
  if (!token) {
    return null;
  }

  try {
    const user = jwt.verify(token.value, JWT_SECRET) as User;
    return user;
  } catch {
    return null;
  }
}

export async function logout() {
  cookies().delete('auth-token');
}