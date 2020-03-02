import React, { Component } from 'react';

class Looser extends Component {
  render() {
    let loose = "";
    if (this.props.looser === true) {
      loose = <p>You lose!</p>;
    }
    return(
      <div> { loose } </div>
    );
  }
}

export default Looser;
