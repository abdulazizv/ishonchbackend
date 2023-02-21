import { IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString({ message: 'Name string bolishi kerak' })
  readonly name: string;
  @IsString({ message: 'Password string bolishi kerak' })
  readonly password: string;
}
