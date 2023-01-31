import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { JwtPayload, Tokens } from 'src/types';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository:typeof User,
  private readonly jwtService:JwtService) { }

  async createfromOtp(phone_number:string){
    const user = await this.userRepository.create({
      user_phone:phone_number
    })
    return user
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto)
    if(!user){
      throw new HttpException(
        "Information not found",
        HttpStatus.BAD_GATEWAY
      )
    }
    return user
  }

  async unAdmin(id:number): Promise<Boolean>{
    const user = await this.userRepository.findOne({
      where:{
        id:id
      }
    })
    if(!user){
      throw new HttpException(
        "Id xato kiritilgan",
        HttpStatus.NOT_FOUND
      )
    }
    user.is_admin = false
    user.save()
    return true
  }
  async doAdmin(id:number): Promise<Boolean>{
    const user = await this.userRepository.findOne({
      where:{
        id:id
      }
    })
    if(!user){
      throw new HttpException(
        "Id xato kiritilgan",
        HttpStatus.NOT_FOUND
      )
    }
    user.is_admin = true
    user.save()
    const tokens = await this.getTokens(user.id,true,true,user.is_creator)
    return true
  }
  async logout(id:number){
    const user = await this.userRepository.findOne({
      where:{
        id:+id
      }
    })  
    if(!user){
      throw new HttpException(
        "Id is incorrect! Information not found",
        HttpStatus.FORBIDDEN
      )
    }
    user.hashed_refresh_token = null
    user.save()
    return "User is deleted"
  }
  async refreshtoken(id:number){
    const user = await this.userRepository.findByPk(+id)
    if(!user) {
      throw new HttpException(
        'Id is incorrect',
        HttpStatus.FORBIDDEN
      )
    }
    const tokens = await this.getTokens(user.id,true,user.is_admin,user.is_creator)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)
    user.hashed_refresh_token = hashed_refresh_token
    user.save()
    return tokens
  }


  async findAll() {
    const allUser = await this.userRepository.findAll({include:{all:true}})
    if(!allUser) {
      throw new HttpException(
        "Information not found! Maybe database is empty",
        HttpStatus.NOT_FOUND
      )
    }
    return allUser
  }

  async findOne(id: number) {
    const oneUser = await this.userRepository.findOne({
      where:{
        id:+id
      }
    })
    if(!oneUser) {
      throw new HttpException(
        "ID is incorrect",
        HttpStatus.NOT_FOUND
      )
    }
    return oneUser
  }

  async findbyNumber(phone_number:string){
    const datas = await this.userRepository.findOne({
      where:{
        user_phone:phone_number
      }
    })
    if (datas === null){
      return datas
    }else{
      return datas
    } 
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const check = await this.userRepository.findOne({
      where:{
        id:+id
      }
    })
    if(!check){
      throw new HttpException(
        "ID is incorrect",
        HttpStatus.NOT_FOUND
      )
    }
    const updateUser = await this.userRepository.update({
      ...updateUserDto
    },{
      where:{
        id:+id
      }
    })
    return updateUser
  }

  async remove(id: number) {
    const check = await this.userRepository.findOne({
      where:{
        id:+id
      }
    })
    if(!check){
      throw new HttpException(
        "ID is incorrect,Information not found",
        HttpStatus.NOT_FOUND
      )
    }
    await this.userRepository.destroy({
      where:{
        id:+id
      }
    })
    return check.id
  }
  async getTokens(userId: number,is_active:boolean, is_admin: boolean,is_creator:boolean): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      is_active:is_active,
      is_admin:is_admin,
      is_creator:is_creator
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
