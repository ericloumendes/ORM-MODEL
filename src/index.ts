import sequelize from './database';
import { Supplier } from './models/Supplier';
import { Product } from './models/Product';
import { error } from 'console';

async function main() {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: true });
    console.log("Database synced!");

    // Create a sample supplier
    const supplier = await Supplier.create({
      name: 'Andrezinho',
      contactInfo: 'salerno@gmail.com',
    });

    const supplier1 = await Supplier.create({
        name: 'Guilherminho',
        contactInfo: 'benedito@gmail.com',
      });
    
    const supplier2 = await Supplier.create({
        name: 'Gustavinho',
        contactInfo: 'muraoka@gmail.com',
      });

    // Create a sample product with the supplier as foreign key
    const product = await Product.create({
      name: 'Notebook',
      price: 49.99,
      supplierId: supplier.id,  // Reference the supplier's id
    });

    const product1 = await Product.create({
        name: 'Manteiga',
        price: 99.00,
        supplierId: supplier1.id,  // Reference the supplier's id
      });

    const product2 = await Product.create({
        name: 'Palhaço',
        price: 39.99,
        supplierId: supplier2.id,  // Reference the supplier's id
      });

    console.log('Sample products created:');
  } catch (error) {
    console.error('Error syncing database or inserting data:', error);
  }
}

async function FetchProducts() {
    try {
        const prod = await Product.findAll();
        const ClearProd = prod.map(ClearProd => ClearProd.toJSON())
        console.log("All products: ", ClearProd);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    }

async function FetchSuppliers() {
    try {
        const sup = await Supplier.findAll();
        const ClearSup = sup.map(ClearSup => ClearSup.toJSON())
        console.log("All suppliers: ", ClearSup);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    }

main()
    .then (() =>{ return FetchProducts();})
    .then (() =>{ return FetchSuppliers();})
    .catch ((error) => {return console.error(error)})
