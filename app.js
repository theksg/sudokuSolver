const puzzleBoard = document.querySelector("#puzzle")
const solveButton = document.querySelector("#solve-button")

const squares = 81

for(let i=0; i<squares ;i++){
    const inputElement = document.createElement("input");
    inputElement.setAttribute('type','number')
    inputElement.setAttribute ('min', '1')
    inputElement.setAttribute ( "max", '9')
    puzzleBoard.appendChild(inputElement)
}


const joinValues = () =>{
    const inputValues = document.querySelectorAll("input");

    let board = []
    let board_row = []

    inputValues.forEach(input=>{
        if (input.value) {
            board_row.push(input.value)
        }
        else
            board_row.push(0)
        if(board_row.length == 9)
        {
            board.push(board_row);
            board_row = []
        }
    })

    return board

}


const populateValues = (response) =>{
    console.log(response)
    boardArrays = response.solution;
    console.log(boardArrays)
    let row = 0 ,col = 0;
    const inputValues = document.querySelectorAll("input");

    let inputValuesPtr = 0;
    boardArrays.forEach( curArray =>{
        curArray.forEach( curValue =>{
            inputValues[inputValuesPtr++].value = curValue
        })
    })

}


const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

const solve = () =>{

    const data = {board:joinValues()}

    fetch('https://sugoku.herokuapp.com/solve', {
    method: 'POST',
    body: encodeParams(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(response => populateValues(response))
    .catch(console.warn)
}


solveButton.addEventListener('click', solve);