export class Fighter {
  name: string;
  energy: number;

  //mapa de combinaciones
  //golpes (?)

  updateEnergy(val: number) {
    this.energy = this.energy + val;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }
  checkSpecialCombination(combination: string): boolean {
    // return this.specialCombis.find(specialCombi => check strings)
    console.debug(combination);
    return false;
  }
}
