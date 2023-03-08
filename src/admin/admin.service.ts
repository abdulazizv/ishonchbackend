import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { AST } from 'eslint';
import Token = AST.Token;
import { Tokens } from '../types';
import { getTokens } from '../helpers/getTokens.helper';
import { SignInDto } from './dto/sign-in.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepository: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = await this.adminRepository.create(createAdminDto);
    if (!newAdmin) {
      throw new HttpException(
        'Error has been detected during save information',
        HttpStatus.BAD_GATEWAY,
      );
    }
    return newAdmin;
  }

  async findAll() {
    const allAdmin = await this.adminRepository.findAll({
      include: { all: true },
    });
    if (allAdmin.length < 1) {
      throw new HttpException(
        'Informations not found, Table is empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return allAdmin;
  }

  async findOne(id: number) {
    const oneAdmin = await this.adminRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!oneAdmin) {
      throw new HttpException('Id is incorrect', HttpStatus.NOT_FOUND);
    }
    return oneAdmin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const check = await this.adminRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!check) {
      throw new HttpException(
        'Not updated! Id is incorrect',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.adminRepository.update(
      {
        ...updateAdminDto,
      },
      {
        where: {
          id: +id,
        },
      },
    );
  }

  async remove(id: number) {
    const check = await this.adminRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!check) {
      throw new HttpException('Id is incorrect', HttpStatus.NOT_FOUND);
    }
    await this.adminRepository.findOne({
      where: {
        id: +id,
      },
    });
    return true;
  }

  async signup(createAdminDto: CreateAdminDto): Promise<Tokens> {
    try {
    } catch (err) {
      throw new HttpException('Unwaited error', HttpStatus.BAD_GATEWAY);
    }
    const newAdmin = await this.adminRepository.create({
      name: createAdminDto.name,
      password: createAdminDto.password
    });
    const tokens = await getTokens(newAdmin.id, true, true, false);
    return tokens;
  }

  async signIn(signInDto: SignInDto) {
    const { name,password } = signInDto;
    const checkAdmin = await this.adminRepository.findOne({
      where: {
        name: name,
      },
    });
    
    if (!checkAdmin) {
      throw new HttpException('Name is not correct !', HttpStatus.PARTIAL_CONTENT);
    }
    if(checkAdmin.password === password) {
      throw new HttpException (
        'Password or login is not correct',
        HttpStatus.RESET_CONTENT
      )
    }
    const newTokens = await getTokens(checkAdmin.id,true,true,false);
    return newTokens;
  }
}
