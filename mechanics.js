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
// aSPPS array is filled up first. Large only used 
const allSolvedPuzzlePiecesSmall = new Array();
const allSolvedPuzzlePiecesLarge = new Array();

function cementSolvedArray(solnSubset) {

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

  //Large solnSubset case 
  if (solnSubset === 'L') {
    //returns true if an exact match found ... ie don't push it to allArray
    function alreadyExists() {
      outer_loop: for (let i = 0; i < allSolvedPuzzlePiecesLarge.length; i++) {

        for (let j = 0; j < 10; j++) {
          if (allSolvedPuzzlePiecesLarge[i][0][j] !== solvedPuzzlePieces[0][j]) continue outer_loop;
          if (allSolvedPuzzlePiecesLarge[i][1][j] !== solvedPuzzlePieces[1][j]) continue outer_loop;

          if (j < 5) {
            if (allSolvedPuzzlePiecesLarge[i][2][j] !== solvedPuzzlePieces[2][j]) continue outer_loop;
          }
        }
        return true;
      }
    }

    if (allSolvedPuzzlePiecesLarge.length === 0) {
      console.log('     perfect fit!');
      allSolvedPuzzlePiecesLarge.push(solvedPuzzlePieces);
      //displayPuzzleHtml();
    }
    else if (!alreadyExists()) {
      console.log('     perfect fit!');
      allSolvedPuzzlePiecesLarge.push(solvedPuzzlePieces);
      //displayPuzzleHtml();
    }
  }
  //small subset case (default)
  else {
    //returns true if an exact match found ... ie don't push it to allArray
    function alreadyExists() {
      outer_loop: for (let i = 0; i < allSolvedPuzzlePiecesSmall.length; i++) {

        for (let j = 0; j < 10; j++) {
          if (allSolvedPuzzlePiecesSmall[i][0][j] !== solvedPuzzlePieces[0][j]) continue outer_loop;
          if (allSolvedPuzzlePiecesSmall[i][1][j] !== solvedPuzzlePieces[1][j]) continue outer_loop;

          if (j < 5) {
            if (allSolvedPuzzlePiecesSmall[i][2][j] !== solvedPuzzlePieces[2][j]) continue outer_loop;
          }
        }
        return true;
      }
    }

    if (allSolvedPuzzlePiecesSmall.length === 0) {
      console.log('     perfect fit!');
      allSolvedPuzzlePiecesSmall.push(solvedPuzzlePieces);
      //displayPuzzleHtml();
    }
    else if (!alreadyExists()) {
      console.log('     perfect fit!');
      allSolvedPuzzlePiecesSmall.push(solvedPuzzlePieces);
      //displayPuzzleHtml();
    }
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
function displayNewSolutionHtml(solnIndex, solnSubset) {
  let solvedArray;
  if (solnSubset === 'S') solvedArray = allSolvedPuzzlePiecesSmall;
  else if (solnSubset === 'L') solvedArray = allSolvedPuzzlePiecesLarge;

  //row 1
  for (let i = 0; i < 10; i++) {
    //if bankAvlbl piece is already in position, skip to next index
    //if not equal, run through bankAvlbl[] to find match & switch
    if ((bankAvlblPuzzlePieces[1][i].simpleNum !== solvedArray[solnIndex][0][i])) {
      for (let j = i; j < 10; j++) {
        if (bankAvlblPuzzlePieces[1][j].simpleNum === solvedArray[solnIndex][0][i]) {
          switchRow(i, j, 1);
        }
      }
    }
  }
  //row 2
  for (let i = 0; i < 10; i++) {
    //if bankAvlbl piece is already in position, skip to next index
    //if not equal, run through bankAvlbl[] to find match & switch
    if ((bankAvlblPuzzlePieces[2][i].simpleNum !== solvedArray[solnIndex][1][i])) {
      for (let j = i; j < 10; j++) {
        if (bankAvlblPuzzlePieces[2][j].simpleNum === solvedArray[solnIndex][1][i]) {
          switchRow(i, j, 2);
        }
      }
    }
  }
  //row 3
  for (let i = 0; i < 5; i++) {
    //if bankAvlbl piece is already in position, skip to next index
    //if not equal, run through bankAvlbl[] to find match & switch
    if ((bankAvlblPuzzlePieces[3][i].simpleNum !== solvedArray[solnIndex][2][i])) {
      for (let j = i; j < 5; j++) {
        if (bankAvlblPuzzlePieces[3][j].simpleNum === solvedArray[solnIndex][2][i]) {
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
//generates larger soln subset - tests all first layer switchIns, even after a match
function row1PermLarge(switchSpot, toSwitchIn, simpleNumArray, solnSubset = 'L') {
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
        if (row2Perm(0,0,simpleNumArray2, solnSubset)) {
          return true;
        }
      }
    }
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
     row1PermLarge(newSwitchSpot, i, simpleNumArray);
    }
  }
  //make sure to try all toSwitchIns, even if current was not fit
  if (toSwitchIn !== 9) {
    toSwitchIn++;
    row1PermLarge(switchSpot, toSwitchIn, simpleNumArray);
  }
}//end of row1PermLarge()

//takes two numbers and record of current array setup (to reset the bankAvlbl)
//only does first match of layer-1 to make smaller subset of solns
function row1PermSmall(switchSpot, toSwitchIn, simpleNumArray, solnSubset = 'S') {
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
        if (row2Perm(0,0,simpleNumArray2, solnSubset)) {
          return true;
        }
      }
    }
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
     row1PermSmall(newSwitchSpot, i, simpleNumArray);
    }
  }
}//end of row1PermSmall()

//****************** */

//takes two numbers and record of current array setup (to reset the bankAvlbl)
function row2Perm(switchSpot, toSwitchIn, simpleNumArray, solnSubset) {
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
        if (row3Perm(0,0,simpleNumArray3, solnSubset)) {
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
      row2Perm(switchSpot, toSwitchIn, simpleNumArray, solnSubset);
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
     row2Perm(newSwitchSpot, i, simpleNumArray, solnSubset);
    }
  }
  /*
  //make sure to try all toSwitchIns, even if current was not fit
  if (toSwitchIn !== 9) {
    toSwitchIn++;
    row1Perm(switchSpot, toSwitchIn, simpleNumArray);
  }
  */
}//end of row2Perm()


//******************************* */

//just perm all Row 3 
//takes two numbers
function row3Perm(switchSpot, toSwitchIn, simpleNumArray, solnSubset) {
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
        //console.log('     perfect fit!');
        cementSolvedArray(solnSubset);
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
      row3Perm(switchSpot, toSwitchIn, simpleNumArray, solnSubset);
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
     if (row3Perm(newSwitchSpot, i, simpleNumArray, solnSubset)) {
      return true;
     }
    }
  }
}//end of row3Perm()


//HTML Buttons and eventHandlers Section
// creates drop-down menu for current solnSubset
function setUpButtons(solnSubset) {

  let solvedArray;
  if (solnSubset === 'S') solvedArray = allSolvedPuzzlePiecesSmall;
  else if (solnSubset === 'L') solvedArray = allSolvedPuzzlePiecesLarge;

  console.log('    ' + solnSubset);

  const selectButton = document.getElementById('soln-number');
  const childrenLength = selectButton.children.length;
  //delete previous option values
  for (let i = 0; i < childrenLength; i++) {
    selectButton.lastChild.remove();
  }

  //add new option values
  for (let i = 0; i < solvedArray.length; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', i);
    option.textContent = i;
    selectButton.appendChild(option);
  }

  selectButton.onchange = function() {
    const solutionNum = selectButton.value;
    displayNewSolutionHtml(solutionNum, solnSubset);
  };
}

//control panel
function setUpControlPanel() {

  const solnButtBlock = document.getElementById('soln-generator');
  const smallSolnSubset = document.getElementById("generate-small");
  smallSolnSubset.addEventListener('click', function() {

    let simpleNumArray = [0,1,2,3,4,5,6,7,8,9];
    console.log('STARTED small');
    row1PermSmall(0, 0, simpleNumArray);
    console.log('COMPLETED small');
    //setUpButtons('S');

    smallSolnSubset.remove();
    document.getElementById('small-soln').removeAttribute('disabled');
    //document.getElementById('small-soln').setAttribute('checked', '');

    //checks if other button has already been popped ... if so. delete whole div
    if (solnButtBlock.children.length === 0) {
      solnButtBlock.remove();
    }
  })

  const largeSolnSubset = document.getElementById("generate-large");
  largeSolnSubset.addEventListener('click', function() {

    if (confirm('Are you sure? Generating the large subset could take up to 2 minutes.\n(Note: If your browser says the page is unresponsive, click "wait" and eventually it should load.)')) {
      let simpleNumArray = [0,1,2,3,4,5,6,7,8,9];
      console.log('STARTED large');
      row1PermLarge(0, 0, simpleNumArray);
      console.log('COMPLETED large');
      //setUpButtons('L');

      largeSolnSubset.remove();
      document.getElementById('large-soln').removeAttribute('disabled');
      //document.getElementById('large-soln').setAttribute('checked', '');

      //checks if other button has already been popped ... if so. delete whole div
      if (solnButtBlock.children[1].children.length === 0) {
        solnButtBlock.remove();
      }
    }
  })

  //radio buttons (switches solnSubset)
  const radioSubsetSmall = document.getElementById("small-soln");
  radioSubsetSmall.addEventListener('change', function() {
    setUpButtons(radioSubsetSmall.value);
  })
  const radioSubsetLarge = document.getElementById("large-soln");
  radioSubsetLarge.addEventListener('change', function() {
    setUpButtons(radioSubsetLarge.value);
  })

}

setUpDOMPropertyArr();
setUpDOMPropertyArrCircle();
setUpControlPanel();

