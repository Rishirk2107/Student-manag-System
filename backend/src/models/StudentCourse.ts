import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Student from "./Student";
import Course from "./Course";

class StudentCourse extends Model {
  public studentId!: number;
  public courseId!: number;
}

StudentCourse.init(
  {
    studentId: { type: DataTypes.INTEGER, references: { model: Student, key: "id" } },
    courseId: { type: DataTypes.INTEGER, references: { model: Course, key: "id" } },
  },
  { sequelize, modelName: "student_course" }
);

// Many-to-Many Relation
Student.belongsToMany(Course, { through: StudentCourse, foreignKey: "studentId" });
Course.belongsToMany(Student, { through: StudentCourse, foreignKey: "courseId" });

export default StudentCourse;
