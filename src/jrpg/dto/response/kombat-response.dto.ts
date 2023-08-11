import { FighterDto } from "./fighter.dto";

export class KombatResponseDto {
  result: string;
  kombatHistory: string[];
  fighters: FighterDto[];
}
