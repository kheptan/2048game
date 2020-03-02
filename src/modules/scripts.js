
import React, { Component } from 'react';

class Box {
  constructor (x,y,value) {
    this.x = x;
    this.y = y;
    this.val = value;
    this.lock = false;
  }
}

class Results {
  constructor (array,result) {
    this.array = array;
    this.result = result;
  }
}

function moveLeft ( arrayField, score ) {
  let newScore = score;
  var results = { obj : {}, score : 0 };
  let tile =[];

  for (let i=0; i< 4; i++){
    tile[i] = [];
    for (let j = 0; j< 4; j++) {
      tile[i][j] = "";

      arrayField.forEach ((elem,idx,array)=> {
         // if we find pile in state array
         if (elem.x === i && elem.y === j ) {
           tile[i][j] = elem.val;
           elem.lock = false;
              // if we are on first line, set value to 0
              if (j !== 0){
                  //if line > 0 and check line before current line
                  if (elem.val === tile[i][j-1] || tile[i][j-1] ==="" ) {
                      // check if linie-1 is empty
                      if ( tile[i][j-1]==="" ) {
                          let counter = j;
                          //check if last elem is =0 or = this val
                          while ( (counter-1) >=0 ) {
                                  //if value is empty
                                  if ( tile[i][counter-1] === "") {
                                       elem.y = counter-1;
                                       tile[i][counter] = "";
                                       tile[i][counter-1] = elem.val;

                                  // if value is equal
                                  } else if ( elem.val === tile[i][counter-1]) {
                                       arrayField.forEach ((el,index,arr)=> {
                                         if (el.y === (counter-1) && el.x === i && el.lock === false) {
                                           arrayField.splice(index,1);
                                           elem.lock = true;
                                         }
                                       });
                                       if (elem.lock) {
                                           elem.val += elem.val;
                                           newScore += elem.val;
                                           elem.y = counter-1;

                                           tile[i][counter] = "";
                                           tile[i][counter-1] = elem.val;
                                           break;
                                       } else {
                                         break;
                                       }
                                  } else { counter = 0; break;  }
                                  counter = counter -1;
                          }
                        //if this is equal with line-1
                      } else {
                            elem.val +=elem.val;
                            newScore += elem.val;
                            arrayField.forEach ((el, index,arr)=> {
                                if (el.x === i && el.y === (j-1)) {
                                      arrayField.splice(index,1);
                                }
                            });
                            elem.lock = true;
                            elem.y = j - 1;
                            tile[i][j] = "";
                            tile[i][j-1] = elem.val;
                        }
                  //either line-1 is bigger or smaller than this.val
                  } else {
                      tile[i][j] = elem.val;
                  }
              }
         }
      });

    }
  }
  results.obj = arrayField;
  results.score = newScore;
  return results;

}

function moveUp( arrayField, score ){
  let newScore = score;
  var results = { obj : {}, score : 0 };
  let tile =[];

  for (let i = 0; i < 4; i++){
    tile[i] = [];
    for (let j = 0; j< 4; j++) {
      tile[i][j] = "";

      arrayField.forEach ((elem,idx,array)=> {
         // if we find pile in state array
         if (elem.x === i && elem.y === j ) {
           tile[i][j] = elem.val;
           elem.lock = false;
              // if we are on first line, set value to 0
               if (i !== 0) {
                  //if line > 0 and check line before current line
                  if (elem.val === tile[i-1][j] || tile[i-1][j] ==="" ) {
                      // check if linie-1 is empty
                      if ( tile[i-1][j]==="" ) {
                          let counter = i;
                          //check if last elem is =0 or = this val
                          while ( (counter-1) >=0 ) {
                              //if value is empty
                              if ( tile[counter-1][j] === "") {
                                   elem.x = counter-1;
                                   tile[counter][j] = "";
                                   tile[counter-1][j] = elem.val;

                              // sum value is equal
                              } else if ( elem.val === tile[counter-1][j]) {

                                   arrayField.forEach ((el, index,arr)=> {
                                      if (el.x === (counter-1) && el.y === j && el.lock === false) {
                                          arrayField.splice(index,1);
                                          elem.lock = true;
                                      }
                                   });
                                   if ( elem.lock ) {
                                      elem.val += elem.val;
                                      newScore += elem.val;
                                      elem.x = counter-1;
                                      tile[counter][j] = "";
                                      tile[counter-1][j] = elem.val;
                                      break;
                                   } else {
                                      break;
                                 }
                              } else { counter = 0; break;  }
                              counter = counter -1;
                          }
                      //if this value is equal with line-1
                      } else {
                          elem.val +=elem.val;
                          newScore += elem.val;
                          arrayField.forEach ((el, index,arr)=> {
                             if (el.x === (i-1) && el.y === j) {
                                arrayField.splice(index,1);
                             }
                          });
                          elem.x = i - 1;
                          elem.lock = true;
                          tile[i][j] = "";
                          tile[i-1][j] = elem.val;
                      }
                  //either line-1 is bigger or smaller than this.val
                  } else {
                     tile[i][j] = elem.val;
                  }
            //end of line is first
             }
        //end of element search
         }
      //end foreach
      });

    }
  }
  results.obj = arrayField;
  results.score = newScore;
  return results;
}

function moveRight( arrayField, score ) {
  let newScore = score;
  var results = { obj : {}, score : 0 };
  let hasChanged = false;
  let changes = [];
  let tile =[];

  for (let i=0; i< 4; i++){
    tile[i] = [];
    for (let j = 3; j >= 0; j--) {
      tile[i][j] = "";
      arrayField.forEach ((elem,idx,array)=> {
         // if we find pile in state array
         if (elem.x === i && elem.y === j ) {
           tile[i][j] = elem.val;
           elem.lock = false;
              // if we are on first line, set value to 0
               if (j !== 3) {
                  //if line > 0 and check line before current line
                  if (elem.val === tile[i][j+1] || tile[i][j+1] ==="" ) {
                    //console.log(j);
                      // check if linie-1 is empty
                      if ( tile[i][j+1]==="" ) {
                          let counter = j;
                          //check if last elem is =0 or = this val
                          while ( (counter+1) <=3 ) {
                            //console.log("am ajuns si aici");
                              //if value is empty
                              if ( tile[i][counter+1] === "") {
                                   elem.y = counter+1;
                                   tile[i][counter] = "";
                                   tile[i][counter+1] = elem.val;

                              // sum value is equal
                            } else if ( elem.val === tile[i][counter+1]) {
                                   arrayField.forEach ((el, index,arr)=> {
                                      if (el.y === (counter+1) && el.x === i && el.lock === false) {
                                          arrayField.splice(index,1);
                                          elem.lock = true;
                                      }
                                   });
                                  if (elem.lock) {
                                       elem.val += elem.val;
                                       newScore += elem.val;
                                       elem.y = counter+1;
                                       tile[i][counter] = "";
                                       tile[i][counter+1] = elem.val;
                                       break;
                                  } else {
                                      counter = 4;
                                      break;
                                  }
                              } else { counter = 4; break;  }
                              counter = counter + 1;
                          }
                      //if this value is equal with line-1
                      } else {
                          elem.val +=elem.val;
                          newScore += elem.val;
                          arrayField.forEach ((el, index,arr)=> {
                             if (el.y === j+1 && el.x === i) {
                                arrayField.splice(index,1);
                             }
                          });
                          elem.y = j + 1;
                          elem.lock = true;
                          tile[i][j] = "";
                          tile[i][j+1] = elem.val;
                      }
                  //either line-1 is bigger or smaller than this.val
                  } else {
                     tile[i][j] = elem.val;
                  }
            //end of line is first
             }
        //end of element search
         }
      //end foreach
      });

    }
  }
  results.obj = arrayField;
  results.score = newScore;
  return results;

}

function moveDown( arrayField,score ) {
  let newScore = score;
  var results = { obj : {}, score : 0 };
  let tile =[];

  for (let i = 3; i>= 0; i--){
    tile[i] = [];
    for (let j = 0; j < 4; j++) {
      tile[i][j] = "";
      arrayField.forEach ((elem,idx,array)=> {
         // if we find pile in state array
         if (elem.x === i && elem.y === j ) {
           tile[i][j] = elem.val;
           elem.lock = false;
              // if we are on first line, set value to 0
               if (i !== 3) {
                  //if line > 0 and check line before current line
                  if (elem.val === tile[i+1][j] || tile[i+1][j] ==="" ) {
                      // check if linie-1 is empty
                      if ( tile[i+1][j]==="" ) {
                          let counter = i;
                          //check if last elem is =0 or = this val
                          while ( (counter+1) <=3 ) {
                            //console.log("am ajuns si aici");
                              //if value is empty
                              if ( tile[counter+1][j] === "") {
                                   elem.x = counter+1;
                                   tile[counter][j] = "";
                                   tile[counter+1][j] = elem.val;

                              // sum value is equal
                            } else if ( elem.val === tile[counter+1][j]) {

                                   arrayField.forEach ((el, index,arr)=> {
                                      if (el.x === (counter+1) && el.y === j && el.lock === false) {
                                          arrayField.splice(index,1);
                                          elem.lock = true;
                                      }
                                   });
                                   if (elem.lock) {
                                       elem.val += elem.val;
                                       newScore += elem.val;
                                       elem.x = counter+1;
                                       tile[counter][j] = "";
                                       tile[counter+1][j] = elem.val;
                                       break;
                                   } else {
                                      break;
                                   }
                              } else { counter = 4; break;  }
                              counter = counter + 1;
                          }
                      //if this value is equal with line-1
                      } else {
                          elem.val +=elem.val;
                          newScore += elem.val;
                          arrayField.forEach ((el, index,arr)=> {
                             if (el.y === j && el.x === i + 1 ) {
                                arrayField.splice(index,1);
                             }
                          });
                          elem.x = i + 1;
                          elem.lock = true;
                          tile[i][j] = "";
                          tile[i+1][j] = elem.val;
                      }
                  //either line-1 is bigger or smaller than this.val
                  } else {
                     tile[i][j] = elem.val;
                  }
            //end of line is first
             }
        //end of element search
         }
      //end foreach
      });
    }
  }
  results.obj = arrayField;
  results.score = newScore;
  return results;

}

export function move (keyCode,objarray,score){
  //console.log(score);
  switch(keyCode) {
    case 37 : return moveLeft(objarray,score); break;
    case 38 : return moveUp(objarray,score); break;
    case 39 : return moveRight(objarray,score); break;
    case 40 : return moveDown(objarray,score); break;
    default: return objarray;
  }
}

export function initArray( randomtiles ) {

    const items = fillArayWithZero();
    if (typeof randomtiles === 'undefined' || typeof randomtiles ==! 'undefined'){
        const boxItems = [];
        let x = random(0,items.length);
        let y = random(0,items.length);
        boxItems[0] = new Box(x,y,2,false);

        for (let i=0;;i++){
        let x1 = random(0,items.length -1);
        let y1 = random(0,items.length -1);
        if(x!==x1 && y!==y1) {
              boxItems[1]= new Box(x1,y1,2,false);
                  break;
              }
        }
        return boxItems;
    }else {
        let indice = random(0,randomtiles.length-1);
        return randomtiles[indice];
    }
  }

// FIll init array with 0's
export function fillArayWithZero() {
  const zeroBox = [];
  for (let i=0; i< 4 ; i++) {
    zeroBox[i] = [];
    for (let y=0; y < 4; y++) {
      zeroBox[i][y] = "";
    }
  }
  return zeroBox;
}

//GENERATE random numbers
export function random(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomiseNewElement( array ) {
  const newPiles = [];
  if (array.length === 16) {
    return newPiles;
  } else {
    for ( let i=0; i < 4; i++){
      for (let j=0; j < 4; j++) {
        newPiles.push(new Box(i,j,2,false));
        array.forEach( (elem)=> {
          if(elem.x === i && elem.y === j) {
              newPiles.pop();
          }
        });
      }
    }
    newPiles[0] = initArray(newPiles);
    return newPiles;
  }
}

//VIEW TABLE -  generate table with values in view components
export function setBoxArray(pbox) {
  const newBox = [];
  for(let i = 0; i < 4; i++) {
    newBox[i] = [];
    for (let y=0; y< 4; y++) {
      newBox[i][y] = "";
      pbox.forEach ((elem)=> {
        if (elem.x === i && elem.y === y) {
          newBox[i][y] = elem.val;
        }
      });
    }
  }
  return newBox;
}


//GET THE CURRENT SCORE
function getScore(newscore) {
  let score = 0;
  score += newscore;
  return score;
}


export { Box };
