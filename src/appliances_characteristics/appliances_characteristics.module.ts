import { Module } from '@nestjs/common';
import { AppliancesCharacteristicsService } from './appliances_characteristics.service';
import { AppliancesCharacteristicsController } from './appliances_characteristics.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appliances } from './schemas/appliancesCharacteric.model';
import { FilesModule } from 'src/files/files.module';
import { MediaModule } from 'src/media/media.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Appliances]),FilesModule,MediaModule,JwtModule],
  controllers: [AppliancesCharacteristicsController],
  providers: [AppliancesCharacteristicsService]
})
export class AppliancesCharacteristicsModule {}
