import { Body, Controller, Post } from '@nestjs/common';
import { KombatService } from './kombat/kombat.service';
import { CreateKombatDto } from './dto/create-kombat.dto';

@Controller('talana-kombat')
export class JrpgController {
  constructor(private kombatService: KombatService) {}

  @Post()
  // kombat(@Body('player1') player1, @Body('player2') player2) {
  kombat(@Body() createKombatDto: CreateKombatDto) {
    console.debug('req:', createKombatDto);
    console.debug('s:', createKombatDto.constructor.name);
    // console.debug('player2', player2);

    return this.kombatService.createKombat(createKombatDto);
  }
}
