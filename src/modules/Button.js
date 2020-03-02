import React, { Component } from 'react';

class Button extends Component {

  handleButtonClick=()=> {
    this.props.onClick();
  }
  render() {
    return <button onClick= { this.handleButtonClick }> New Game </button>;
  }
}

export default Button;
