import { DataTypes } from "sequelize";
import sequelize from "../db/mysql.js";

const Feedback = sequelize.define(
  "Feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    //  Sequelize foreign key (MySQL user table)
    mentee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    //  Legacy Mongo references
    mentee: {
      type: DataTypes.STRING(24),
      allowNull: true,
    },
    mentor: {
      type: DataTypes.STRING(24),
      allowNull: true,
    },

    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    mongo_id: {
      type: DataTypes.STRING(24),
      unique: true,
      allowNull: true,
    },
  },
  {
    tableName: "feedbacks",
    timestamps: true,
  }
);

export default Feedback;
