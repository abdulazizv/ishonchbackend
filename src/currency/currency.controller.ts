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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { adminGuard } from 'src/guards/admin.guard';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './schemas/currency.model';

@Controller('api/v2/currency')
@ApiTags('Currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @ApiOperation({ summary: "Currency qo'shish" })
  @ApiResponse({ status: 201, type: Currency })
  @ApiBearerAuth()
  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @ApiOperation({ summary: 'Currencylarni olish' })
  @ApiResponse({ status: 200, type: [Currency] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.currencyService.findAll();
  }

  @ApiOperation({ summary: 'Currency olish' })
  @ApiResponse({ status: 200, type: Currency })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyService.findOne(+id);
  }

  @ApiOperation({ summary: 'Currencyni yangilash' })
  @ApiResponse({ status: 200, type: Currency })
  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return this.currencyService.update(+id, updateCurrencyDto);
  }

  @ApiOperation({ summary: "Currency o'chirish" })
  @ApiResponse({ status: 202, type: Number })
  @ApiBearerAuth()
  @UseGuards(adminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyService.remove(+id);
  }
}
