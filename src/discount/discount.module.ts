import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discount } from './schemas/discount.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Discount]),JwtModule],
  controllers: [DiscountController],
  providers: [DiscountService]
})
export class DiscountModule {}
