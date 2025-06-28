import { DataTypes } from "sequelize";
import sequelize from "../db/mysql.js";

const MySQLUser = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("mentor", "mentee"),
      allowNull: false,
    },

    // Self-referencing foreign key
    mentorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // remove mentor without deleting mentee
    },

    // For backward compatibility with MongoDB
    mongo_id: {
      type: DataTypes.STRING(24),
      unique: true,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default MySQLUser;
