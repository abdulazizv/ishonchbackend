import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from './schemas/currency.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Currency]),JwtModule],
  controllers: [CurrencyController],
  providers: [CurrencyService]
})
export class CurrencyModule {}
