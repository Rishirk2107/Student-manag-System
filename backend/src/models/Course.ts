import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Course extends Model {
  public id!: number;
  public name!: string;
}

Course.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, modelName: "course" }
);

export default Course;
