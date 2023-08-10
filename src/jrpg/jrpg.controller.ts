import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KombatService } from './kombat/kombat.service';
import { CreateKombatDto } from './dto/create-kombat.dto';

@Controller('talana-kombat')
export class JrpgController {
  constructor(private kombatService: KombatService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  kombat(@Body() createKombatDto: CreateKombatDto) {
    console.debug('req:', createKombatDto);
    console.debug('s:', createKombatDto.constructor.name);
    // console.debug('player2', player2);

    return this.kombatService.createKombat(createKombatDto);
  }
}
