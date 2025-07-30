import { Test, TestingModule } from '@nestjs/testing';
import { WorkerEntryService } from './worker-entry.service';

describe('WorkerEntryService', () => {
  let service: WorkerEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerEntryService],
    }).compile();

    service = module.get<WorkerEntryService>(WorkerEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
