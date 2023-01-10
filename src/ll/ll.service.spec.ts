import { Test, TestingModule } from '@nestjs/testing';
import { LlService } from './ll.service';

describe('LlService', () => {
  let service: LlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlService],
    }).compile();

    service = module.get<LlService>(LlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
