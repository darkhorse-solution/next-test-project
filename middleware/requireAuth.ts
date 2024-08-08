import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextRequest {
  user?: JwtPayload | string;
}

export function authMiddleware(req: AuthenticatedRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    return NextResponse.next(); // Proceed to the requested route
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
