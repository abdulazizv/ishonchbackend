import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LlService } from './ll.service';
import { CreateLlDto } from './dto/create-ll.dto';
import { UpdateLlDto } from './dto/update-ll.dto';

@Controller('ll')
export class LlController {
  constructor(private readonly llService: LlService) {}

  @Post()
  create(@Body() createLlDto: CreateLlDto) {
    return this.llService.create(createLlDto);
  }

  @Get()
  findAll() {
    return this.llService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.llService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLlDto: UpdateLlDto) {
    return this.llService.update(+id, updateLlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.llService.remove(+id);
  }
}
