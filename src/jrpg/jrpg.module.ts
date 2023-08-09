import { Module } from '@nestjs/common';
import { JrpgController } from './jrpg.controller';
import { KombatService } from './kombat/kombat.service';

@Module({
  controllers: [JrpgController],
  providers: [KombatService],
})
export class JrpgModule {}
