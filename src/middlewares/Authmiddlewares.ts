import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel  from '../Models/UserModel'; 


const JWT_SECRET = process.env.JWT_SECRET || 'ibanga';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware to protect routes
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'Authentication token is missing' });
    return;
  }

  // Extract token from "Bearer TOKEN" format
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'Authentication token is missing' });
    return;
  }

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };

    // Fetch the user and attach to req.user
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    req.user = user; // Attach the user to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
