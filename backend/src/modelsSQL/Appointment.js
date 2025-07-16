import { DataTypes } from "sequelize";
import sequelize from "../db/mysql.js";

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Cancelled", "Accepted", "Rejected"),
      allowNull: false,
      defaultValue: "Pending",
    },

    // Foreign keys for Sequelize associations
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    mongo_id: {
      type: DataTypes.STRING(24),
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "appointments",
    timestamps: true,
  }
);

export default Appointment;
