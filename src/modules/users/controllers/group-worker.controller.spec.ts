import { Test, TestingModule } from '@nestjs/testing';
import { GroupWorkerController } from './group-worker.controller';

describe('GroupWorkerController', () => {
  let controller: GroupWorkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupWorkerController],
    }).compile();

    controller = module.get<GroupWorkerController>(GroupWorkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
