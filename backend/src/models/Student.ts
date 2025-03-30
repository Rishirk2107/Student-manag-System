import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Admin from "./Admin";

class Student extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public adminId!: number;
}

Student.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    adminId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "student" }
);

// Set Foreign Key
Student.belongsTo(Admin, { foreignKey: "adminId" });

export default Student;
