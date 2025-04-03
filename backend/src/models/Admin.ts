import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Admin extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public collegeId!: number;
  public collegeName!:string
}

Admin.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    collegeId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    collegeName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "admin" }
);

export default Admin;
