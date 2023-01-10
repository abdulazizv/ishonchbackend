import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Media } from './schemas/media.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Media]),JwtModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports:[MediaService]
})
export class MediaModule {}
