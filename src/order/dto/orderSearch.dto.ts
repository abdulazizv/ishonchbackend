import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator'
export class orderSearchDto {
  @ApiProperty({
    example: 'wwqqw11221',
    description: 'unique deviceId of order',
  })
  @IsString()
  readonly deviceId: string;
}
