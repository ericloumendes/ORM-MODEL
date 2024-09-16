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
