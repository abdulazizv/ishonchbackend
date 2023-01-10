import { Injectable } from '@nestjs/common';
import { CreateLlDto } from './dto/create-ll.dto';
import { UpdateLlDto } from './dto/update-ll.dto';

@Injectable()
export class LlService {
  create(createLlDto: CreateLlDto) {
    return 'This action adds a new ll';
  }

  findAll() {
    return `This action returns all ll`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ll`;
  }

  update(id: number, updateLlDto: UpdateLlDto) {
    return `This action updates a #${id} ll`;
  }

  remove(id: number) {
    return `This action removes a #${id} ll`;
  }
}
