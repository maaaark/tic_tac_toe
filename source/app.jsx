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
            can_start_new_game: false,
            show_next_player: false,
            show_end_game_screen: false,
            show_reset_button: false,
            show_start_game_button: true,
            game_is_active: false,
            board: [
                "", "", "", "", "", "", "", "", ""
            ]
        }
    }

    playerMove(index) {
        if(this.state.gameStarted){
            if(this.state.board[index] === "") {
                this.state.board[index] = this.state.currentPlayer;
                if(this.checkWinner()) {
                    this.state.gameStarted = false;
                    this.state.winner = this.state.currentPlayer;
                    this.showResult(this.state.winner)
                } else {
                    this.state.currentPlayer = this.state.currentPlayer === this.state.P1_SYMBOL ? this.state.P2_SYMBOL : this.state.P1_SYMBOL;
                    this.state.totalMoves++;
                    if(this.state.totalMoves >= 9) {
                        this.state.winner = "draw";
                        this.showResult();
                    }
                }

                this.setState({
                    gameStarted: this.state.gameStarted,
                    winner: this.state.winner,
                    board: this.state.board,
                    totalMoves: this.state.totalMoves
                });
            }
        }
    }

    showResult (winner) {
        this.setState({
            can_start_new_game: true,
            show_next_player: false,
            show_end_game_screen: true,
        },() => {
            //console.log("can_start_new_game "+this.state.can_start_new_game);
            //console.log("show_next_player test "+this.state.show_next_player);
            //console.log("show_end_game_screen "+this.state.show_end_game_screen);
        });
    }

    startGame() {
        this.resetGame();
        this.setState({
            gameStarted: true,
            currentPlayer: "X",
            show_reset_button: true,
            show_start_game_button: false,
            show_next_player: true,
            game_is_active: true,
        });
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
        this.setState({
            board: [
                "", "", "", "", "", "", "", "", ""
            ],
            gameStarted: false,
            winner: null,
            totalMoves: 0,
            currentPlayer: "X",
            can_start_new_game: null,
            show_next_player: false,
            show_end_game_screen: false,
            show_start_game_button: true,
            game_is_active: false,
        });
    }

    showGame() {
        this.setState({
            show_end_game_screen: false
        });
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
              <div id="abort" className={this.state.show_reset_button ? null : "hidden"} onClick={(e)=>this.resetGame()}>RESET</div>
              <div id="board" className={this.state.game_is_active ? "activeGame" : null}>
                <div id="endOfGameScreen" className={this.state.show_end_game_screen ? null : "hidden"}>
                    {this.showWinner(this.state.winner)}
                </div>
                <div id="boardContainer">
                    {this.state.board.map((cell, index) => {
                        // return <Square key={index} playerSymbol={cell}/>;
                        cell = this.printPlayerSymbol(cell);
                        return <div onClick={()=>this.playerMove(index)}  key={index} className="square">{cell}</div> ;
                    })}
                </div>
              </div>
              <div id="statusBar">
                  <button id="startButton" className={this.state.show_start_game_button ? null : "hidden"} onClick={(e)=>this.startGame(e)}>START</button>
                  <div id="nextMove" className={this.state.show_next_player ? null : "hidden"}>{this.printPlayerSymbol(this.state.currentPlayer)}s Turn</div>
                  <div id="nextGame" className={this.state.can_start_new_game ? null : "hidden"}>
                      <button id="resetGameButton" onClick={()=>this.startGame()}>START NEW GAME</button>
                      <button id="showGameButton" onClick={(e)=>this.showGame(e)}>SHOW GAME</button>
                  </div>
              </div>
            </div>
        )
    }
}


class Square extends Component{

    render(){
        console.log(this);
        let sym = this.renderPlayerSymbol(this.props.playerSymbol);
        return <div className="square">{sym}</div>;
    }

    renderPlayerSymbol(symbol) {
        let prettySymbol;
        console.log("symbol: "+symbol);
        // GET THE STATE OF THE MAIN APP?
        if(symbol === this.state.P1_SYMBOL) {
            prettySymbol = <div className="player1Symbol">{this.state.P1_SYMBOL}</div>
        } else if(symbol === this.state.P2_SYMBOL) {
            prettySymbol = <div className="player2Symbol">{this.state.P2_SYMBOL}</div>
        }
        return prettySymbol
    }


}