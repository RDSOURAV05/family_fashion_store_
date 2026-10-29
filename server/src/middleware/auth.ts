import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'chic_store_secret_jwt_key_2026_change_in_production';

export interface AuthenticatedRequest extends Request {
  adminUser?: {
    id: string;
    username: string;
    name: string;
  };
}

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string };
    const admin = db.findAdminById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid or revoked token.' });
    }

    req.adminUser = {
      id: admin.id,
      username: admin.username,
      name: admin.name
    };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
};
