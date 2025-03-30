import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import Teacher from "../models/Teacher";
import Student from "../models/Student";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id: number, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
};

export const registerAdmin = async (name: string, email: string, password: string, collegeId: Number, collegeName:string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await Admin.create({ name, email, password: hashedPassword ,collegeId, collegeName});
};

export const loginUser = async (email: string, password: string) => {
  let user: any;
  let role: string = "";

  user = await Admin.findOne({ where: { email } });
  if (user) role = "admin";

  if (!user) {
    user = await Teacher.findOne({ where: { email } });
    if (user) role = "teacher";
  }

  if (!user) {
    user = await Student.findOne({ where: { email } });
    if (user) role = "student";
  }

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return { token: generateToken(user.id, role), role };
};
