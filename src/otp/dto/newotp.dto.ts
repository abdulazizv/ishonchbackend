import { IsString } from "class-validator";

export class newOtpDto{
    @IsString()
    readonly phone_number:string;
}