import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { adminGuard } from 'src/guards/admin.guard';
import { userGuard } from 'src/guards/user.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/category.model';

@Controller('api/v2/category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "Category qo'shish" })
  @ApiResponse({ status: 201, type: Category })
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: string,
  ) {
    return this.categoryService.create(createCategoryDto, image);
  }

  @ApiOperation({ summary: 'Categorylarni olish' })
  @ApiResponse({ status: 200, type: [Category] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Categoryni olish' })
  @ApiResponse({ status: 200, type: Category })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Category yangilash' })
  @ApiResponse({ status: 200, type: Category })
  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Category o'chirish" })
  @ApiResponse({ status: 202, type: Number })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
