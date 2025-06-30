import { DataTypes } from "sequelize";
import sequelize from "../db/mysql.js";

const Ad = sequelize.define(
  "Ad",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    mongo_id: {
      type: DataTypes.STRING(24),
      unique: true,
      allowNull: true,
    },

    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    availableHours: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pricing: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Foreign key to MySQL `users.id`
    posted_by_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

   
    postedBy: {
      type: DataTypes.STRING(24),
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "ads",
    timestamps: true, // enables createdAt and updatedAt
  }
);

export default Ad;
