import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { newOtpDto } from './dto/newotp.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Otp } from './schemas/otp.model';
import { Tokens } from '../types';

@Controller('api/v2/otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({ summary: 'Yangi toliq Otp yaratish,Deyarli ishlatilmaydi' })
  @ApiResponse({ status: 201, type: Otp })
  @ApiBearerAuth()
  @Post()
  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.create(createOtpDto);
  }

  @ApiOperation({ summary: "User kirmoqchi bo'lganda ishlatiladi" })
  @ApiResponse({ status: 201, type: Object })
  @ApiBearerAuth()
  @Post('newotp')
  newotp(@Body() newotpDto: newOtpDto) {
    return this.otpService.newOtp(newotpDto);
  }

  @ApiOperation({ summary: 'Otpni tasdiqlash' })
  @ApiResponse({ status: 200, type: Otp })
  @Post('verifyotp/:id')
  verifyotp(@Body() verifyotpDto: VerifyOtpDto, @Param('id') id: string) {
    return this.otpService.verifyOTP(id, verifyotpDto);
  }
  @ApiOperation({ summary: 'Hamma otplarni olish' })
  @ApiResponse({ status: 200, type: [Otp] })
  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @ApiOperation({ summary: 'Bitta otpni olish' })
  @ApiResponse({ status: 200, type: Otp })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpService.findOne(+id);
  }
  @ApiOperation({ summary: 'Otpni update qilish' })
  @ApiResponse({ status: 200, type: Otp })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(+id, updateOtpDto);
  }

  @ApiOperation({ summary: 'OTP ni delete qilish' })
  @ApiResponse({ status: 202, type: Otp })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otpService.remove(id);
  }
}
