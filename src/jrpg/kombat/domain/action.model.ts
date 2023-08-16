/**
 * modela las acciones de un peleador en talana-kombat,
 * se compone de movimientos(ASDW) + golpe
 */
export class Action {
  constructor(
    protected _moves: string,
    private _hit: string,
  ) {}

  get moves(): string {
    return this._moves;
  }
  set moves(value: string) {
    this._moves = value;
  }
  get hit(): string {
    return this._hit;
  }
  set hit(value: string) {
    this._hit = value;
  }
  toString(): string {
    return `${this._moves}+${this._hit}`;
  }

  movesToString(): string {
    let movesString = '';
    let i = 0;
    for (const move of this.moves) {
      if (i > 0) {
        movesString += ',';
      }
      switch (move) {
        case 'W':
          movesString += ' arriba';
          break;
        case 'S':
          movesString += ' abajo';
          break;
        case 'A':
          movesString += ' izquierda';
          break;
        case 'D':
          movesString += ' derecha';
          break;
      }
      i++;
    }
    return movesString;
  }
}
