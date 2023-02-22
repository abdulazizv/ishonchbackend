import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsNumeric } from 'sequelize-typescript';

export class CreateProductDto {
  @ApiProperty({ example: 'name1', description: 'name of product' })
  @IsString()
  readonly product_name: string;
  @ApiProperty({ example: '125.000', description: 'price of product' })
  @IsNumber()
  readonly product_price: number;
  @ApiProperty({ example: '1', description: 'id of appliances_characterics' })
  @IsOptional()
  @IsNumber()
  readonly appliances_characterics: number;
  @ApiProperty({ example: '2', description: 'id of notebook_characterics' })
  @IsOptional()
  @IsNumber()
  readonly notebook_characterics: number;
  @ApiProperty({ example: '4', description: 'id of characterics_phone' })
  @IsOptional()
  @IsNumber()
  readonly phone_characterics: number;
  @ApiProperty({ example: '1', description: 'id of currency' })
  @IsNumber()
  readonly currency_id: number;
  @ApiProperty({ example: '21345', description: 'id of product_year_price' })
  @IsOptional()
  @IsNumber()
  readonly product_year_price: number;
  @ApiProperty({ example: '1', description: 'id of description' })
  @IsString()
  readonly description: string;
  @ApiProperty({ example: '1', description: 'id of category' })
  @IsNumber()
  readonly category_id: number;
  @ApiProperty({ example: '1', description: 'id of media' })
  @IsNumber()
  readonly media_id: number;
  @ApiProperty({ example: 'true', description: 'is product new' })
  @IsBoolean()
  readonly is_new: boolean;
  @ApiProperty({ example: 'cancelled', description: 'status of product' })
  @IsString()
  readonly status: string;
  @ApiProperty({ example: 'Shivaki', description: 'name of brand' })
  @IsString()
  readonly brand_name: string;
}
