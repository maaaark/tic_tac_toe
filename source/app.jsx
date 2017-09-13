import React, { Component } from "react";

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            gameStarted: false,
            P1_SYMBOL: "X",
            P2_SYMBOL: "O",
            currentPlayer: "X",
            totalMoves: 0,
            winner: null,
            board: [
                "", "", "", "", "", "", "", "", ""
            ]
        }
    }

    playerMove(event) {
        if(this.state.gameStarted){
            if(this.state.board[event.target.dataset.squareId] === "") {
                this.state.board[event.target.dataset.squareId] = this.state.currentPlayer;

                if(this.checkWinner()) {
                    this.setState({
                        gameStarted: false,
                        winner: this.state.currentPlayer
                    });
                    //console.log("game stopped");
                    this.showResult(this.state.winner)

                } else {
                    this.state.currentPlayer = this.state.currentPlayer === this.state.P1_SYMBOL ? this.state.P2_SYMBOL : this.state.P1_SYMBOL;
                    this.state.totalMoves++;

                    this.setState({
                        board: this.state.board,
                        totalMoves: this.state.totalMoves
                    });
                    //console.log("move: "+this.state.totalMoves);
                    if(this.state.totalMoves >= 9) {
                        //console.log("draw");
                        this.setState({
                            winner: "draw",
                        });
                        this.showResult();
                    }
                }

            }
        }
    }

    showResult (winner) {
        let endOfGameScreen = document.getElementById("endOfGameScreen");
        endOfGameScreen.classList.remove("hidden");

        let nextGame = document.getElementById("nextGame");
        nextGame.classList.remove("hidden");

        let nextMove = document.getElementById("nextMove");
        nextMove.classList.add("hidden");
    }

    startGame() {
        this.resetGame();
        //console.log("start");
        this.setState({
            gameStarted: true,
            currentPlayer: "X",
        });

        let showGameButton = document.getElementById("showGameButton");
        showGameButton.classList.remove("hidden");

        let boardDiv = document.getElementById("board");
        boardDiv.classList.add("activeGame");

        let abortButton = document.getElementById("abort");
        abortButton.classList.remove("hidden");

        let startButton = document.getElementById("startButton");
        startButton.classList.add("hidden");

        let nextMoveStatus = document.getElementById("nextMove");
        nextMoveStatus.classList.remove("hidden");
    }

    checkWinner() {

        let currentTurn = this.state.currentPlayer;
        let symbols = this.state.board;
        let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        return winningCombos.find(function(combo) {
            if(symbols[combo[0]] !== "" && symbols[combo[1]] !== ""  && symbols[combo[2]] !== ""  && symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]) {
                //console.log("winner found: "+currentTurn);
                return true
            } else {
                return false
            }
        })
    }

    resetGame() {
        //console.log("reset game");
        this.setState({
            board: [
                "", "", "", "", "", "", "", "", ""
            ],
            gameStarted: false,
            winner: null,
            totalMoves: 0,
            currentPlayer: "X",
        });

        let boardDiv = document.getElementById("board");
        boardDiv.classList.remove("activeGame");

        let abortButton = document.getElementById("abort");
        abortButton.classList.add("hidden");

        let startButton = document.getElementById("startButton");
        startButton.classList.remove("hidden");

        let nextMoveStatus = document.getElementById("nextMove");
        nextMoveStatus.classList.add("hidden");

        let endOfGameScreen = document.getElementById("endOfGameScreen");
        endOfGameScreen.classList.add("hidden");

        let nextGame = document.getElementById("nextGame");
        nextGame.classList.add("hidden");
    }

    showGame() {
        let endOfGameScreen = document.getElementById("endOfGameScreen");
        endOfGameScreen.classList.add("hidden");

        let showGameButton = document.getElementById("showGameButton");
        showGameButton.classList.add("hidden");
    }

    printPlayerSymbol(symbol) {
        let prettySymbol;
        if(symbol === this.state.P1_SYMBOL) {
            prettySymbol = <div className="player1Symbol">{this.state.P1_SYMBOL}</div>
        } else if(symbol === this.state.P2_SYMBOL) {
            prettySymbol = <div className="player2Symbol">{this.state.P2_SYMBOL}</div>
        }
        return prettySymbol
    }

    showWinner(symbol) {
        let prettySymbol;
        if(symbol === this.state.P1_SYMBOL) {
            prettySymbol = <div className="winnerBox"><div className="player1Symbol">{this.state.P1_SYMBOL}</div><div id="subline">WON THE GAME</div></div>
        } else if(symbol === this.state.P2_SYMBOL) {
            prettySymbol = <div className="winnerBox"><div className="player2Symbol">{this.state.P2_SYMBOL}</div><div id="subline">WON THE GAME</div></div>
        } else if(symbol === "draw") {
            prettySymbol = <div id="subline">DRAW</div>
        }
        return prettySymbol
    }

    render() {
        return (
            <div id="game">
              <h1>TIC TAC</h1>
              <div id="abort" className="hidden" onClick={(e)=>this.resetGame()}>RESET</div>
              <div id="board" className="">
                <div id="endOfGameScreen" className="hidden">
                    {this.showWinner(this.state.winner)}
                </div>
                <div id="boardContainer" onClick={(e)=>this.playerMove(e)}>
                    {this.state.board.map((cell, index) => {
                        cell = this.printPlayerSymbol(cell);
                        return <div data-square-id={index} className="square">{cell}</div>;
                    })}
                </div>
              </div>
              <div id="statusBar">
                  <button id="startButton" onClick={(e)=>this.startGame(e)}>START</button>
                  <div id="nextMove" className="hidden">{this.printPlayerSymbol(this.state.currentPlayer)}s Turn</div>
                  <div id="nextGame" className="hidden">
                      <button id="resetGameButton" onClick={()=>this.startGame()}>START NEW GAME</button>
                      <button id="showGameButton" onClick={(e)=>this.showGame(e)}>SHOW GAME</button>
                  </div>
              </div>
            </div>
        )
    }
}
