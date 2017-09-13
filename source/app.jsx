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
        if(!this.state.gameEnded && this.state.totalMoves < 9) {
            event.target.innerText= this.state.currentPlayer;
            console.log(this.state.currentPlayer);
            this.state.currentPlayer = this.state.currentPlayer === this.state.P1_SYMBOL ? this.state.P2_SYMBOL : this.state.P1_SYMBOL;
            this.state.totalMoves++;
            console.log(this.state.totalMoves);
        } else {
            console.log("game ended");
        }
    }

    render() {
        return (
            <div id="game">
              <h1>TIC TAC TOE</h1>
              <div id="board">
                <div id="boardContainer" onClick={(e)=>this.playerMove(e)}>
                  <div className="square"></div>
                  <div className="square"></div>
                  <div className="square"></div>
                  <div className="square"></div>
                  <div className="square"></div>
                  <div className="square"></div>
                  <div className="square"></div>
                  <div className="square"></div>
                  <div className="square"></div>
                </div>
              </div>
              <div id="statusBar">
                  <div id="startButton">START</div>
              </div>
            </div>
        )
    }
}
