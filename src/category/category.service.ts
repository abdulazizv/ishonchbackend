import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { MediaService } from 'src/media/media.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private CategoryRepository: typeof Category,
    private readonly fileService: FilesService,
    private readonly mediaService: MediaService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    image: string,
  ): Promise<Category> {
    const fileName = await this.fileService.createFile(image);
    const newCategory = await this.CategoryRepository.create({
      category_name: createCategoryDto.category_name,
      parent_category_id: createCategoryDto.parent_category_id,
      category_image: fileName,
    });
    if (!newCategory) {
      throw new HttpException(
        'Error has been detected during save information',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newMedia = await this.mediaService.create({
      media: fileName,
      target_table_id: newCategory.id,
      target_table_name: 'category',
    });
    await newMedia.save();
    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    const allCategory = await this.CategoryRepository.findAll({
      include: { all: true },
    });
    if (allCategory.length < 1) {
      throw new HttpException('Category is not found', HttpStatus.NOT_FOUND);
    }
    return allCategory;
  }

  async findOne(id: number): Promise<Category> {
    const oneCategory = await this.CategoryRepository.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    });
    if (!oneCategory) {
      throw new HttpException('Id is incorrect', HttpStatus.NOT_FOUND);
    }
    return oneCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updCategory = await this.CategoryRepository.findByPk(id);
    if (!updCategory) {
      throw new HttpException('Id is Incorrect', HttpStatus.NOT_FOUND);
    }
    const newCategory = await this.CategoryRepository.update(
      {
        ...updateCategoryDto,
      },
      { where: { id: id }, returning: true },
    );
    if (!newCategory) {
      throw new HttpException(
        'Error detected during update information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newCategory;
  }

  async remove(id: number): Promise<number> {
    const check = await this.CategoryRepository.findByPk(id);
    if (!check) {
      throw new HttpException('Id is incorrect', HttpStatus.NOT_FOUND);
    }
    await this.CategoryRepository.destroy({
      where: {
        id: id,
      },
    });
    return check.id;
  }
}
