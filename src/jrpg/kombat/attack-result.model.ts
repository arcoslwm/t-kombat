export class AttackResult {
  constructor(
    private _historyLine: string,
    private _energy: number,
  ) {}

  public get historyLine(): string {
    return this._historyLine;
  }
  public set historyLine(value: string) {
    this._historyLine = value;
  }
  public get energy(): number {
    return this._energy;
  }
  public set energy(value: number) {
    this._energy = value;
  }
}
