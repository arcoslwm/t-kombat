import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KombatService } from './kombat/kombat.service';
import { CreateKombatDto } from './dto/request/create-kombat.dto';
import { KombatResponseDto } from './dto/response/kombat-response.dto';

@Controller('talana-kombat')
export class JrpgController {
  constructor(private kombatService: KombatService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  kombat(@Body() createKombatDto: CreateKombatDto): KombatResponseDto {
    const kombatRes = this.kombatService.confrontToTheDeath(createKombatDto);
    return kombatRes;
  }
}
