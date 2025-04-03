import { Request, Response } from "express";
import { addTeacher, addStudent, getAllTeachers, getAllStudents } from "../services/adminService";
import Admin from "../models/Admin";

export const addTeacherController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, adminId, courseName } = req.body;
    if (!name || !email || !password || !adminId || !courseName) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const teacher = await addTeacher(name, email, password, adminId, courseName);
    res.status(201).json({ message: "Teacher added successfully", teacher });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addStudentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, adminId } = req.body;
    if (!name || !email || !password || !adminId) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const student = await addStudent(name, email, password, adminId);
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllTeachersController = async (_req: Request, res: Response): Promise<void> => {
  try {

    const {adminId}=_req.query;
    const teachers = await getAllTeachers(adminId);
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllStudentsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const {adminId}=_req.query;
    const students = await getAllStudents(adminId);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
