import {
  ForeignKey,
  HasMany,
  BelongsTo,
  Column,
  Model,
  Table,
  DataType,
  HasOne,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/schema/category.model';
import { Currency } from 'src/currency/schemas/currency.model';
import { priceYear } from 'src/price_year/schemas/price_year.model';
import { Media } from 'src/media/schemas/media.model';
import { Order } from 'src/order/schemas/order.model';
import { Appliances } from 'src/appliances_characteristics/schemas/appliancesCharacteric.model';
import { Notebook } from 'src/notebook_characteristics/schemas/notebook.model';
import { Phone } from 'src/phone_characteristics/schemas/phone.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Artel televizor', description: 'name of product' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  product_name: string;

  @ApiProperty({ example: '3.500.000', description: 'price of product' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_price: number;

  @ApiProperty({ example: 'Artel', description: 'name of brand company' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand_name: string;
  @ForeignKey(() => Appliances)
  @Column({
    type: DataType.INTEGER,
  })
  appliances_characterics: number;

  @BelongsTo(() => Appliances)
  appliances: Appliances;

  @ForeignKey(() => Notebook)
  @Column({
    type: DataType.INTEGER,
  })
  notebook_characterics: number;

  @BelongsTo(() => Notebook)
  notebook: Notebook;

  @ForeignKey(() => Phone)
  @Column({
    type: DataType.INTEGER,
  })
  phone_characterics: number;

  @BelongsTo(() => Phone)
  phone: Phone;

  @ForeignKey(() => Currency)
  @Column({
    type: DataType.INTEGER,
  })
  currency_id: number;

  @BelongsTo(() => Currency)
  currency: Currency;

  @ForeignKey(() => priceYear)
  @Column({
    type: DataType.INTEGER,
  })
  product_year_price: number;

  @BelongsTo(() => priceYear)
  priceYear: priceYear;

  @Column({
    type: DataType.STRING,
  })
  description: string;


  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Media)
  @Column({
    type: DataType.INTEGER,
  })
  media_id: number;

  @BelongsTo(() => Media)
  media: Media;

  @ApiProperty({
    example: 'true',
    description: 'true or false to know what product is new',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_new: boolean;

  @ApiProperty({ example: 'There', description: 'Status of product' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @HasMany(() => Order)
  order: Order;
}
