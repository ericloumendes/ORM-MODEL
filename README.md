# Object-Relational Mapping sample with node.js sequelize
## Documentation written by Eric Lourenço.

---

## Setting-up the node project
```powershell
npm init #Initialize the a node project

tsc --init #Initialize typescript configuration

npm install sequelize sequelize-typescript mysql2 #Install sequelize, sequelize typescript integration and mysql2 to connect with our mysql database 

npm install --save-dev typescript @types/node @types/sequelize #Here we import into project sequelize and node stamps into typescript project
```

### tsconfig.json template:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

---

## Database Connection
```ts
import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";  // Model reference

const sequelize = new Sequelize({
  dialect: 'mysql',  // Dialect is the sql language that will be used to create the quary's
  host: 'localhost', // Is the address wich the database is connected to
  username: 'your_mysql_username',  //Is a username of a user already created into the database
  password: 'your_mysql_password',  //Is the password of the refered user
  database: 'your_database_name',  //Is the database name wich the application will connect into
  models: [User],  // Is the definition of all the models wich will be used into application
});

export default sequelize;
```

---

## Simple model example
```ts
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}
```

---

## Model with explicit primary key
```ts
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}
```

---

## Syncing with database and making inserts
```Ts
import sequelize from './database';
import { User } from './models/User';

async function main() {
  try {
    await sequelize.sync({ force: true });  // force: true will drop the table if it already exists
    console.log("Database synced!");

    // Creating a sample user
    const user = await User.create({
      username: "JohnDoe",
      email: "john@example.com",
      password: "securepassword"
    });

    console.log("User created: ", user.toJSON());
  } catch (error) {
    console.error("Error syncing database: ", error);
  }
}

main();
```

--- 

## Select methods
> findAll(): This method searchs for all registrers of user table and returns uma a list with objects of type user.
```ts
import { User } from './models/User';

async function fetchUsers() {
  try {
    const users = await User.findAll();
    console.log("All users: ", users);
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
}

fetchUsers();
```

> findOne(): Searches for the first record that meets the specified condition in the 'where' clause.
where: { id: userId }: Search condition, in this case, filtering by 'id'.
```ts
async function fetchUserById(userId: number) {
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    });
    
    if (user) {
      console.log("User found: ", user.toJSON());
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error fetching user: ", error);
  }
}

fetchUserById(1);  // Exemplo: buscar o usuário com id 1
```

> attributes: Used to select only specific columns (in this case, only 'username').
```ts
async function fetchUsernames() {
  try {
    const users = await User.findAll({
      attributes: ['username']
    });
    console.log("Usernames: ", users.map(user => user.username));
  } catch (error) {
    console.error("Error fetching usernames: ", error);
  }
}

fetchUsernames();
```

---

## Foreign key and referencing
```ts
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from './Product';  // Import Product to establish relation

@Table({
  tableName: 'suppliers',
  timestamps: true,
})
export class Supplier extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contactInfo!: string;

  @HasMany(() => Product)  // A supplier can have many products
  products!: Product[];
}
```

--- 

```ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Supplier } from './Supplier';  // Import Supplier for foreign key relationship

@Table({
  tableName: 'products',
  timestamps: true,
})
export class Product extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @ForeignKey(() => Supplier)  // Foreign key referencing Supplier
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  supplierId!: number;

  @BelongsTo(() => Supplier)  // Define relationship
  supplier!: Supplier;
}
```
