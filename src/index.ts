import sequelize from './database';
import { User } from './models/User';

async function main() {
  try {
    await sequelize.sync({ force: true });  // force: true will drop the table if it already exists
    console.log("Database synced!");

    // Creating a sample user
    const user = await User.create({
      username: "AndreSalerninho",
      email: "andresalerno@gmail.com",
      password: "OEricElegal"
    });

    console.log("User created: ", user.toJSON());
  } catch (error) {
    console.error("Error syncing database: ", error);
  }
}

main();
