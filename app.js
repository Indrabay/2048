const readline = require("readline-sync")
const APP = {}
APP.board = []
APP.spawnFirst = 2
APP.spawnNumber = [2]
APP.winNumber = 1024

APP.initBoard = (edge) => {
  APP.board = []
  for (let i = 0; i < edge; i++) {
    APP.board[i] = []
    for (let j = 0; j < edge; j++) {
      APP.board[i][j] = {
        number: "-"
      }
    }
  }
}

APP.initSpawn = () => {
  let col = Math.floor(Math.random() * APP.board.length)
  let row = Math.floor(Math.random() * APP.board.length)
  while (APP.spawnFirst > 0) {
    if (APP.board[row][col].number === "-") {
      APP.board[row][col].number = APP.spawnNumber[0]
      APP.spawnFirst--
    } else {
      col = Math.floor(Math.random() * APP.board.length)
      row = Math.floor(Math.random() * APP.board.length)
    }
  }
  APP.spawnFirst = 2
}

APP.spawn = () => {
  let manySpawn = 1
  let col = Math.floor(Math.random() * APP.board.length)
  let row = Math.floor(Math.random() * APP.board.length)
  while (manySpawn > 0) {
    if (APP.board[row][col].number === "-") {
      APP.board[row][col].number = APP.spawnNumber[0]
      manySpawn--
    } else {
      col = Math.floor(Math.random() * APP.board.length)
      row = Math.floor(Math.random() * APP.board.length)
    }
  }
}

APP.printBoard = () => {
  let stringToPrint = ""
  for (let i = 0; i < APP.board.length; i++) {
    for (let j = 0; j < APP.board.length; j++) {
      stringToPrint += `${APP.board[i][j].number}`.padEnd(3, ' ')
    }
    stringToPrint += '\n'
  }
  console.log(stringToPrint)
}

APP.checkWin = () => {
  for (let i = 0; i < APP.board.length; i++) {
    for (let j = 0; j < APP.board.length; j++) {
      if (APP.board[i][j].number === APP.winNumber) {
        return true
      }
    }
  }

  return false
}

APP.askPlay = () => {
  let end = false
  while (!end) {
    APP.printBoard()
    console.log("1.Naik")
    console.log("2.Turun")
    console.log("3.Kiri")
    console.log("4.Kanan")
    let inputUser = readline.question("Pilihan")
    APP.play(Number(inputUser))
    if (APP.checkWin()) {
      end= true
    }
  }
}

APP.clean = () => {
  for (let i = 0; i < APP.board.length; i++) {
    for (let j = 0; j < APP.board.length; j++) {
      if (isNaN(APP.board[i][j].number) === true) {
        APP.board[i][j].number = "-"
      }
    }
  }
}

APP.play = (move) => {
  switch (move) {
    case 1: 
      APP.up()
      break
    case 2:
      APP.down()
      break
    case 3:
      APP.left()
      break
    case 4:
      APP.right()
      break
    default:
      console.log("salah")
      break
  }
  APP.spawn()
  APP.clean()
}

APP.up = () => {
  let number = undefined
  let temporaryIndex = 0
  for (let i = 0; i < APP.board.length; i++) {
    for (let j = 0; j < APP.board.length; j++) {
      if (number === undefined && APP.board[j][i].number !== "-") {
        number = APP.board[j][i].number
        temporaryIndex = j
      } else if (number !== undefined && APP.board[j][i].number === number) {
        console.log("here")
        APP.board[temporaryIndex][i].number += number
        APP.board[j][i].number = "-"
        number = undefined
      } else if (number !== undefined && APP.board[j][i].number === "-") {
        // do nothing
      } else if (number !== undefined && APP.board[j][i].number !== number) {
        number = APP.board[j][i].number
        temporaryIndex = j
      }
    }
    number = undefined
  }

  for (let i = 0; i < APP.board.length; i++) {
    let index = 0;
    for (let j = 0; j < APP.board.length; j++) {
      if (APP.board[j][i].number !== "-") {
        let numberTemp = APP.board[j][i].number
        APP.board[index][i].number = numberTemp
        if (index !== j) {
          APP.board[j][i].number = "-"
        }
        index++
      }
    }
  }
}

APP.down = () => {
  let number = undefined
  let temporaryIndex = APP.board.length - 1
  for (let i = APP.board.length - 1; i >= 0; i--) {
    for (let j = 0; j < APP.board.length; j++) {
      if (number === undefined && APP.board[j][i].number !== "-") {
        number = APP.board[j][i].number
        temporaryIndex = j
      } else if (number !== undefined && APP.board[j][i].number === number) {
        APP.board[temporaryIndex][i].number += number
        APP.board[j][i].number = "-"
        number = undefined
      } else if (number !== undefined && APP.board[j][i].number === "-") {
        // do nothing
      } else if (number !== undefined && APP.board[j][i].number !== number) {
        number = APP.board[j][i].number
        temporaryIndex = j
      }
    }
    number = undefined
  }
  for (let i = APP.board.length - 1; i >= 0; i--) {
    let index = APP.board.length - 1;
    for (let j = APP.board.length - 1; j >= 0; j--) {
      if (APP.board[j][i].number !== "-") {
        let numberTemp = APP.board[j][i].number
        APP.board[index][i].number = numberTemp
        if (index !== j) {
          APP.board[j][i].number = "-"
        }
        index--
      }
    }
  }
}

APP.right = () => {
  let number = undefined
  let temporaryIndex = APP.board.length - 1
  for (let i = 0; i < APP.board.length; i++) {
    for (let j = APP.board.length - 1; j >= 0; j--) {
      if (number === undefined && APP.board[i][j].number !== "-") {
        number = APP.board[i][j].number
        temporaryIndex = j
      } else if (number !== undefined && APP.board[i][j].number === number) {
        APP.board[i][temporaryIndex].number += number
        APP.board[i][j].number = "-"
        number = undefined
      } else if (number !== undefined && APP.board[j][i].number === "-") {
        // do nothing
      } else if (number !== undefined && APP.board[i][j].number !== number) {
        number = APP.board[i][j].number
        temporaryIndex = j
      }
    }
    number = undefined
  }
  for (let i = 0; i < APP.board.length; i++) {
    let index = APP.board.length - 1
    for (let j = APP.board.length - 1; j >= 0; j--) {
      if (APP.board[i][j].number !== "-") {
        let numberTemp = APP.board[i][j].number
        APP.board[i][index].number = numberTemp
        if (index !== j) {
          APP.board[i][j].number = "-"
        }
        index--
      }
    }
  }
}

APP.left = () => {
  let number = undefined
  let temporaryIndex = APP.board.length - 1
  for (let i = 0; i < APP.board.length; i++) {
    for (let j = 0; j < APP.board.length; j++) {
      if (number === undefined && APP.board[i][j].number !== "-") {
        number = APP.board[i][j].number
        temporaryIndex = j
      } else if (number !== undefined && APP.board[i][j].number === number) {
        APP.board[i][temporaryIndex].number += number
        APP.board[i][j].number = "-"
        number = undefined
      } else if (number !== undefined && APP.board[i][j].number !== number) {
        number = APP.board[i][j].number
        temporaryIndex = j
      }
    }
    number = undefined
  }

  for (let i = 0; i < APP.board.length; i++) {
    let index = 0
    for (let j = 0; j < APP.board.length; j++) {
      if (APP.board[i][j].number !== "-") {
        let numberTemp = APP.board[i][j].number
        APP.board[i][index].number = numberTemp
        if (index !== j) {
          APP.board[i][j].number = "-"
        }
        index++
      }
    }
  }
}


// APP.initBoard(4)
// APP.initSpawn()
APP.board = [[{number:4}, {number: 8}, {number: 4}, {number: 2}],
  [{ number: "-" }, { number: 2 }, { number: "-" }, { number: "-" }],
  [{ number: 2 }, { number: 2 }, { number: "-" }, { number: "-" }],
  [{ number: "-" }, { number: 2 }, { number: "-" }, { number: "-" }]]
APP.askPlay()

