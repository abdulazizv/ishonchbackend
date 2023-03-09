import { ApiProperty } from '@nestjs/swagger';

export class orderSearchDto {
  @ApiProperty({
    example: 'wwqqw11221',
    description: 'unique deviceId of order',
  })
  readonly deviceId: string;
}
