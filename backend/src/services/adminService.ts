import bcrypt from "bcryptjs";
import Teacher from "../models/Teacher";
import Student from "../models/Student";
import Course from "../models/Course";

export const addTeacher = async (name: string, email: string, password: string, adminId: number, courseName: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Check if course exists, if not create it
  let course = await Course.findOne({ where: { name: courseName } });
  if (!course) {
    course = await Course.create({ name: courseName });
  }

  return await Teacher.create({ name, email, password: hashedPassword, adminId, courseId: course.id });
};

export const addStudent = async (name: string, email: string, password: string, adminId: number) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await Student.create({ name, email, password: hashedPassword, adminId });
};

export const getAllTeachers = async () => {
  return await Teacher.findAll({ include: Course });
};

export const getAllStudents = async () => {
  return await Student.findAll();
};
