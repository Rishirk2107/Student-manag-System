import { Request, Response } from "express";
import { registerAdmin, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password ,collegeId, collegeName} = req.body;
    const admin = await registerAdmin(name, email, password, collegeId, collegeName);
    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, role } = await loginUser(email, password);
    res.json({ message: "Login successful", token, role });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
