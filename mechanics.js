//Internal Storage Structures
let arrPuzzlePieces = new Array(4);
arrPuzzlePieces[0] = ['G', 'G', 'G', 'P', 'P', 'P', 'G', 'G', 'P', 'P'];
arrPuzzlePieces[1] = [{top:'G', left:'O', right:'G'},
                        {top:'G', left:'P', right:'O'},
                        {top:'G', left:'G', right:'P'},
                        {top:'G', left:'P', right:'P'},
                        {top:'G', left:'O', right:'O'},
                        {top:'P', left:'P', right:'O'},
                        {top:'P', left:'O', right:'P'},
                        {top:'P', left:'G', right:'P'},
                        {top:'P', left:'O', right:'G'},
                        {top:'P', left:'G', right:'G'}];
arrPuzzlePieces[2] = [{left:'G', right:'P', bottom:'O'},
                        {left:'O', right:'G', bottom:'P'},
                        {left:'P', right:'O', bottom:'P'},
                        {left:'O', right:'P', bottom:'G'},
                        {left:'G', right:'O', bottom:'O'},
                        {left:'P', right:'G', bottom:'G'},
                        {left:'P', right:'O', bottom:'G'},
                        {left:'O', right:'O', bottom:'P'},
                        {left:'P', right:'P', bottom:'G'},
                        {left:'G', right:'G', bottom:'O'}];
arrPuzzlePieces[3] = [{left:'P', right:'G'}, {left:'O', right:'G'}, {left:'G', right:'P'}, {left:'G', right:'O'}, {left:'O', right:'P'}];

let bankAvlblPuzzlePieces = new Array(4);
bankAvlblPuzzlePieces[0] = [];
bankAvlblPuzzlePieces[1] = [{top:'G', left:'O', right:'G', simpleNum: 0},
                        {top:'G', left:'P', right:'O', simpleNum: 1},
                        {top:'G', left:'G', right:'P', simpleNum: 2},
                        {top:'G', left:'P', right:'P', simpleNum: 3},
                        {top:'G', left:'O', right:'O', simpleNum: 4},
                        {top:'P', left:'P', right:'O', simpleNum: 5},
                        {top:'P', left:'O', right:'P', simpleNum: 6},
                        {top:'P', left:'G', right:'P', simpleNum: 7},
                        {top:'P', left:'O', right:'G', simpleNum: 8},
                        {top:'P', left:'G', right:'G', simpleNum: 9}];
bankAvlblPuzzlePieces[2] = [{left:'G', right:'P', bottom:'O', simpleNum: 0},
                        {left:'O', right:'G', bottom:'P', simpleNum: 1},
                        {left:'P', right:'O', bottom:'P', simpleNum: 2},
                        {left:'O', right:'P', bottom:'G', simpleNum: 3},
                        {left:'G', right:'O', bottom:'O', simpleNum: 4},
                        {left:'P', right:'G', bottom:'G', simpleNum: 5},
                        {left:'P', right:'O', bottom:'G', simpleNum: 6},
                        {left:'O', right:'O', bottom:'P', simpleNum: 7},
                        {left:'P', right:'P', bottom:'G', simpleNum: 8},
                        {left:'G', right:'G', bottom:'O', simpleNum: 9}];
bankAvlblPuzzlePieces[3] = [{left:'P', right:'G', simpleNum: 0}, 
                            {left:'O', right:'G', simpleNum: 1}, 
                            {left:'G', right:'P', simpleNum: 2}, 
                            {left:'G', right:'O', simpleNum: 3},
                            {left:'O', right:'P', simpleNum: 4}];


//for perfect fit scenario (only calls from successful row3Perm)                            
//let solvedPuzzlePieces = new Array(3);
const allSolvedPuzzlePieces = new Array();

function cementSolvedArray() {

  let solvedPuzzlePieces = new Array(3);
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

  //returns true if its a new soln array
  function doesNotExistYet() {
    for (let i = 0; i < allSolvedPuzzlePieces.length; i++) {
      for (let j = 0; j < 10; j++) {
        if (allSolvedPuzzlePieces[i][0][j] !== solvedPuzzlePieces[0][j]) return true;
        if (allSolvedPuzzlePieces[i][1][j] !== solvedPuzzlePieces[1][j]) return true;
      }
      for (let x = 0; x < 5; x++) {
        if (allSolvedPuzzlePieces[i][2][x] !== solvedPuzzlePieces[2][x]) return true;
      }
    }
    return false;
  }

  if (allSolvedPuzzlePieces.length === 0) {
    allSolvedPuzzlePieces.push(solvedPuzzlePieces);
    displayPuzzleHtml();
  }
  else if (doesNotExistYet()) {
    allSolvedPuzzlePieces.push(solvedPuzzlePieces);
    displayPuzzleHtml();
    }
}

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
  //change text of dom elements to match ^ (ie no switching, rewriting arrPP)
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
  //change text of dom elements to match ^ (ie no switching, rewriting arrPP)
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
  //update internal arr props
  //change text of dom elements to match ^ (ie no switching, rewriting arrPP)
  //change class attribute to update color

 displayPuzzleHtmlOne();
 displayPuzzleHtmlTwo();
 displayPuzzleHtmlThree();

 displayCircleHtml();
}

//update bankAvlblPP to soln passed in
//then call displayPuzzleHtml() to update arrPP and HTML
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

  //console.log(arrPuzzlePieces[0][indexToCheck] + puzzlePiece.top);
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

  if (bankAvlblPuzzlePieces[1][rowOneLeftIndex].right === puzzlePiece.left && bankAvlblPuzzlePieces[1][rowOneRightIndex].left === puzzlePiece.right) {
    
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

  if (bankAvlblPuzzlePieces[2][rowTwoLeftIndex].bottom === puzzlePiece.left && bankAvlblPuzzlePieces[2][rowTwoRightIndex].bottom === puzzlePiece.right) {
    
    return true;
  }
  else {
    return false;
  }
}

//SWITCH Functions
//switches 2 pieces for any given row
function switchRow(switchSpotIdx, toSwitchInIdx, rowNum) {

  let holdFirstPiece = bankAvlblPuzzlePieces[rowNum][switchSpotIdx];
  bankAvlblPuzzlePieces[rowNum][switchSpotIdx] = bankAvlblPuzzlePieces[rowNum][toSwitchInIdx];
  bankAvlblPuzzlePieces[rowNum][toSwitchInIdx] = holdFirstPiece;
}

// ************************* 

// Permutation Functions: 
//CHECK FITSROW ARR OR BANK (ONLY FOR 2 & DOWN)
// ADD HTML UPDATE

//takes two numbers and record of current array setup (to reset the bankAvlbl)
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
    //if switchSpot == 8, then it will check last cell to see if it's perfect row fit
    if (switchSpot === 8) {
      hasAvlblBranches = false;
      if (fitsRowOne(9, bankAvlblPuzzlePieces[1][9])) {
        //console.log('      row 1 fits!');
        let simpleNumArray2 = [0,1,2,3,4,5,6,7,8,9];
        if (row2Perm(0,0,simpleNumArray2)) {
          return true;
        }
      }
    }
  }
  //on root case, but no fit. Move to next switch immediately
  else if (switchSpot === 0) {
    if (toSwitchIn === 9) {
      //console.log('1 No available pieces, break out');
    }
    else {
      toSwitchIn ++;
      row1Perm(switchSpot, toSwitchIn, simpleNumArray);
    }
    hasAvlblBranches = false;
  }
  else {
    //or breaks out of all future branches/perms
    //console.log('end of branch');
    hasAvlblBranches = false;
  }

  if (hasAvlblBranches) {
    //explore all lower branches
    let newSwitchSpot = switchSpot + 1;
    for (let i = newSwitchSpot; i < 10; i++) {
     row1Perm(newSwitchSpot, i, simpleNumArray);
    }
  }
}//end of row1Perm()

//****************** */

//takes two numbers and record of current array setup (to reset the bankAvlbl)
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
        //console.log('     row 2 fits!');
        let simpleNumArray3 = [0,1,2,3,4];
        if (row3Perm(0,0,simpleNumArray3)) {
          return true;
        }
      }
    }
  }
  //on root case, but no fit. Move to next switch immediately
  else if (switchSpot === 0) {
    if (toSwitchIn === 9) {
      //console.log('2 No available pieces, break out');
    }
    else {
      toSwitchIn ++;
      row2Perm(switchSpot, toSwitchIn, simpleNumArray);
    }
    hasAvlblBranches = false;
  }
  else {
    //or breaks out of all future branches/perms
    //console.log('end of branch');
    hasAvlblBranches = false;
  }

  if (hasAvlblBranches) {
    //explore all lower branches
    let newSwitchSpot = switchSpot + 1;
    for (let i = newSwitchSpot; i < 10; i++) {
     row2Perm(newSwitchSpot, i, simpleNumArray);
    }
  }
}//end of row2Perm()



//******************************* */

//just perm all Row 3 
//takes two numbers
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
        console.log('     perfect fit!');
        cementSolvedArray();
        return true;
      }
    }
  }
  //on root case, but no fit. Move to next switch immediately
  else if (switchSpot === 0) {
    if (toSwitchIn === 4) {
      //console.log('No available pieces, break out');
    }
    else {
      toSwitchIn ++;
      row3Perm(switchSpot, toSwitchIn, simpleNumArray);
    }
    hasAvlblBranches = false;
  }
  else {
    //or breaks out of all future branches/perms
    //console.log('end of branch');
    hasAvlblBranches = false;
  }

  //console.log(simpleNumArray);
  if (hasAvlblBranches) {
    //explore all lower branches
    let newSwitchSpot = switchSpot + 1;
    for (let i = newSwitchSpot; i < 5; i++) {
      //only returns true if perfect fit
     if (row3Perm(newSwitchSpot, i, simpleNumArray)) {
      return true;
     }
    }
  }
}//end of row3Perm()


//HTML and eventHandlers Section
function setUpButtons() {

  const selectButton = document.getElementById('soln-number');
  for (let i = 0; i < allSolvedPuzzlePieces.length; i++) {
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


//TESTING Section: 
/* 
NOTE: 
- cementSolvedArray() has a duplicate problem; couldnt solve it 
*/

setUpDOMPropertyArr();
setUpDOMPropertyArrCircle();

console.log('STARTED');
let simpleNumArray = [0,1,2,3,4,5,6,7,8,9];
row1Perm(0,0,simpleNumArray);

console.log('COMPLETED');
setUpButtons();

