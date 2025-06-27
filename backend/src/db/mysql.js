// db/mysql.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "mentormentee_db",
  "root",
  "*Kipng3n0",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
