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
arrPuzzlePieces[3] = [{left:'O', right:'P'}, {left:'P', right:'G'}, {left:'O', right:'G'}, {left:'G', right:'P'}, {left:'G', right:'O'}];


function displayPuzzleHtml() { }


//checks fit of new puzzlePiece in given index/location (0 --> 9)
//puzzlePiece param should be a cell of arrPuzzlePieces
function fitsRowOne(indexToCheck, puzzlePiece) {
  console.log(arrPuzzlePieces[0][indexToCheck] + puzzlePiece.top);
  if (arrPuzzlePieces[0][indexToCheck] === puzzlePiece.top) {
    console.log('fit on spot ' + indexToCheck);
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
  
  console.log(arrPuzzlePieces[1][rowOneLeftIndex].left + puzzlePiece.left);
  if (arrPuzzlePieces[1][rowOneLeftIndex].left === puzzlePiece.left && arrPuzzlePieces[1][rowOneRightIndex].right === puzzlePiece.right) {
    console.log('fit on spot ' + indexToCheck);
    return true;
  }
  else {
    console.log("no go senor");
    return false;
  }
}

//checks fit of new puzzlePiece in given index/location (0 --> 4)
function fitsRowThree (indexToCheck, puzzlePiece) {
  let rowOneLeftIndex,
      rowOneRightIndex;
  if (indexToCheck === 0) {
    rowOneLeftIndex = 0;
    rowOneRightIndex = 1;
  }
  else if (indexToCheck === 0) {
    rowOneLeftIndex = 2;
    rowOneRightIndex = 3;
  }
  else if (indexToCheck === 0) {
    rowOneLeftIndex = 4;
    rowOneRightIndex = 5;
  }
  else if (indexToCheck === 0) {
    rowOneLeftIndex = 6;
    rowOneRightIndex = 7;
  }
  else {
    rowOneLeftIndex = 8;
    rowOneRightIndex = 9;
  }

  if (arrPuzzlePieces[2][rowOneLeftIndex].bottom === puzzlePiece.left && arrPuzzlePieces[2][rowOneRightIndex].bottom === puzzlePiece.right) {
    console.log('fit on spot ' + indexToCheck);
    return true;
  }
  else {
    return false;
  }
}

//TESTING Section: 
console.log(arrPuzzlePieces);
console.log(arrPuzzlePieces[1][2].left);

fitsRowOne(0, arrPuzzlePieces[1][4]);
fitsRowTwo(4, arrPuzzlePieces[2][2]);
