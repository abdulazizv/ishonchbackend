import { PartialType } from '@nestjs/swagger';
import { CreateDiscountDto } from './create-discount.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber,IsString,IsBoolean,IsOptional } from 'class-validator';
export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
    @ApiProperty({example:'12',description:'discount of product'})
    @IsOptional()
    @IsNumber({},{message:"Discount number bo'lishi kerak"})
    readonly discount:number;
    @ApiProperty({example:'name',description:'name of discount_product'})
    @IsOptional()
    @IsString({message:"Product_name string bo'lishi kerak"})
    readonly product_name:string;
    @ApiProperty({example:'120000000',description:'price of discount_product'})
    @IsOptional()
    @IsNumber({},{message:"product_price number bo'lishi kerak"})
    readonly product_price:number;
    @ApiProperty({example:'1',description:'id of currency of discount_product'})
    @IsOptional()
    @IsNumber({},{message:'Currency_id number bolishi kerak'})
    readonly currency_id:number;
    @ApiProperty({example:'2',description:'price_year_id of product'})
    @IsOptional()
    @IsNumber({},{message:"Product_price_year number bo'lishi kerak"})
    readonly product_price_year:number;
    @ApiProperty({example:'1',description:'description_id of discount_product'})
    @IsOptional()
    @IsNumber({},{message:"description_id number bo'lishi kerak"})
    readonly description_id:number;
    @ApiProperty({example:'1',description:'category_id of discount_product'})
    @IsOptional()
    @IsNumber({},{message:"category_id number bo'lishi kerak"})
    readonly category_id:number;
    @ApiProperty({example:'1',description:'media_id of discount_product'})
    @IsOptional()
    @IsNumber({},{message:"media_id number bo'lishi kerak"})
    readonly media_id:number;
    @ApiProperty({example:'1',description:'appliances_characterics of discount_product'})
    @IsOptional()
    @IsNumber({},{message:"appliances_characterics number bo'lishi kerak"})
    readonly appliances_characterics:number;
    @ApiProperty({example:'2',description:'notebook_characterics of discount_product'})
    @IsOptional()
    @IsNumber({},{message:`notebook_characterics number bo'lishi kerak`})
    readonly notebook_characterics:number;
    @ApiProperty({example:'1',description:'phone_characterics id of discount_product'})
    @IsOptional()
    @IsNumber({},{message:`phone_characterics number bo'lishi kerak`})
    readonly phone_characterics:number;
    @ApiProperty({example:'true',description:'true or false for delivery'})
    @IsOptional()
    @IsBoolean({message:'is_delivery faqat true yoki false qiymat qabul qiladi'})
    readonly is_delivery:boolean;
    @ApiProperty({example:'false',description:'discount_product is new or not ?'})
    @IsOptional()
    @IsBoolean({message:'is_new faqat true yoki false qiymat qabul qiladi'})
    readonly is_new:boolean;
    @ApiProperty({example:'2',description:'brand_id of discount_product'})
    @IsOptional()
    @IsNumber({},{message:`brand_id number bo'lishi kerak`})
    brand_id:number;
    @ApiProperty({example:'1',description:'id of status_id'})
    @IsOptional()
    @IsOptional()
    @IsNumber({},{message:'status_id number typeni qabul qiladi'})
    status_id:number
}
