import { Test, TestingModule } from '@nestjs/testing';
import { KombatService } from './kombat.service';
import { BadRequestException } from '@nestjs/common';
import { CreateKombatDto } from '../dto/request/create-kombat.dto';

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

  it('checkKombat thrown Exception', () => {
    const mockInvalidCreateKombatDto: CreateKombatDto = {
      player1: {
        movimientos: ['D', 'DSD', 'S', 'DSD', 'SD'],
        golpes: ['K', 'P', '', 'K', 'P'],
      },
      player2: {
        movimientos: ['SA', 'SA', 'SA', 'ASA', 'SA'],
        golpes: [''],
      },
    };

    expect(() => {
      service.checkKombat(mockInvalidCreateKombatDto);
    }).toThrow(BadRequestException);
  });

  it('createKombat shoult define fighters', () => {
    const mockCreateKombatDto: CreateKombatDto = {
      player1: {
        movimientos: ['D', 'DSD', 'S', 'DSD', 'SD'],
        golpes: ['K', 'P', '', 'K', 'P'],
      },
      player2: {
        movimientos: ['SA', 'SA', 'SA', 'ASA', 'SA'],
        golpes: ['', 'P', '', 'K', 'P'],
      },
    };

    service.createKombat(mockCreateKombatDto);
    expect(service.attackingFighter).toBeDefined();
    expect(service.attackedFighter).toBeDefined();
  });

  it('confrontToTheDeath shoult call checkKombat and createKombat', async () => {
    const mockCreateKombatDto: CreateKombatDto = {
      player1: {
        movimientos: ['D', 'DSD', 'S', 'DSD', 'SD'],
        golpes: ['K', 'P', '', 'K', 'P'],
      },
      player2: {
        movimientos: ['SA', 'SA', 'SA', 'ASA', 'SA'],
        golpes: ['', 'P', '', 'K', 'P'],
      },
    };

    const checkKombatSpy = jest.spyOn(service, 'checkKombat');
    const createKombatSpy = jest.spyOn(service, 'createKombat');

    service.confrontToTheDeath(mockCreateKombatDto);

    expect(checkKombatSpy).toHaveBeenCalledWith(mockCreateKombatDto);
    expect(createKombatSpy).toHaveBeenCalledWith(mockCreateKombatDto);
  });

  it('confrontToTheDeath shoult provide a valid response', async () => {
    const mockCreateKombatDto: CreateKombatDto = {
      player1: {
        movimientos: ['D', 'DSD', 'S', 'DSD', 'SD'],
        golpes: ['K', 'P', '', 'K', 'P'],
      },
      player2: {
        movimientos: ['SA', 'SA', 'SA', 'ASA', 'SA'],
        golpes: ['', 'P', '', 'K', 'P'],
      },
    };

    const kombatResponseDto = service.confrontToTheDeath(mockCreateKombatDto);

    expect(kombatResponseDto).toHaveProperty('result');
    expect(kombatResponseDto).toHaveProperty('kombatHistory');
    expect(kombatResponseDto).toHaveProperty('fighters');
  });

});
