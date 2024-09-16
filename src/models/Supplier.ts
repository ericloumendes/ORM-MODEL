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
