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
import { NotebookCharacteristicsService } from './notebook_characteristics.service';
import { CreateNotebookCharacteristicDto } from './dto/create-notebook_characteristic.dto';
import { UpdateNotebookCharacteristicDto } from './dto/update-notebook_characteristic.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';
import { Notebook } from './schemas/notebook.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { adminGuard } from 'src/guards/admin.guard';

@Controller('notebook-characteristics')
export class NotebookCharacteristicsController {
  constructor(
    private readonly notebookCharacteristicsService: NotebookCharacteristicsService,
  ) {}

  @ApiOperation({ summary: "Notebook_characterics qo'shish" })
  @ApiResponse({ status: 201, type: Notebook })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() createNotebookCharacteristicDto: CreateNotebookCharacteristicDto,
    @UploadedFile() image: string,
  ) {
    return this.notebookCharacteristicsService.create(
      createNotebookCharacteristicDto,
      image,
    );
  }

  @ApiOperation({ summary: 'Notebook_charactericslarni olish' })
  @ApiResponse({ status: 200, type: [Notebook] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.notebookCharacteristicsService.findAll();
  }

  @ApiOperation({ summary: 'Notebook_charactericsni olish' })
  @ApiResponse({ status: 200, type: Notebook })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notebookCharacteristicsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Notebook_characterics yangilash' })
  @ApiResponse({ status: 200, type: Notebook })
  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotebookCharacteristicDto: UpdateNotebookCharacteristicDto,
  ) {
    return this.notebookCharacteristicsService.update(
      +id,
      updateNotebookCharacteristicDto,
    );
  }

  @ApiOperation({ summary: "Notebook_charactericsni o'chirish" })
  @ApiResponse({ status: 202, type: Number })
  @ApiBearerAuth()
  @UseGuards(adminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notebookCharacteristicsService.remove(+id);
  }
}
