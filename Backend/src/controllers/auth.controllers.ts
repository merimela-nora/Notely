import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email or username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const { password: _password, ...userDetails } = user;

    const token = jwt.sign(userDetails, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json(userDetails);
  } catch (error: any) {
    console.error("Login Error:", error); 
    res.status(500).json({ message: "Login was unsuccessful", error: error.message });
  }
};

