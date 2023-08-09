import { Test, TestingModule } from '@nestjs/testing';
import { KombatService } from './kombat.service';

describe('KombatService', () => {
  let service: KombatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KombatService],
    }).compile();

    service = module.get<KombatService>(KombatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
