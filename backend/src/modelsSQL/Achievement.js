// modelsSQL/Achievement.js
import { DataTypes } from "sequelize";
import sequelize from "../db/mysql.js";
import User from "./User.js";

const AchievementSQL = sequelize.define(
  "Achievement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mentee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    achievementText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fileData: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    mimeType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    mongo_id: {
      type: DataTypes.STRING(24),
      unique: true,
      allowNull: true,
    },
  },
  {
    tableName: "achievements",
    timestamps: true,
  }
);

// Setup association
AchievementSQL.belongsTo(User, {
  foreignKey: "mentee_id",
  targetKey: "id",
  as: "menteeUser",
});

export default AchievementSQL;
