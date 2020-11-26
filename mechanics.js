//Internal Storage Structures
//arrPuzzlePieces is used to connect the HTML/DOM elements to the currently displayed solution
let arrPuzzlePieces = new Array(4);
arrPuzzlePieces[0] = ['G', 'G', 'G', 'P', 'P', 'P', 'G', 'G', 'P', 'P'];
arrPuzzlePieces[1] = [
  {top:'G', left:'P', right:'O'},
  {top:'G', left:'G', right:'P'},
  {top:'G', left:'O', right:'G'},
  {top:'G', left:'P', right:'P'},
  {top:'G', left:'O', right:'O'},
  {top:'P', left:'P', right:'O'},
  {top:'P', left:'O', right:'P'},
  {top:'P', left:'G', right:'P'},
  {top:'P', left:'O', right:'G'},
  {top:'P', left:'G', right:'G'}
];
arrPuzzlePieces[2] = [
  {left:'G', right:'P', bottom:'O'},
  {left:'O', right:'G', bottom:'P'},
  {left:'P', right:'O', bottom:'P'},
  {left:'O', right:'P', bottom:'G'},
  {left:'G', right:'O', bottom:'O'},
  {left:'P', right:'G', bottom:'G'},
  {left:'P', right:'O', bottom:'G'},
  {left:'O', right:'O', bottom:'P'},
  {left:'P', right:'P', bottom:'G'},
  {left:'G', right:'G', bottom:'O'}
];
arrPuzzlePieces[3] = [
  {left:'P', right:'G'}, 
  {left:'O', right:'G'}, 
  {left:'G', right:'P'}, 
  {left:'G', right:'O'}, 
  {left:'O', right:'P'}
];

//bankAvlblPuzzlePieces is used to test each new permutation (solution attempt) of puzzle pieces 
let bankAvlblPuzzlePieces = new Array(4);
bankAvlblPuzzlePieces[0] = [];
bankAvlblPuzzlePieces[1] = [
  {top:'G', left:'P', right:'O', simpleNum: 0},
  {top:'G', left:'G', right:'P', simpleNum: 1},
  {top:'G', left:'O', right:'G', simpleNum: 2},
  {top:'G', left:'P', right:'P', simpleNum: 3},
  {top:'G', left:'O', right:'O', simpleNum: 4},
  {top:'P', left:'P', right:'O', simpleNum: 5},
  {top:'P', left:'O', right:'P', simpleNum: 6},
  {top:'P', left:'G', right:'P', simpleNum: 7},
  {top:'P', left:'O', right:'G', simpleNum: 8},
  {top:'P', left:'G', right:'G', simpleNum: 9}
];
bankAvlblPuzzlePieces[2] = [
  {left:'G', right:'P', bottom:'O', simpleNum: 0},
  {left:'O', right:'G', bottom:'P', simpleNum: 1},
  {left:'P', right:'O', bottom:'P', simpleNum: 2},
  {left:'O', right:'P', bottom:'G', simpleNum: 3},
  {left:'G', right:'O', bottom:'O', simpleNum: 4},
  {left:'P', right:'G', bottom:'G', simpleNum: 5},
  {left:'P', right:'O', bottom:'G', simpleNum: 6},
  {left:'O', right:'O', bottom:'P', simpleNum: 7},
  {left:'P', right:'P', bottom:'G', simpleNum: 8},
  {left:'G', right:'G', bottom:'O', simpleNum: 9}
];
bankAvlblPuzzlePieces[3] = [
  {left:'P', right:'G', simpleNum: 0}, 
  {left:'O', right:'G', simpleNum: 1}, 
  {left:'G', right:'P', simpleNum: 2}, 
  {left:'G', right:'O', simpleNum: 3},
  {left:'O', right:'P', simpleNum: 4}
];


//all successful solutions will be stored here                            
const allSolvedPuzzlePieces = new Array();

function cementSolvedArray() {
  //create a new array to store solution from working copy in bankAvlblPuzzlePieces
  const solvedPuzzlePieces = new Array(3);
  solvedPuzzlePieces[0] = new Array(10);
  solvedPuzzlePieces[1] = new Array(10);
  solvedPuzzlePieces[2] = new Array(5);
  for (let i = 0; i < 10; i++) {
    solvedPuzzlePieces[0][i] = bankAvlblPuzzlePieces[1][i].simpleNum;
  }
  for (let i = 0; i < 10; i++) {
    solvedPuzzlePieces[1][i] = bankAvlblPuzzlePieces[2][i].simpleNum;
  }
  for (let i = 0; i < 5; i++) {
    solvedPuzzlePieces[2][i] = bankAvlblPuzzlePieces[3][i].simpleNum;
  }

  //currently unnecessary, but confirms each new solution is unique
  function alreadyExists() {
    outer_loop: for (let i = 0; i < allSolvedPuzzlePieces.length; i++) {
      
      for (let j = 0; j < 10; j++) {
        if (allSolvedPuzzlePieces[i][0][j] !== solvedPuzzlePieces[0][j]) continue outer_loop;
        if (allSolvedPuzzlePieces[i][1][j] !== solvedPuzzlePieces[1][j]) continue outer_loop;
        
        if (j < 5) {
          if (allSolvedPuzzlePieces[i][2][j] !== solvedPuzzlePieces[2][j]) continue outer_loop;
        }
      }
      return true;
    }
  }
  
  //push immediately to allSolvedPuzzlePieces if first solution
  //or push after solution is confirmed unique
  if (allSolvedPuzzlePieces.length === 0) {
    console.log('     perfect fit!');
    allSolvedPuzzlePieces.push(solvedPuzzlePieces);
  }
  else if (!alreadyExists()) {
    console.log('     perfect fit!');
    allSolvedPuzzlePieces.push(solvedPuzzlePieces);
  }
} //end of cementSolvedArray()

function setUpDOMPropertyArr() {

  const puzzleHtml = document.getElementById('rows-puzzle');
  const rowsHtml = puzzleHtml.children;
  //row 1 - note: row 0 doesn't change, so no need to link
  for(let i = 0; i < 10; i++) {
    arrPuzzlePieces[1][i].dom = rowsHtml[1].children[i];
  }
  //row 2
  for(let i = 0; i < 10; i++) {
    arrPuzzlePieces[2][i].dom = rowsHtml[2].children[i];
  }
  // row 3
  for(let i = 0; i < 5; i++) {
    arrPuzzlePieces[3][i].dom = rowsHtml[3].children[i];
  }
}

function setUpDOMPropertyArrCircle() {

  const circleHtml = document.getElementById('circle-puzzle');
  const layersHtml = circleHtml.children;
  //layer 1 - note: layer 0 doesn't change, so no need to link
  for(let i = 0; i < 10; i++) {
    arrPuzzlePieces[1][i].domCircle = layersHtml[1].children[i];
  }
  //layer 2
  for(let i = 0; i < 10; i++) {
    arrPuzzlePieces[2][i].domCircle = layersHtml[2].children[i];
  }
  //layer 3
  for(let i = 0; i < 5; i++) {
    arrPuzzlePieces[3][i].domCircle = layersHtml[3].children[i];
  }
}

function displayPuzzleHtmlOne() { 
  //update internal arr props
  //change text of dom elements to match ^ (ie no switching, just rewriting arrPuzzlePieces)
  //update class to change color

  //row 1
  for(let i = 0; i < 10; i++) {
    //note - children[1] is <br>
    arrPuzzlePieces[1][i].dom.children[0].textContent = bankAvlblPuzzlePieces[1][i].top;
    arrPuzzlePieces[1][i].top = bankAvlblPuzzlePieces[1][i].top;
    arrPuzzlePieces[1][i].dom.children[0].className = bankAvlblPuzzlePieces[1][i].top;

    arrPuzzlePieces[1][i].dom.children[2].textContent = bankAvlblPuzzlePieces[1][i].left;
    arrPuzzlePieces[1][i].left = bankAvlblPuzzlePieces[1][i].left;
    arrPuzzlePieces[1][i].dom.children[2].className = bankAvlblPuzzlePieces[1][i].left;

    arrPuzzlePieces[1][i].dom.children[3].textContent = bankAvlblPuzzlePieces[1][i].right;
    arrPuzzlePieces[1][i].right = bankAvlblPuzzlePieces[1][i].right;
    arrPuzzlePieces[1][i].dom.children[3].className = bankAvlblPuzzlePieces[1][i].right;
  }
}
function displayPuzzleHtmlTwo() {
  // row 2
  for(let i = 0; i < 10; i++) {
    //note - children[1] is <br>
    arrPuzzlePieces[2][i].dom.children[0].textContent = bankAvlblPuzzlePieces[2][i].left;
    arrPuzzlePieces[2][i].left =  bankAvlblPuzzlePieces[2][i].left;
    arrPuzzlePieces[2][i].dom.children[0].className = bankAvlblPuzzlePieces[2][i].left;

    arrPuzzlePieces[2][i].dom.children[1].textContent = bankAvlblPuzzlePieces[2][i].right;
    arrPuzzlePieces[1][i].right = bankAvlblPuzzlePieces[2][i].right;
    arrPuzzlePieces[2][i].dom.children[1].className = bankAvlblPuzzlePieces[2][i].right;

    arrPuzzlePieces[2][i].dom.children[3].textContent = bankAvlblPuzzlePieces[2][i].bottom;
    arrPuzzlePieces[1][i].bottom = bankAvlblPuzzlePieces[2][i].bottom;
    arrPuzzlePieces[2][i].dom.children[3].className = bankAvlblPuzzlePieces[2][i].bottom;
  }
}
function displayPuzzleHtmlThree() {
   // row 3
   for(let i = 0; i < 5; i++) {
    //note - children[1] is <br>
    arrPuzzlePieces[3][i].dom.children[0].textContent = bankAvlblPuzzlePieces[3][i].left;
    arrPuzzlePieces[3][i].left =  bankAvlblPuzzlePieces[3][i].left;
    arrPuzzlePieces[3][i].dom.children[0].className = bankAvlblPuzzlePieces[3][i].left;

    arrPuzzlePieces[3][i].dom.children[1].textContent = bankAvlblPuzzlePieces[3][i].right;
    arrPuzzlePieces[3][i].right = bankAvlblPuzzlePieces[3][i].right;
    arrPuzzlePieces[3][i].dom.children[1].className = bankAvlblPuzzlePieces[3][i].right;
  }
}
//circleHtml Varieties
function displayCircleHtmlOne() { 
  //change text of dom elements to match ^ (ie no switching, just rewriting arrPuzzlePieces)
  //update class to change color
  //note - no updating arrPP bc already done in other display()

  //layer1
  for(let i = 0; i < 10; i++) {
    //note - children[1] is <br>
    arrPuzzlePieces[1][i].domCircle.children[0].textContent = bankAvlblPuzzlePieces[1][i].top;
    arrPuzzlePieces[1][i].domCircle.children[0].className = bankAvlblPuzzlePieces[1][i].top;

    arrPuzzlePieces[1][i].domCircle.children[2].textContent = bankAvlblPuzzlePieces[1][i].left;
    arrPuzzlePieces[1][i].domCircle.children[2].className = bankAvlblPuzzlePieces[1][i].left;

    arrPuzzlePieces[1][i].domCircle.children[3].textContent = bankAvlblPuzzlePieces[1][i].right;
    arrPuzzlePieces[1][i].domCircle.children[3].className = bankAvlblPuzzlePieces[1][i].right;
  }
}
function displayCircleHtmlTwo() {
  // layer 2
  for(let i = 0; i < 10; i++) {
    //note - children[1] is <br>
    arrPuzzlePieces[2][i].domCircle.children[0].textContent = bankAvlblPuzzlePieces[2][i].left;
    arrPuzzlePieces[2][i].domCircle.children[0].className = bankAvlblPuzzlePieces[2][i].left;

    arrPuzzlePieces[2][i].domCircle.children[1].textContent = bankAvlblPuzzlePieces[2][i].right;
    arrPuzzlePieces[2][i].domCircle.children[1].className = bankAvlblPuzzlePieces[2][i].right;

    arrPuzzlePieces[2][i].domCircle.children[3].textContent = bankAvlblPuzzlePieces[2][i].bottom;
    arrPuzzlePieces[2][i].domCircle.children[3].className = bankAvlblPuzzlePieces[2][i].bottom;
  }
}
function displayCircleHtmlThree() {
   // layer 3
   for(let i = 0; i < 5; i++) {
    //note - children[1] is <br>
    arrPuzzlePieces[3][i].domCircle.children[0].textContent = bankAvlblPuzzlePieces[3][i].left;
    arrPuzzlePieces[3][i].domCircle.children[0].className = bankAvlblPuzzlePieces[3][i].left;

    arrPuzzlePieces[3][i].domCircle.children[1].textContent = bankAvlblPuzzlePieces[3][i].right;
    arrPuzzlePieces[3][i].domCircle.children[1].className = bankAvlblPuzzlePieces[3][i].right;
  }
}

function displayCircleHtml() {
  displayCircleHtmlOne();
  displayCircleHtmlTwo();
  displayCircleHtmlThree();
}

//update (move around) html pieces after correct solution
function displayPuzzleHtml() { 
  //update and display all layers/rows of pieces
  displayPuzzleHtmlOne();
  displayPuzzleHtmlTwo();
  displayPuzzleHtmlThree();

  //update and display circle representation
  displayCircleHtml();
}

//update bankAvlblPuzzlePieces to soln passed in
//then call displayPuzzleHtml() to update arrPuzzlePieces[] and HTML
function displayNewSolutionHtml(solnIndex) {
  //row 1
  for (let i = 0; i < 10; i++) {
    //if bankAvlbl piece is already in position, skip to next index
    //if not equal, run through bankAvlbl[] to find match & switch
    if ((bankAvlblPuzzlePieces[1][i].simpleNum !== allSolvedPuzzlePieces[solnIndex][0][i])) {
      for (let j = i; j < 10; j++) {
        if (bankAvlblPuzzlePieces[1][j].simpleNum === allSolvedPuzzlePieces[solnIndex][0][i]) {
          switchRow(i, j, 1);
        }
      }
    }
  }
  //row 2
  for (let i = 0; i < 10; i++) {
    //if bankAvlbl piece is already in position, skip to next index
    //if not equal, run through bankAvlbl[] to find match & switch
    if ((bankAvlblPuzzlePieces[2][i].simpleNum !== allSolvedPuzzlePieces[solnIndex][1][i])) {
      for (let j = i; j < 10; j++) {
        if (bankAvlblPuzzlePieces[2][j].simpleNum === allSolvedPuzzlePieces[solnIndex][1][i]) {
          switchRow(i, j, 2);
        }
      }
    }
  }
  //row 3
  for (let i = 0; i < 5; i++) {
    //if bankAvlbl piece is already in position, skip to next index
    //if not equal, run through bankAvlbl[] to find match & switch
    if ((bankAvlblPuzzlePieces[3][i].simpleNum !== allSolvedPuzzlePieces[solnIndex][2][i])) {
      for (let j = i; j < 5; j++) {
        if (bankAvlblPuzzlePieces[3][j].simpleNum === allSolvedPuzzlePieces[solnIndex][2][i]) {
          switchRow(i, j, 3);
        }
      }
    }
  }
  displayPuzzleHtml();
}


// Fits Row Functions:
//checks fit of new puzzlePiece in given index/location (0 --> 9)
//puzzlePiece param should be a cell of arrPuzzlePieces
function fitsRowOne(indexToCheck, puzzlePiece) {

  if (arrPuzzlePieces[0][indexToCheck] === puzzlePiece.top) {
    return true;
  }
  else {
    return false;
  }
}

//checks fit of new puzzlePiece in given index/location (0 --> 9)
function fitsRowTwo(indexToCheck, puzzlePiece) {

  let rowOneLeftIndex,
      rowOneRightIndex;
  if (indexToCheck === 0) {
    rowOneLeftIndex = 9;
    rowOneRightIndex = 0;
  }
  else {
    rowOneLeftIndex = indexToCheck - 1;
    rowOneRightIndex = indexToCheck;
  }

  if (
    bankAvlblPuzzlePieces[1][rowOneLeftIndex].right === puzzlePiece.left 
    && bankAvlblPuzzlePieces[1][rowOneRightIndex].left === puzzlePiece.right
  ) {
    return true;
  }
  else {
    return false;
  }
}

//checks fit of new puzzlePiece in given index/location (0 --> 4)
function fitsRowThree(indexToCheck, puzzlePiece) {

  let rowTwoLeftIndex,
      rowTwoRightIndex;
  if (indexToCheck === 0) {
    rowTwoLeftIndex = 1;
    rowTwoRightIndex = 2;
  }
  else if (indexToCheck === 1) {
    rowTwoLeftIndex = 3;
    rowTwoRightIndex = 4;
  }
  else if (indexToCheck === 2) {
    rowTwoLeftIndex = 5;
    rowTwoRightIndex = 6;
  }
  else if (indexToCheck === 3) {
    rowTwoLeftIndex = 7;
    rowTwoRightIndex = 8;
  }
  else {
    rowTwoLeftIndex = 9;
    rowTwoRightIndex = 0;
  }

  if (
    bankAvlblPuzzlePieces[2][rowTwoLeftIndex].bottom === puzzlePiece.left 
    && bankAvlblPuzzlePieces[2][rowTwoRightIndex].bottom === puzzlePiece.right
  ) {
    return true;
  }
  else {
    return false;
  }
}

//SWITCH Functions
//switches 2 puzzle pieces for any given row
function switchRow(switchSpotIdx, toSwitchInIdx, rowNum) {

  let holdFirstPiece = bankAvlblPuzzlePieces[rowNum][switchSpotIdx];
  bankAvlblPuzzlePieces[rowNum][switchSpotIdx] = bankAvlblPuzzlePieces[rowNum][toSwitchInIdx];
  bankAvlblPuzzlePieces[rowNum][toSwitchInIdx] = holdFirstPiece;
}

// ************************* 

// Permutation Functions: 

//takes test spot, test piece, and record of current array setup (to reset the bankAvlbl)
//generates whole soln subset - testing all first layer switchIns, even after a match
function row1Perm(switchSpot, toSwitchIn, simpleNumArray) {
  //console.log('Row1: ' + switchSpot + " <-" + toSwitchIn);

  //default set to true - sets false if 1.doesn't fit | 2.no more perms
  let hasAvlblBranches = true;

  //reset bankAvlblPuzzlePieces[] to match simpleNumArray
  for (let i = 0; i < 10; i++) {
    //if bankAvlbl piece is already in position, skip to next index
    //if not equal, run through bankAvlbl[] to find match & switch
    if ((bankAvlblPuzzlePieces[1][i].simpleNum !== simpleNumArray[i])) {
      for (let j = i; j < 10; j++) {
        if (bankAvlblPuzzlePieces[1][j].simpleNum === simpleNumArray[i]) {
          switchRow(i, j, 1);
        }
      }
    }
  }

  

  //checks if piece actually fits
  if (fitsRowOne(switchSpot, bankAvlblPuzzlePieces[1][toSwitchIn])) {
    //checks if switch needs to be made (or already in place)
    if (switchSpot !== toSwitchIn) {
      switchRow(switchSpot, toSwitchIn, 1);
      let holdFirstPlace = simpleNumArray[switchSpot]; 
      simpleNumArray[switchSpot] = simpleNumArray[toSwitchIn];
      simpleNumArray[toSwitchIn] = holdFirstPlace;
    }
    //if switchSpot < 8, then it will continue branching
    //if switchSpot === 8, then it will check last cell to see if it's perfect row fit
    if (switchSpot === 8) {
      hasAvlblBranches = false;
      if (fitsRowOne(9, bankAvlblPuzzlePieces[1][9])) {
        let simpleNumArray2 = [0,1,2,3,4,5,6,7,8,9];
        return row2Perm(0,0,simpleNumArray2);
      }
    }
  }
  else {
    //or breaks out of all future branches/perms
    //because current piece does not fit
    hasAvlblBranches = false;
  }
  
  //explore all lower branches
  //begin permutation process on next available puzzle piece spot
  if (hasAvlblBranches) {
    let newSwitchSpot = switchSpot + 1;
    for (let i = newSwitchSpot; i < 10; i++) {
      row1Perm(newSwitchSpot, i, [...simpleNumArray]);
    }
  }
  //Call row1Perm to try ALL pieces in the current switchSpot
  //regardless of current match or not
  if (switchSpot === 0 && toSwitchIn === 0) { 
    for (let i = switchSpot + 1; i < 10; i++) {
      row1Perm(switchSpot, i, [...simpleNumArray]);
    }
  }
}//end of row1Perm()


//****************** */

//takes test spot, test piece, and record of current array setup (to reset the bankAvlbl)
function row2Perm(switchSpot, toSwitchIn, simpleNumArray) {
  //console.log('Row2: ' + switchSpot + " <-" + toSwitchIn);

  //default set to true - sets false if 1.doesn't fit | 2.no more perms
  let hasAvlblBranches = true;

  //reset bankAvlblPuzzlePieces[] to match simpleNumArray
  for (let i = 0; i < 10; i++) {
    //if bankAvlbl piece is already in position, skip to next index
    //if not equal, run through bankAvlbl[] to find match & switch
    if ((bankAvlblPuzzlePieces[2][i].simpleNum !== simpleNumArray[i])) {
      for (let j = i; j < 10; j++) {
        if (bankAvlblPuzzlePieces[2][j].simpleNum === simpleNumArray[i]) {
          switchRow(i, j, 2);
        }
      }
    }
  }

  //Call row2Perm to try ALL pieces in the current switchSpot
  //regardless of current match or not
  if (switchSpot === 0 && toSwitchIn === 0) {
    let newSwitchSpot = switchSpot;
    for (let i = switchSpot + 1; i < 10; i++) {
      row2Perm(switchSpot, i, [...simpleNumArray]);
    }
  }

  //checks if piece actually fits
  if (fitsRowTwo(switchSpot, bankAvlblPuzzlePieces[2][toSwitchIn])) {
    //checks if switch needs to be made (or already in place)
    if (switchSpot !== toSwitchIn) {
      switchRow(switchSpot, toSwitchIn, 2);
      let holdFirstPlace = simpleNumArray[switchSpot]; 
      simpleNumArray[switchSpot] = simpleNumArray[toSwitchIn];
      simpleNumArray[toSwitchIn] = holdFirstPlace;
    }
    //if switchSpot < 8, then it will continue branching
    //if switchSpot == 8, then it will check last cell to see if it's perfect row fit
    if (switchSpot === 8) {
      hasAvlblBranches = false;
      if (fitsRowTwo(9, bankAvlblPuzzlePieces[2][9])) {
        let simpleNumArray3 = [0,1,2,3,4];
        return row3Perm(0, 0, simpleNumArray3);
      }
    }
  }
  else {
    //or breaks out of all future branches/perms 
    //because current piece does not fit
    hasAvlblBranches = false;
  }

  //explore all lower branches
  //begin permutation process on next available puzzle piece spot
  if (hasAvlblBranches) {
    let newSwitchSpot = switchSpot + 1;
    for (let i = newSwitchSpot; i < 10; i++) {
     row2Perm(newSwitchSpot, i, [...simpleNumArray]);
    }
  }
}//end of row2Perm()


//******************************* */

//takes test spot, test piece, and record of current array setup (to reset the bankAvlbl)
function row3Perm(switchSpot, toSwitchIn, simpleNumArray) {
  //console.log(switchSpot + " <--" + toSwitchIn);

  //default set to true - sets false if 1.doesn't fit | 2.no more perms
  let hasAvlblBranches = true;

  //reset bankAvlblPuzzlePieces[] to match simpleNumArray
  for (let i = 0; i < 5; i++) {
    //if bankAvlbl piece is already in position, skip to next index
    //if not equal, run through bankAvlbl[] to find match & switch
    if ((bankAvlblPuzzlePieces[3][i].simpleNum !== simpleNumArray[i])) {
      for (let j = i; j < 5; j++) {
        if (bankAvlblPuzzlePieces[3][j].simpleNum === simpleNumArray[i]) {
          switchRow(i, j, 3);
        }
      }
    }
  }

  //Call row3Perm to try ALL pieces in the current switchSpot
  //regardless of current match or not
  if (switchSpot === 0 && toSwitchIn === 0) {
    let newSwitchSpot = switchSpot;
    for (let i = switchSpot + 1; i < 5; i++) {
      row3Perm(switchSpot, i, [...simpleNumArray]);
    }
  }

  //checks if piece actually fits
  if (fitsRowThree(switchSpot, bankAvlblPuzzlePieces[3][toSwitchIn])) {
    //checks if switch needs to be made (or already in place)
    if (switchSpot !== toSwitchIn) {
      switchRow(switchSpot, toSwitchIn, 3);
      let holdFirstPlace = simpleNumArray[switchSpot]; 
      simpleNumArray[switchSpot] = simpleNumArray[toSwitchIn];
      simpleNumArray[toSwitchIn] = holdFirstPlace;
    }
    //if switchSpot < 3, then it will continue branching
    //if switchSpot == 3, then it will check last cell to see if it's perfect fit
    if (switchSpot === 3) {
      hasAvlblBranches = false;
      if (fitsRowThree(4, bankAvlblPuzzlePieces[3][4])) {
        cementSolvedArray();
        return true;
      }
    }
  }
  else {
    //or breaks out of all future branches/perms
    //because current piece does not fit
    hasAvlblBranches = false;
  }

  //explore all lower branches
  //begin permutation process on next available puzzle piece spot
  if (hasAvlblBranches) {
    let newSwitchSpot = switchSpot + 1;
    for (let i = newSwitchSpot; i < 5; i++) {
      row3Perm(newSwitchSpot, i, [...simpleNumArray]);
    }
  }
}//end of row3Perm()


// ************************* 

//HTML Buttons and eventHandlers Section
// creates drop-down menu for current solnSubset
function setUpButtons(solutionSubsetSize) {

  let solnsDisplayedLength;
  if (solutionSubsetSize === 'small') {
    //limits displayed solutions to six
    solnsDisplayedLength = 6;
  }
  else {
    //will include all generated solutions
    solnsDisplayedLength = allSolvedPuzzlePieces.length;
  }

  const selectButton = document.getElementById('soln-number');
  const childrenLength = selectButton.children.length;
  //delete previous option values
  for (let i = 0; i < childrenLength; i++) {
    selectButton.lastChild.remove();
  }

  //add new option values, either 'small' or 'large' subset
  for (let i = 0; i < solnsDisplayedLength; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', i);
    option.textContent = i;
    selectButton.appendChild(option);
  }

  selectButton.onchange = function() {
    const solutionNum = selectButton.value;
    displayNewSolutionHtml(solutionNum);
  };
}

//control panel
function setUpControlPanel() {

  const solnButtonDiv = document.getElementById('soln-generator');
  const onGenerateSolnSubset = document.getElementById("generate");
  onGenerateSolnSubset.addEventListener('click', function() {

    let simpleNumArray = [0,1,2,3,4,5,6,7,8,9];
    console.log('STARTED');
    row1Perm(0, 0, simpleNumArray);
    console.log('COMPLETED');

    //remove "Generate" button and enable radio buttons
    onGenerateSolnSubset.remove();
    solnButtonDiv.remove();
    document.getElementById('small-soln').removeAttribute('disabled');
    document.getElementById('large-soln').removeAttribute('disabled');
  })

  //radio buttons (switches solnSubset)
  const radioSubsetSmall = document.getElementById("small-soln");
  radioSubsetSmall.addEventListener('change', function() {
    //used to load solution choices in dropdown from small subset
    setUpButtons('small');
  })
  const radioSubsetLarge = document.getElementById("large-soln");
  radioSubsetLarge.addEventListener('change', function() {
    //used to load solution choices in dropdown from large subset
    setUpButtons('large');
  })

}

setUpDOMPropertyArr();
setUpDOMPropertyArrCircle();
setUpControlPanel();

