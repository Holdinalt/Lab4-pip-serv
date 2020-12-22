export class Shot{
  x: number;
  y: number;
  r: number;

  constructor(x?: number, y?: number, r?: number){
    this.x = x || 0;
    this.y = y || 0;
    this.r = r || 1;
  }

  showHit(): void{
    console.log(this.toString());
  }

  toString(): string{
    return 'X: ' + this.x + ' Y: ' + this.y + ' R: ' + this.r;
  }
}
