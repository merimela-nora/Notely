import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  name?: string;
  email?: string;
}

declare module "express" {
  export interface Request {
    user?: JwtPayload;
  }
}

const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token; 

  if (token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default verifyUserToken;
