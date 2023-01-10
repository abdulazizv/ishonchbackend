import { Module } from '@nestjs/common';
import { LlService } from './ll.service';
import { LlController } from './ll.controller';

@Module({
  controllers: [LlController],
  providers: [LlService]
})
export class LlModule {}
