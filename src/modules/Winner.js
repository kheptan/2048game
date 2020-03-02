import React, { Component } from 'react';

class Winner extends Component {
  render() {
    let win = "";
    if (this.props.win === true) {
      win = <p>Winner</p>;
    } else {
      win = <p>Keep going...</p>;
    }
    return(
      <div> { win } </div>
    );
  }
}

export default Winner;
