import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './schema/category.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';
import { MediaModule } from 'src/media/media.module';
import { Media } from '../media/schemas/media.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Category]),
    JwtModule,
    FilesModule,
    MediaModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
