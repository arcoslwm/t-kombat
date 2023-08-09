import { KombatActions } from './kombat-actions.dto';

/**
 * representa el JSON de entrada para generar un kombate de acuerdo a las reglas de talana-kombat
 */
export class CreateKombatDto {
  player1: KombatActions;
  player2: KombatActions;
}
