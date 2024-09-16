import { Sequelize } from 'sequelize-typescript';
import { Supplier } from './models/Supplier';
import { Product } from './models/Product';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'orm',
  models: [Supplier, Product],  // Register both models
});

export default sequelize;
