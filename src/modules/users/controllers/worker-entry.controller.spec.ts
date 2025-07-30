import { Test, TestingModule } from '@nestjs/testing';
import { WorkerEntryController } from './worker-entry.controller';

describe('WorkerEntryController', () => {
  let controller: WorkerEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerEntryController],
    }).compile();

    controller = module.get<WorkerEntryController>(WorkerEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
