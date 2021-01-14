export class PairXY{

  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
  }

  X:number;
  Y:number;

  toString(){
    return '[' + this.X + ',' + this.Y + ']'
  }

}
