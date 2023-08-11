import { IsNotEmpty, ValidateNested } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { KombatActionsDto } from './kombat-actions.dto';

/**
 * representa el JSON de entrada para generar un kombate de acuerdo a las reglas de talana-kombat
 */
export class CreateKombatDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => KombatActionsDto)
  player1: KombatActionsDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => KombatActionsDto)
  player2: KombatActionsDto;
}
