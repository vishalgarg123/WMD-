import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define a custom request interface to include the decoded user information
export interface CustomRequest extends Request {
  user?: {
    _id:string
    email?:string
  }| JwtPayload; // Depending on your JWT structure
}

// Middleware to verify JWT token
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  // Check if Authorization header exists
  if (!authHeader) {
    res.status(403).json({ message: "No token provided" });
    return;
  }

  // Extract token from the Authorization header
  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "No token provided" });
    return;
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_KEY as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Store decoded token payload in the request object
    req.user = decoded as {_id:string,email?:string};
    next(); // Proceed to the next middleware or route handler
  });
};
