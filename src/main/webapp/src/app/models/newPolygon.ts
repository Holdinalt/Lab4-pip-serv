import {PairXY} from "./PairXY";

export class newPolygon{

  cords: Array<PairXY> = [];

  getCords(){
    return '[' + this.cords.toString() + ']';
  }

  getCordsArray(): number[][]{
    let arrayCords: number[][] = [];

    for(let i = 0; i < this.cords.length; i++){
      let tempXY: number[] = [];
      tempXY.push(this.cords[i].X);
      tempXY.push(this.cords[i].Y);
      arrayCords.push(tempXY);
    }
    return arrayCords;
  }

}
