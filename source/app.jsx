import React, { Component } from "react";

export default class App extends Component {
    render() {
        return (
            <div id="game">
              <h1>TIC TAC TOE</h1>
              <div id="board">
                <div id="boardContainer">
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
