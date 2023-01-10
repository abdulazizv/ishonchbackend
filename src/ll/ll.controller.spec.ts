import { Test, TestingModule } from '@nestjs/testing';
import { LlController } from './ll.controller';
import { LlService } from './ll.service';

describe('LlController', () => {
  let controller: LlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlController],
      providers: [LlService],
    }).compile();

    controller = module.get<LlController>(LlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
