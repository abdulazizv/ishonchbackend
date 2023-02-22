import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Admin } from './models/admin.model';

import { Tokens } from '../types/index';
import { SignInDto } from "./dto/sign-in.dto";
@Controller('api/v2/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create new admin ' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('add')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('all')
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get one #{id} admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one #{id} admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete one #{id} admin' })
  @ApiResponse({ status: 202, type: Boolean })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @ApiOperation({ summary: 'Sign up for admin' })
  @ApiResponse({ status: 201, type: Object })
  @Post('signup')
  signUP(@Body() signupDto: CreateAdminDto) {
    return this.adminService.signup(signupDto);
  }

  @ApiOperation({ summary: 'Sign in for admin' })
  @ApiResponse({ status: 200, type: Object })
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.adminService.signIn(signInDto);
  }
}
