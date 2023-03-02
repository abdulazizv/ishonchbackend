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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.model';
import { userGuard } from 'src/guards/user.guard';
import { adminGuard } from 'src/guards/admin.guard';
import { userParamGuard } from 'src/guards/userParam.guard';
import { isCreatorOrAdminGuard } from 'src/guards/iscreatororadmin.guard';

@Controller('api/v2/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Userlarni qo'shish" })
  @ApiResponse({ status: 201, type: User })
  @ApiBearerAuth()
  @UseGuards(userGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Tokenni yangilash' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Post('refreshToken/:id')
  refreshtoken(@Param('id') id: number) {
    return this.usersService.refreshtoken(+id);
  }

  @ApiOperation({ summary: 'Userning logout qilishi' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Post('user/logout/:id')
  logout(@Param('id') id: number) {
    return this.usersService.logout(+id);
  }
  @ApiOperation({ summary: 'Userlarni olish' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @UseGuards(adminGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Userni olish' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @UseGuards(userParamGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Userni yangilash' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @UseGuards(userParamGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Userni adminlikdan olish' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBearerAuth()
  @UseGuards(isCreatorOrAdminGuard)
  @Delete('admin/:id')
  unAdmin(@Param('id') id: number) {
    return this.usersService;
  }
  @ApiOperation({ summary: 'Userni admin qilish' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBearerAuth()
  @UseGuards(isCreatorOrAdminGuard)
  @Put('admin/:id')
  doAdmin(@Param('id') id: number) {
    return this.usersService.doAdmin(+id);
  }
  @ApiOperation({ summary: "Userni o'chirish" })
  @ApiResponse({ status: 202, type: User })
  @ApiBearerAuth()
  @UseGuards(adminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
