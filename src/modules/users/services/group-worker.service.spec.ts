import { Test, TestingModule } from '@nestjs/testing';
import { GroupWorkerService } from './group-worker.service';

describe('GroupWorkerService', () => {
  let service: GroupWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupWorkerService],
    }).compile();

    service = module.get<GroupWorkerService>(GroupWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
