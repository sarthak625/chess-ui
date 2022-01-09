import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ChessbrainService } from '../services/chessbrain.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  n = 8;
  white = {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙",
  };

  black = {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟",
  };

  others = {
    prince: "🤴",
    emoji: "👑",
    princess: "👸",
    horse: "🐴",
  };

  startFenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  currentMoveSet: any = {};
  selectedPiece: any;
  selectedSquare: any;

  constructor(
    private chessBrainService: ChessbrainService,
    private elementRef:ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.currentMoveSet = this.chessBrainService.convertFenStringToMoveSet("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  }

  ngAfterViewInit() {
  }

  onDragStart(event: any, parentClassNames: string, targetClassNames: string) {
    const parentClassNamesArr = parentClassNames.split(',').filter((className) => className.length);
    parentClassNamesArr.forEach((className) => {
      this.renderer.addClass(event.target.parentNode, className);
    });

    const targetClassNamesArr = targetClassNames.split(',');
    targetClassNamesArr.forEach((targetClassName) => {
      this.renderer.addClass(event.target, targetClassName);
    });

    if (this.selectedSquare) {
      this.renderer.removeClass(this.selectedSquare, 'hovered-square');
    }

    this.selectedPiece = event.target;
    this.selectedSquare = event.target.parentNode;
  }

  onDragEnd(event: any, parentClassNames: string, targetClassNames: string) {
    const parentClassNamesArr = parentClassNames.split(',').filter((className) => className.length);
    parentClassNamesArr.forEach((className) => {
        if (this.selectedSquare) {
          this.renderer.removeClass(this.selectedSquare, className);
        }
        this.renderer.removeClass(event.target.parentNode, className);
      });
  
      const targetClassNamesArr = targetClassNames.split(',').filter((className) => className.length);
      targetClassNamesArr.forEach((targetClassName) => {
        if (this.selectedSquare) {
          this.renderer.removeClass(this.selectedSquare, targetClassName);
        }
        this.renderer.removeClass(event.target, targetClassName);
      });
  }

  onDragEnterSquare(event: any, targetClassNames: string) {
  }

  onDragOverSquare(event: any, targetClassNames: string) {
    event.preventDefault();
    const targetClassNamesArr = targetClassNames.split(',').filter((className) => className.length);
    targetClassNamesArr.forEach((targetClassName) => {
      this.renderer.addClass(event.target, targetClassName);
    });
  }

  onDragLeaveSquare(event: any, targetClassNames: string) {
    const targetClassNamesArr = targetClassNames.split(',').filter((className) => className.length);
    targetClassNamesArr.forEach((targetClassName) => {
      this.renderer.removeClass(event.target, targetClassName);
    });
  }

  onDropSquare(event: any) {
    if (this.selectedPiece) {
      this.renderer.appendChild(event.target, this.selectedPiece);
      this.selectedSquare = event.target;
    }
  }

  getCellColor(i: number, j: number) {
    if ((i + j) % 2 === 0) return "#fff";
    return '#32a8a4';
  }

  getPiece(i: number, j: number): string {
    const { positions } = this.currentMoveSet;
    return positions[`${i}${j}`];
  }

  getRandomPiece(i: number, j: number) {
    const pieces = [
      "♔",
      "♕",
      "♖",
      "♗",
      "♘",
      "♙",
      "♚",
      "♛",
      "♜",
      "♝",
      "♞",
      "♟",
    ];
    return pieces[Math.floor(Math.random() * pieces.length)]
  }

  createRange() {
    return new Array(this.n);
  }

  getPosition(i: number, j: number) {
    const column = String.fromCharCode(i + 97);
    const row = Math.abs(j - 8);
    return {
      column,
      row,
    };
  }

  getRow(i: number) {
    return Math.abs(i - 8);
  }
  
  getRowText(i: number, j: number) {
    if (j !== 0) {
      return " ";
    }
    return this.getRow(i);
  }

  getColumn(j: number) {
    return String.fromCharCode(j + 97);
  }
  
  getColumnText(i: number, j: number) {
    if (i !== 7) {
      return " ";
    }
    return this.getColumn(j);
  }
}
