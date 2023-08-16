import { Action } from './action.model';
import { AttackResult } from './attack-result.model';
import { CharacterAction } from './character-action.model';
export class Fighter {
  /**
   * Contiene las acciones que realizara el peleador en un kombate
   *
   */
  private actionsQueue: Action[] = [];

  /**
   * contiene los 2 golpes especiales del peleador
   *
   * @var {[type]}
   */
  private specialActions: CharacterAction[] = [];

  /**
   * contiene los glopes de puño y patada
   *
   * @var {[type]}
   */
  private hitActions: CharacterAction[] = [];

  private currentAction: Action | undefined;

  constructor(
    private _player: string,
    private _name: string,
    private _energy: number,
    movimientos: string[],
    golpes: string[],
  ) {
    for (let i = 0; i < movimientos.length; i++) {
      this.actionsQueue.push(new Action(movimientos[i], golpes[i]));
    }

    this.setCharacterActions();
  }

  public get player(): string {
    return this._player;
  }
  public set player(value: string) {
    this._player = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get energy(): number {
    return this._energy;
  }
  public set energy(value: number) {
    this._energy = value;
  }

  firstActionLenght(): number {
    return this.getActionsQueue()[0].toString().length;
  }

  firstMovesLenght(): number {
    return this.getActionsQueue()[0].moves.length;
  }

  firstHitLenght(): number {
    return this.getActionsQueue()[0].hit.length;
  }

  getSpecialsActions(): CharacterAction[] {
    return this.specialActions;
  }

  getActionsQueue(): Action[] {
    return this.actionsQueue;
  }

  updateEnergy(val: number) {
    this.energy = this.energy + val;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Retorna la energia restante en modo relato
   */
  historyEnergy(): string {
    if (this.energy === 0) {
      return `El pobre ${this.name} se ha quedado sin energia`
    }
    return `${this.name} se queda con ${this.energy} de energia`;
  }

  hasMoreActions() {
    return this.actionsQueue.length > 0;
  }

  /**
   * toma el primer elemento de actionsQueue, identifica que tipo de action es contrastando con las actiones del peleador.
   * elimina el action de actionsQueue y retorna el resultado del ataque
   *
   * @return  {[type]}  [return description]
   */
  attack(): AttackResult {
    if (!this.hasMoreActions()) {
      return new AttackResult('no se mueve', 0);
    }

    this.currentAction = this.actionsQueue.shift();
    if (this.currentAction.hit === '' && this.currentAction.moves === '') {
      return new AttackResult('no se mueve', 0);
    }

    if (this.currentAction.hit === '' && this.currentAction.moves.length > 0) {
      return new AttackResult(
        `solo se mueve${this.currentAction.movesToString()}`,
        0,
      );
    }

    //check specialActions
    for (let i = 0; i < this.specialActions.length; i++) {
      const specialAction = this.specialActions[i];
      const attackResult = this.checkIfCurrentActionIsSpecialAction(specialAction);
      if (attackResult.historyLine !== '') {
        return attackResult;
      }
    }

    //check hits(golpes)
    for (let i = 0; i < this.hitActions.length; i++) {
      const hitAction = this.hitActions[i];
      const attackResult = this.checkIfCurrentActionIsHit(hitAction);
      if (attackResult.historyLine !== '') {
        return attackResult;
      }
    }
    return new AttackResult('', 0);
  }

  /**
   * checkea si el action actual del peleador, corresponde con el CharacterAction recibido (ej: chequea si es un Taladouken)
   * Retorna el resultado del ataque en AttackResult
   * 
   * @param specialAction 
   * @returns AttackResult
   */
  private checkIfCurrentActionIsSpecialAction(
    specialAction: CharacterAction,
  ): AttackResult {
    let actionToCheck = this.currentAction;
    let divisorIndex = null;

    //hay movimientos antes de especialAction candidata
    if (this.currentAction.moves.length > specialAction.moves.length) {
      divisorIndex = this.currentAction.moves.length - specialAction.moves.length;

      actionToCheck = new Action(
        this.currentAction.moves.substring(divisorIndex),
        this.currentAction.hit,
      );
    }

    //es especialAction
    if (specialAction.checkAction(actionToCheck)) {
      let historyLine = '';

      //hay movimientos antes del especialAction
      if (divisorIndex !== null) {
        const movesAction = new Action(
          this.currentAction.moves.substring(0, divisorIndex),
          '',
        );
        historyLine += `se mueve ${movesAction.movesToString()} y `;
      }
      return new AttackResult(
        `${historyLine}hace un ${specialAction.history()}`,
        specialAction.energy,
      );
    }

    return new AttackResult('', 0);
  }

  /**
   * Chequea si el currenAction del peleador corresponde con el hitAction recibido (puño o patada)
   * Retorna el resultado del ataque.
   * @param hitAction 
   * @returns AttackResult
   */
  private checkIfCurrentActionIsHit(hitAction: CharacterAction): AttackResult {
    if (hitAction.hit === this.currentAction.hit) {
      let historyLine = '';
      if (this.currentAction.moves.length > 0) {
        historyLine += `se mueve${this.currentAction.movesToString()} y `;
      }
      return new AttackResult(
        `${historyLine}da un ${hitAction.history()}`,
        hitAction.energy,
      );
    }
    return new AttackResult('', 0);
  }

  /**
   * setea las acciones especiales segun player
   * @todo controlar con enum
   */
  private setCharacterActions() {
    switch (this.player) {
      case 'player1':
        this.specialActions = [
          new CharacterAction('Taladoken', -3, 'DSD', 'P'),
          new CharacterAction('Remuyuken', -2, 'SD', 'K'),
        ];
        break;
      case 'player2':
        this.specialActions = [
          new CharacterAction('Remuyuken', -3, 'SA', 'K'),
          new CharacterAction('Taladoken', -2, 'ASA', 'P'),
        ];
        break;
      default:
        break;
    }
    this.hitActions.push(new CharacterAction('Puño', -1, '', 'P'));
    this.hitActions.push(new CharacterAction('Patada', -1, '', 'K'));
  }
}
