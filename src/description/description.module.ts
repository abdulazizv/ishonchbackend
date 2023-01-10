import { Module } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { DescriptionController } from './description.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Description } from './schemas/description.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Description]),JwtModule],
  controllers: [DescriptionController],
  providers: [DescriptionService]
})
export class DescriptionModule {}
