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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { adminGuard } from 'src/guards/admin.guard';
import { userGuard } from 'src/guards/user.guard';
import { AppliancesCharacteristicsService } from './appliances_characteristics.service';
import { CreateAppliancesCharacteristicDto } from './dto/create-appliances_characteristic.dto';
import { UpdateAppliancesCharacteristicDto } from './dto/update-appliances_characteristic.dto';
import { Appliances } from './schemas/appliancesCharacteric.model';

@Controller('api/v2/appliances-characteristics')
export class AppliancesCharacteristicsController {
  constructor(
    private readonly appliancesCharacteristicsService: AppliancesCharacteristicsService,
  ) {}

  @ApiOperation({ summary: 'Appliances_characterics qoshish' })
  @ApiResponse({ status: 201, type: Appliances })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(adminGuard)
  @Post()
  create(
    @Body()
    createAppliancesCharacteristicDto: CreateAppliancesCharacteristicDto,
    @UploadedFile() image: string,
  ) {
    return this.appliancesCharacteristicsService.create(
      createAppliancesCharacteristicDto,
      image,
    );
  }

  @ApiOperation({ summary: 'Appliances_charactericslarni olish' })
  @ApiResponse({ status: 200, type: [Appliances] })
  @ApiBearerAuth()
  @UseGuards(userGuard)
  @Get()
  async findAll() {
    return this.appliancesCharacteristicsService.findAll();
  }

  @ApiOperation({ summary: 'Appliances_charactericsni olish' })
  @ApiResponse({ status: 200, type: Appliances })
  @ApiBearerAuth()
  @UseGuards(userGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appliancesCharacteristicsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Appliances_characterics yangilash' })
  @ApiResponse({ status: 200, type: Appliances })
  @ApiBearerAuth()
  @UseGuards(adminGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateAppliancesCharacteristicDto: UpdateAppliancesCharacteristicDto,
  ) {
    return this.appliancesCharacteristicsService.update(
      +id,
      updateAppliancesCharacteristicDto,
    );
  }

  @ApiOperation({ summary: "Appliances_characterics o'chirish" })
  @ApiResponse({ status: 202, type: Number })
  @ApiBearerAuth()
  @UseGuards(adminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appliancesCharacteristicsService.remove(+id);
  }
}
