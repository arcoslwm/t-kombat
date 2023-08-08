import { Test, TestingModule } from '@nestjs/testing';
import { JrpgController } from './jrpg.controller';

describe('JrpgController', () => {
  let controller: JrpgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JrpgController],
    }).compile();

    controller = module.get<JrpgController>(JrpgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
