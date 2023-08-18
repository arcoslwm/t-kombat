import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKombatDto } from '../dto/request/create-kombat.dto';
import { Fighter } from './domain/fighter.model';
import { KombatResponseDto } from '../dto/response/kombat-response.dto';

@Injectable()
export class KombatService {
  private _attackingFighter: Fighter;
  private _attackedFighter: Fighter;
  private hasWinner: boolean = false;
  private kombatHistory: string[] = [];

  public get attackedFighter(): Fighter {
    return this._attackedFighter;
  }
  public set attackedFighter(value: Fighter) {
    this._attackedFighter = value;
  }
  
  public get attackingFighter(): Fighter {
    return this._attackingFighter;
  }
  public set attackingFighter(value: Fighter) {
    this._attackingFighter = value;
  }

  /**
   * Inicializa personajes de la pelea con las acciones que realizaran a lo largo del kombate
   * setea las acciones especiales que tendrá cada uno
   *
   * @param   {CreateKombatDto}  createKombatDto  [createKombatDto description]
   */
  createKombat(createKombatDto: CreateKombatDto): void {
    this.attackingFighter = new Fighter(
      'player1',
      'Tony Stallone',
      6,
      createKombatDto.player1.movimientos,
      createKombatDto.player1.golpes,
    );
    this.attackedFighter = new Fighter(
      'player2',
      'Arnaldor Shuatseneguer',
      6,
      createKombatDto.player2.movimientos,
      createKombatDto.player2.golpes,
    );

    if (
      //cambia quien parte atacando de ser necesario
      this.attackingFighter.firstActionLenght() > this.attackedFighter.firstActionLenght() ||
      this.attackingFighter.firstMovesLenght() > this.attackedFighter.firstMovesLenght() ||
      this.attackingFighter.firstHitLenght() > this.attackedFighter.firstHitLenght()
    ) {
      this.swapPlayerTurn();
    }
  }

  /**
   * retorna el resultado del kombate y el 'relato'
   * ejecuta una a una las acciones de cada peleador hasta el termino del kombate
   */
  confrontToTheDeath(createKombatDto: CreateKombatDto): KombatResponseDto {
    this.checkKombat(createKombatDto);
    this.createKombat(createKombatDto);

    this.kombatHistory = [];
    while (
      this.attackingFighter.hasMoreActions() ||
      this.attackedFighter.hasMoreActions()
    ) {
      const atackResult = this.attackingFighter.attack();
      this.attackedFighter.updateEnergy(atackResult.energy);

      this.kombatHistory.push(
        //setea relato de la accion en el kombate
        `${this.attackingFighter.name} ${
          atackResult.historyLine
        } y ${this.attackedFighter.historyEnergy()}`,
      );

      if (this.attackedFighter.energy === 0) {
        this.hasWinner = true;
        // kombatHistory.push(`${this.attackedFighter.historyEnergy()}`);
        break;
      }

      this.swapPlayerTurn();
    }

    return {
      result: this.historyFinal(),
      kombatHistory: this.kombatHistory,
      fighters: [
        {
          player: this.attackingFighter.player,
          name: this.attackingFighter.name,
          energy: this.attackingFighter.energy,
        },
        {
          player: this.attackedFighter.player,
          name: this.attackedFighter.name,
          energy: this.attackedFighter.energy,
        },
      ],
    };
  }

  /**
   * Intercambia turnos en kombate.
   */
  private swapPlayerTurn(): void {
    [this.attackingFighter, this.attackedFighter] = [this.attackedFighter, this.attackingFighter];
  }

  /**
   * setea el cierre del kombate con una ultima cadena en: kombatHistory
   * y retorna el string que  se responde como resultado final del kombate
   * 
   */
  private historyFinal(): string {
    let resultString = '';
    if (this.hasWinner) {
      this.kombatHistory.push(
        `${this.attackingFighter.name} gana el Kombate y aún le queda ${this.attackingFighter.energy} de Energia`
      );
      resultString = `${this.attackingFighter.name} gana el Kombate`;
    } else {
      //ningun peleador con energia en 0
      const attackingEnergy = this.attackingFighter.energy;
      const attackedEnergy = this.attackedFighter.energy;
      const finishString = 'Termina la pelea ';

      if (attackingEnergy === attackedEnergy) {

        this.kombatHistory.push(
          `${finishString}en un empate ambos peleadores con ${attackingEnergy} de Energia`
        );
        resultString = 'Empate entre los peladores';
      } else if (attackingEnergy > attackedEnergy) {
        this.kombatHistory.push(
          `${finishString}${this.attackingFighter.name} gana el Kombate  y aún le queda ${attackingEnergy} de Energia y a ${this.attackedFighter.name} le queda ${attackedEnergy} `,
        );
        resultString = `${this.attackingFighter.name} gana el Kombate`;
      } else {
        this.kombatHistory.push(
          `${finishString}${this.attackedFighter.name} gana el Kombate y aún le queda ${attackedEnergy} de Energia y a ${this.attackingFighter.name} le queda ${attackingEnergy} `,
        );
        resultString = `${this.attackedFighter.name} gana el Kombate`;
      }
    }
    return resultString;
  }

  /**
   * checkea que para cada player el largo de  arrays de golpes y movimientos  sea igual
   * (validacion de request que no se hace a traves de decoradores.)
   *
   * @param   {CreateKombatDto}  createKombatDto  [createKombatDto description]
   *
   * @return  {[void]}                            void
   */
  checkKombat(createKombatDto: CreateKombatDto): void {
    for (const playerKey of Object.keys(createKombatDto)) {
      if (
        createKombatDto[playerKey].golpes.length !== createKombatDto[playerKey].movimientos.length
      ) {
        throw new BadRequestException(
          `El número de golpes y movimientos no coinciden para el ${playerKey}`,
        );
      }
    }
  }
}
