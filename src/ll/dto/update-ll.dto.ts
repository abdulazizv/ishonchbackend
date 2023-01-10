import { PartialType } from '@nestjs/swagger';
import { CreateLlDto } from './create-ll.dto';

export class UpdateLlDto extends PartialType(CreateLlDto) {}
