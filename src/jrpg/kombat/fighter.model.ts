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
   * contiene los 2 golpes especiales del pelador
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

  hasMoreActions() {
    return this.actionsQueue.length > 0;
  }

  /**
   * toma el primer elemento de actionStacks, identifica que tipo de action es contrastando con characterActions.
   * elimina el action de actionStack y retorna la energia que quita el golpe junto con el relato del ataque.
   *
   * @return  {[type]}  [return description]
   */
  attack(): AttackResult {
    if (!this.hasMoreActions()) {
      return new AttackResult('no se mueve', 0);
    }

    const currentAction = this.actionsQueue.shift();
    if (currentAction.hit === '' && currentAction.moves === '') {
      return new AttackResult('no se mueve', 0);
    }

    if (currentAction.hit === '' && currentAction.moves.length > 0) {
      return new AttackResult(`solo se mueve${currentAction.movesToString()}`, 0);
    }

    //check specialActions
    for (let i = 0; i < this.specialActions.length; i++) {
      const specialAction = this.specialActions[i];
      let actionToCheck = currentAction;
      let divisorIndex = null;

      //hay movimientos antes de especialAction candidata
      if (currentAction.moves.length > specialAction.moves.length) {
        divisorIndex = currentAction.moves.length - specialAction.moves.length;
        actionToCheck = new Action(currentAction.moves.substring(divisorIndex), currentAction.hit);
      }

      //es especialAction
      if (specialAction.checkAction(actionToCheck)) {
        let historyLine = '';

        //hay movimientos antes del especialAction
        if (divisorIndex !== null) {
          const movesAction = new Action(currentAction.moves.substring(0, divisorIndex), '');
          historyLine += `se mueve ${movesAction.movesToString()} y `;
        }
        return new AttackResult(
          `${historyLine}hace un ${specialAction.name}(${specialAction.energy})`,
          specialAction.energy,
        );
      }
    }

    //check hits(golpes)
    for (let i = 0; i < this.hitActions.length; i++) {
      const hitAction = this.hitActions[i];
      if (hitAction.hit === currentAction.hit) {
        let historyLine = '';
        if (currentAction.moves.length > 0) {
          historyLine += `se mueve${currentAction.movesToString()} y `;
        }
        return new AttackResult(
          `${historyLine}da un ${hitAction.name}(${hitAction.energy})`,
          hitAction.energy,
        );
      }
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
