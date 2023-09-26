import { Request } from 'express';

interface UserPayload {
  userId: number;
}

export interface AuthRequest extends Request {
  user: UserPayload;
}
