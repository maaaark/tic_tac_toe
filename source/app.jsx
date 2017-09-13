import React, { Component } from "react";

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            P1_SYMBOL: "X",
            P2_SYMBOL: "O",
            currentPlayer: "X",
            gameEnded: false,
            totalMoves: 0,
            board: [
                "", "", "", "", "", "", "", "", ""
            ]
        }
    }

    playerMove(event) {
        console.log(this.state.totalMoves);
        if(!this.state.gameEnded && this.state.totalMoves <= 8) {

            if(this.state.board[event.target.dataset.squareId] == "") {
                this.state.board[event.target.dataset.squareId] = this.state.currentPlayer;

                this.state.currentPlayer = this.state.currentPlayer === this.state.P1_SYMBOL ? this.state.P2_SYMBOL : this.state.P1_SYMBOL;
                this.state.totalMoves++;
                console.log(this.state.board);
                this.setState({
                    board: this.state.board,
                })
            }

        } else {
            console.log("game ended");
        }
    }

    resetGame() {
        this.setState({
            board: [
                "", "", "", "", "", "", "", "", ""
            ]
        })
    }

    render() {
        return (
            <div id="game">
              <h1>TIC TAC TOE</h1>
              <div id="board">
                <div id="boardContainer" onClick={(e)=>this.playerMove(e)}>
                    {this.state.board.map((cell, index) => {
                        return <div data-square-id={index} className="square">{cell}</div>;
                    })}
                </div>
              </div>
              <div id="statusBar">
                  <div id="startButton">START</div>
              </div>
            </div>
        )
    }
}
