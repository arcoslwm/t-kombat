import { Module } from '@nestjs/common';
import { JrpgModule } from './jrpg/jrpg.module';
@Module({
  imports: [JrpgModule],
  controllers: [],
  providers: [], //estaran disponibles dentro del modulo
})
export class AppModule {}
