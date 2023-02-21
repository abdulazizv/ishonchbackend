import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload, Tokens } from 'src/types';
import { getTokens } from '../helpers/getTokens.helper';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async createfromOtp(phone_number: string) {
    const user = await this.userRepository.create({
      user_phone: phone_number,
    });
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    if (!user) {
      throw new HttpException('Information not found', HttpStatus.BAD_GATEWAY);
    }
    return user;
  }

  async unAdmin(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException('Id is incorrect', HttpStatus.NOT_FOUND);
    }
    user.is_admin = false;
    await user.save();
    return true;
  }
  async doAdmin(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException('Id is incorrect', HttpStatus.NOT_FOUND);
    }
    user.is_admin = true;
    await user.save();
    const tokens = await getTokens(user.id, true, true, user.is_creator);
    return true;
  }
  async logout(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!user) {
      throw new HttpException(
        'Id is incorrect! Information not found',
        HttpStatus.FORBIDDEN,
      );
    }
    user.hashed_refresh_token = null;
    await user.save();
    return 'User is deleted';
  }
  async refreshtoken(id: number) {
    const user = await this.userRepository.findByPk(+id);
    if (!user) {
      throw new HttpException('Id is incorrect', HttpStatus.FORBIDDEN);
    }
    const tokens = await getTokens(
      user.id,
      true,
      user.is_admin,
      user.is_creator,
    );
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    user.hashed_refresh_token = hashed_refresh_token;
    await user.save();
    return tokens;
  }

  async findAll() {
    const allUser = await this.userRepository.findAll({
      include: { all: true },
    });
    if (!allUser) {
      throw new HttpException(
        'Information not found! Maybe database is empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return allUser;
  }

  async findOne(id: number) {
    const oneUser = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!oneUser) {
      throw new HttpException('ID is incorrect', HttpStatus.NOT_FOUND);
    }
    return oneUser;
  }

  async findbyNumber(phone_number: string) {
    const datas = await this.userRepository.findOne({
      where: {
        user_phone: phone_number,
      },
    });
    if (!datas) {
      throw new HttpException(
        'Phone number is incorrect',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return datas;
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const check = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!check) {
      throw new HttpException('ID is incorrect', HttpStatus.NOT_FOUND);
    }
    const updateUser = await this.userRepository.update(
      {
        ...updateUserDto,
      },
      {
        where: {
          id: +id,
        },
      },
    );
    return updateUser;
  }

  async remove(id: number) {
    const check = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!check) {
      throw new HttpException(
        'ID is incorrect,Information not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userRepository.destroy({
      where: {
        id: +id,
      },
    });
    return check.id;
  }

}
