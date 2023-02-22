import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty({ example: 'USD', description: 'currency_name of currency' })
  @IsString({ message: "currency_name string bo'lishi kerak" })
  readonly currency_name: string;
}
