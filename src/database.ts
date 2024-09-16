import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User"; // Reference to your model

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'orm',
  models: [User],  // Add all models here
});

export default sequelize;
