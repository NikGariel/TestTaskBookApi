import { NextFunction, Request, Response } from 'express';
import { Role } from '../enums/role.enum';

export default function roleMiddleware(requiredRole: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req.user!.role & requiredRole) === requiredRole) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  };
}
