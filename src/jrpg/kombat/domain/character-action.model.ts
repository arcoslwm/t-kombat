import { Action } from './action.model';

export class CharacterAction extends Action {
  constructor(
    private _name: string,
    private _energy: number,
    moves: string,
    hit: string,
  ) {
    super(moves, hit);
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

  /**
   * comprueba si el action recibido corresponde al action actual
   *
   * @param   {Action}   act  [act description]
   *
   * @return  {boolean}       [return description]
   */
  public checkAction(act: Action): boolean {
    return act.toString() === this.toString();
  }

  /**
   * Retorna un string con la descripcion de la accion.
   */
  public history(): string {
    return `${this.name}(${this.energy})`;
  }
}
