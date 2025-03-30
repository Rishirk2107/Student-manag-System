import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Admin from "./Admin";
import Course from "./Course";

class Teacher extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public courseId!: number;
  public adminId!: number;
}

Teacher.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    adminId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "teacher" }
);

// Set Foreign Keys
Teacher.belongsTo(Admin, { foreignKey: "adminId" });
Teacher.belongsTo(Course, { foreignKey: "courseId" });

export default Teacher;
