import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChessbrainService {

  currentMoveset = {};
  startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  notationsHash: any = {
    "K": "♔",
    "Q": "♕",
    "R": "♖",
    "B": "♗",
    "N": "♘",
    "P": "♙",
    "k": "♚",
    "q": "♛",
    "r": "♜",
    "b": "♝",
    "n": "♞",
    "p": "♟",
  };
  constructor() { }

  convertFenStringToMoveSet(str: String) {
    const fenStringSplit = str.split(' ');
    const positions = fenStringSplit[0];
    const positionsArr = positions.split('/');
    const positionsHash: any = {};
    for (let i=0; i < positionsArr.length; i++) {
      const rowPositionArr = positionsArr[i];
      for (let j=0; j < rowPositionArr.length; j++) {
        const element = rowPositionArr[j];
        const piece = this.notationsHash[element];
        // If the element is a piece
        if (piece) {
          positionsHash[`${i}${j}`] = piece;
        } else {
          for (let k=j; k<Number(element); k++) {
            positionsHash[`${i}${k}`] = " ";
            j = k;
          }
        }
      }
    }
    return {
      positions: positionsHash,
    };
  }
}
