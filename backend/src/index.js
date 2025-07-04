import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from "./app.js";
import sequelize from "./db/mysql.js"; 
import "./modelsSQL/associations.js"; 

const port = process.env.PORT || 3001;

// Connect to MySQL and start server
sequelize
  .sync() 
  .then(() => {
    console.log("MySQL DB connected and models synced.");
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MySQL connection error:", err);
    process.exit(1);
  });
