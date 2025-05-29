import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import config from '../config';

interface CustomJWTPayload extends JwtPayload {
  id: string;
  role: string;
}

export const verifyRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new AppError(401, 'Unauthorized');
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as CustomJWTPayload;

      if (!allowedRoles.includes(decoded.role)) {
        throw new AppError(403, 'Forbidden');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).user = decoded;
      next();
    } catch (error) {
      throw new AppError(401, 'Unauthorized');
      console.log(error);
    }
  };
};
