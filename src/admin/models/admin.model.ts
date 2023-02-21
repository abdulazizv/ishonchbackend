import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin> {
  @ApiProperty({ example: 1, description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'name1', description: 'name of admin' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 'password', description: 'password of admin' })
  @Column({
    type: DataType.STRING,
  })
  password: string;
}
