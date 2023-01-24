import React, { Component } from 'react';
import Game from './Game';

export default class Main2048 extends Component {
  render() {
    return (
      <div className="App" touch-action="manipulation">
        <Game />
      </div>
    );
  }
}