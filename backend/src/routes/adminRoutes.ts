import { Router } from "express";
import {
  addTeacherController,
  addStudentController,
  getAllTeachersController,
  getAllStudentsController,
} from "../controllers/adminController";

const router = Router();

router.post("/add-teacher", addTeacherController);
router.post("/add-student", addStudentController);
router.get("/teachers", getAllTeachersController);
router.get("/students", getAllStudentsController);

export default router;
