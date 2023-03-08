import { IsString } from 'class-validator';

export class SignInDto {
  @IsString({ message: 'Name need to be string' })
  readonly name: string;

  @IsString({message:'password need to be string'})
  readonly password:string;
}
