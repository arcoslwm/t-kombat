import { Module } from '@nestjs/common';
import { JrpgController } from './jrpg.controller';

@Module({
  controllers: [JrpgController]
})
export class JrpgModule {}
