import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';
import { adminGuard } from 'src/guards/admin.guard';
import { userGuard } from 'src/guards/user.guard';
import { DescriptionService } from './description.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { Description } from './schemas/description.model';

@Controller('description')
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) {}

  @ApiOperation({ summary: "Description qo'shish" })
  @ApiResponse({ status: 201, type: Description })
  @ApiBearerAuth()
  @Post()
  create(@Body() createDescriptionDto: CreateDescriptionDto) {
    return this.descriptionService.create(createDescriptionDto);
  }

  @ApiOperation({ summary: 'Descriptionlarni olish' })
  @ApiResponse({ status: 200, type: [Description] })
  @ApiBearerAuth()
  @UseGuards(userGuard)
  @Get()
  findAll() {
    return this.descriptionService.findAll();
  }

  @ApiOperation({ summary: 'Descriptionni olish' })
  @ApiResponse({ status: 200, type: Description })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.descriptionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Description yangilash' })
  @ApiResponse({ status: 200, type: Description })
  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
  ) {
    return this.descriptionService.update(+id, updateDescriptionDto);
  }

  @ApiOperation({ summary: "Description o'chirish" })
  @ApiResponse({ status: 202, type: Number })
  @ApiBearerAuth()
  @UseGuards(adminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.descriptionService.remove(+id);
  }
}
