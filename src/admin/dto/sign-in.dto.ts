import { IsString } from 'class-validator';

export class SignInDto {
  @IsString({ message: 'Name need to be string' })
  readonly name: string;
}
