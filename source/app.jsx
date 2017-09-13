import React, { Component } from "react";

export default class App extends Component {



    constructor() {
        super()

        this.state = {
            gameStarted: false,
            P1_SYMBOL: "X",
            P2_SYMBOL: "O",
            currentPlayer: "X",
            gameEnded: false,
            totalMoves: 0,
            winner: null,
            board: [
                "", "", "", "", "", "", "", "", ""
            ]
        }
    }

    playerMove(event) {
        if(this.state.gameStarted){
            if(this.state.board[event.target.dataset.squareId] == "") {
                this.state.board[event.target.dataset.squareId] = this.state.currentPlayer;

                if(this.checkWinner()) {
                    this.setState({gameStarted: false})
                    console.log("game stopped")
                } else {
                    this.state.currentPlayer = this.state.currentPlayer === this.state.P1_SYMBOL ? this.state.P2_SYMBOL : this.state.P1_SYMBOL;
                    this.state.totalMoves++;
                    // console.log(this.state.board);
                    this.setState({
                        board: this.state.board,
                    })
                }

            }
        }
    }

    startGame() {
        console.log("start");
        this.setState({
            gameStarted: true,
        })

        var boardDiv = document.getElementById("board")
        boardDiv.classList.add("activeGame")

        var abortButton = document.getElementById("abort")
        abortButton.classList.remove("hidden")

        var startButton = document.getElementById("startButton")
        startButton.classList.add("hidden")
    }

    checkWinner() {

        var currentTurn = this.state.currentPlayer
        var symbols = this.state.board
        var winner = this.state.winner
        var gameStarted = this.state.winner
        var winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

        return winningCombos.find(function(combo) {
            if(symbols[combo[0]] !== "" && symbols[combo[1]] !== ""  && symbols[combo[2]] !== ""  && symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]) {
                console.log("winner found: "+currentTurn);
                winner = currentTurn

                return true
            } else {
                return false
            }
        })

        /*
        if(!this.state.gameEnded && this.state.totalMoves <= 8) {
            console.log("no winner");
        } else {
            console.log("winner");
        }
        */
    }

    resetGame() {
        console.log("reset game");
        this.setState({
            board: [
                "", "", "", "", "", "", "", "", ""
            ],
            gameStarted: false,
        })


        var boardDiv = document.getElementById("board")
        boardDiv.classList.remove("activeGame")

        var abortButton = document.getElementById("abort")
        abortButton.classList.add("hidden")

        var startButton = document.getElementById("startButton")
        startButton.classList.remove("hidden")
    }

    render() {
        return (
            <div id="game">
              <h1>TIC TAC</h1>
              <div id="abort" className="hidden" onClick={(e)=>this.resetGame()}>RESET</div>
              <div id="board" className="">
                <div id="boardContainer" onClick={(e)=>this.playerMove(e)}>
                    {this.state.board.map((cell, index) => {
                        return <div data-square-id={index} className="square">{cell}</div>;
                    })}
                </div>
              </div>
              <div id="statusBar">
                  <button id="startButton" onClick={(e)=>this.startGame(e)}>START</button>
              </div>
            </div>
        )
    }
}
