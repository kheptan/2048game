import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Score from './modules/Score';
import Winner from './modules/Winner';
import Looser from './modules/Looser';
import Button from './modules/Button';

import { Box, move,randomiseNewElement,initArray,random, setBoxArray, fillArayWithZero } from './modules/scripts';

//COMPONENT base class and sets all actions and save state
class CubeAction extends Component {
  constructor(props) {
    super(props);
    this.state = { boxi: initArray(), score: 0, looser: false, winner: false};
  }

  getMaxNumber(array) {
    console
    let max = 0
    array.forEach( (elem)=> {
        if (max < elem.val) {
          max = elem.val;
        }
    });
    return max;
  }

  updateBox(keycode) {

      if (this.winner) { this.winner =  false;}
      if (this.looser) { this.looser = false;}

      const moveResults = move(keycode, this.state.boxi, this.state.score);
      const mArr = moveResults.obj;
      const score = moveResults.score;

      let newBox = randomiseNewElement(mArr);
      //console.log(newBox.length);
      if(newBox.length !== 0) {
          if(this.getMaxNumber(mArr)===2048) {
            this.setState((prevState)=>{
              return { boxi : initArray(), score : 0,looser: false, winner: true};
            });
          }else{
            mArr.push(newBox[0]);
            this.setState( (prevState)=>{
               return {boxi : mArr, score : score, looser: false, winner: false};
           });
         }
      }else {
          this.looser = true;
          this.setState((prevState)=>{
            return { boxi : initArray(), score : 0,looser: true};
          });
      }
  }

  handleKeyPress=(e)=> {
      this.updateBox(e.keyCode);
  }

  componentWillUpdate(nextProps, nextState) {
     if (nextState.looser) { alert("Looser");}
  }

  componentDidMount() {
    window.addEventListener("keydown",this.handleKeyPress);
  }

  componentWillUnMount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }
  handleButton = () => {
    this.setState((prevState)=>{
      return { boxi : initArray(), score : 0,looser: false, winner: false};
    });
  };

  render(){
     return(
       <div>
          <Button onClick = {()=> this.handleButton()}/>
          <Winner win = {this.state.winner} />
          <Score score = { this.state.score } />
          <Looser looser = { this.state.looser} />
          <CubeContainer boxArray = { this.state.boxi }/>
      </div>
    )
  }
}

//Base Container View - get an variable length array composed of Box object items
class CubeContainer extends Component {
  render(){
    let items = setBoxArray( this.props.boxArray);
    return (
      <div className = "Cube-container">
           <CubeRow items = {items[0]} />
           <CubeRow items = {items[1]} />
           <CubeRow items = {items[2]} />
           <CubeRow items = {items[3]} />
      </div>
    );
  }
}

//ROW in container and include row items
class CubeRow extends Component {
  render() {

    return (
      <div className = "Cube-row">
          <CubeItem  value = { this.props.items[0] } />
          <CubeItem className={ "Pile-"+this.props.items[1] } value = { this.props.items[1] } />
          <CubeItem className={ "Pile-"+this.props.items[2] } value = { this.props.items[2] } />
          <CubeItem className={ "Pile-"+this.props.items[3] } value = { this.props.items[3] } />
      </div>
    )
  }
}

//ROW items
class CubeItem extends Component {
  render() {
    let className = "Cube-item Pile-" + this.props.value;
    return (
      <div className= {className}>
          {this.props.value}
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <CubeAction />
      </div>
    );
  }
}

export default App;
