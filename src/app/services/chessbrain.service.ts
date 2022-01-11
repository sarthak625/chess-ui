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
    "prince": "🤴",
    "emoji": "👑",
    "princess": "👸",
    "horse": "🐴",
  };

  symbolHash: any = {
    "♔": "K",
    "♕": "Q",
    "♖": "R",
    "♗": "B",
    "♘": "N",
    "♙": "P",
    "♚": "k",
    "♛": "q",
    "♜": "r",
    "♝": "b",
    "♞": "n",
    "♟": "p",
    "🤴": "prince",
    "👑": "emoji",
    "👸": "princess",
    "🐴": "horse",
  };
  constructor() { }

  getIsBlackPiece(notation: string) {
    const charCode = notation.charCodeAt(0);
    return charCode >= 97 && charCode <= 122;
  }

  getIsWhitePiece(notation: string) {
    const charCode = notation.charCodeAt(0);
    return charCode >= 65 && charCode <= 90;
  }

  getIfPiecesOnTheSameTeam(notation1: string, notation2: string) {
    return this.getIsBlackPiece(notation1) === this.getIsBlackPiece(notation2);
  }

  getNotationsHash() {
    return this.notationsHash;
  }

  getPieceNotation(symbol: string) {
    return this.symbolHash[symbol];
  }

  isValidTargetSquareId(id: string) {
    if (id.length !== 2) return false;
    let isValid = true;
    return id.split('').reduce((acc, element) => {
      const isValidIndex = Number(element) >= 0 && Number(element) <= 7;
      if (!acc || !isValidIndex) return false;
      return true;
    }, true);
  }

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
            positionsHash[`${i}${k}`] = null;
            j = k;
          }
        }
      }
    }
    return {
      positions: positionsHash,
    };
  }

  convertMoveSetToFenString(positionsHash: any) {
    let fenString = '';
    for (let i=0; i<8; i++) {
      let count = 0;
      for (let j=0; j<8; j++) {
        const currentSymbol = positionsHash[`${i}${j}`];
        const currentNotation = this.symbolHash[currentSymbol];
        if (count > 0 && !currentNotation) {
          count++;
          if (j == 7) {
            fenString = `${fenString}${count}`;
          }
        } else if (count > 0 && currentNotation) {
          fenString = `${fenString}${count}${currentNotation}`;
          count = 0;
        } else if (count === 0 && currentNotation) {
          fenString = `${fenString}${currentNotation}`;
        } else if (count === 0 && !currentNotation) {
          count++;
        }
      }
      if (i < 7) {
        fenString += '/';
      }
    }

    return fenString;
  }
}
