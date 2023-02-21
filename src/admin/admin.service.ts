import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';

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
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
