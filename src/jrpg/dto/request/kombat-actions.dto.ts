import {
  IsArray,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from '@nestjs/class-validator';

/**
 * Representa los arrays de acciones de un peleador para un combate
 */
export class KombatActionsDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(5, { each: true })
  @Matches('^[WASD]{0,5}$', undefined, { each: true })
  movimientos: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(1, { each: true })
  @Matches('^[PK]{0,1}$', undefined, { each: true })
  golpes: string[];
}
