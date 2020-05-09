import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ticTacToe = [];
  playerCoin = "";
  computerCoin = "";
  winner = "";
  winRows = [];
  gameFull = false;
  computerActive: boolean;
  gameTypeSelected = false;
  swapCoin: boolean;
  constructor() { }
  ngOnInit() {
    this.resetGame();
  }

  gameType(gt:boolean) {
    this.computerActive = gt;
    this.gameTypeSelected = true;
  }

  playerChoice(choice: string) {
    this.playerCoin = choice;
    (this.playerCoin == 'O') ? this.computerCoin = 'X' : this.computerCoin = 'O';
  }

  playerTurn(selectedPosition: number) {
    if (!this.ticTacToe[selectedPosition] && !this.winner) {
      (this.swapCoin && !this.computerActive) ? this.ticTacToe[selectedPosition] = this.computerCoin : this.ticTacToe[selectedPosition] = this.playerCoin;
      this.swapCoin = !this.swapCoin;
      this.checkWin();
      if(!(this.gameFull || this.checkGameFull()) && this.computerActive) this.computerTurn();
    }
  }

  checkWin() {
    // horizontal lines
    for (var i = 0; i < 9;) {
      if (this.ticTacToe[i] == this.ticTacToe[i + 1] && this.ticTacToe[i + 1] == this.ticTacToe[i + 2] && this.ticTacToe[i+1] != '') {
        this.gameFull = true;
        (this.ticTacToe[i] == this.playerCoin) ? this.winner = "Player": this.winner = "Computer";
        this.winRows.push(i, i+1, i+2);
        return;
      }
      i += 3;
    }
    // vertical lines
    for (var i = 0; i < 3;) {
      if (this.ticTacToe[i] == this.ticTacToe[i + 3] && this.ticTacToe[i + 3] == this.ticTacToe[i + 6] && this.ticTacToe[i+3] != '') {
        this.gameFull = true;
        (this.ticTacToe[i] == this.playerCoin) ? this.winner = "Player": this.winner = "Computer";
        this.winRows.push(i, i+3, i+6);
        return;
      }
      i += 1;
    }
    // diagonal 1,5,9
    if (this.ticTacToe[0] == this.ticTacToe[4] && this.ticTacToe[4] == this.ticTacToe[8] && this.ticTacToe[4] != '') {
      this.gameFull = true;
      (this.ticTacToe[0] == this.playerCoin) ? this.winner = "Player": this.winner = "Computer";
      this.winRows.push(0, 4, 8);
      return;
    }
    // diagonal 3,5,7
    if (this.ticTacToe[2] == this.ticTacToe[4] && this.ticTacToe[4] == this.ticTacToe[6] && this.ticTacToe[4] != '') {
      this.gameFull = true;
      (this.ticTacToe[2] == this.playerCoin) ? this.winner = "Player": this.winner = "Computer";
      this.winRows.push(2, 4, 6);
      return;
    }
  }

  checkGameFull() {
    if (this.ticTacToe.indexOf('') == -1) this.gameFull = true;
    return this.gameFull;
  }

  computerTurn() {
    var position;
    do {
      position = Math.floor(Math.random() * 9);
    } while (this.ticTacToe[position]);
    this.ticTacToe[position] = this.computerCoin;
    this.checkWin();
  }

  resetGame() {
    this.playerCoin = "";
    this.computerCoin = "";
    this.winner = "";
    this.winRows = [];
    this.gameFull = false;
    this.ticTacToe = Array(9).fill('');
    this.computerActive = null;
    this.gameTypeSelected = false;
    this.swapCoin = false;
  }
}
