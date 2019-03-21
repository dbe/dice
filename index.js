const dice = {
  blue: [2,2,2,7,7,7,],
  magenta: [1,1,6,6,6,6],
  olive: [0,5,5,5,5,5],
  red: [4,4,4,4,4,9],
  yellow: [3,3,3,3,8,8]
}

const trials = 1000;
const validDice = Object.keys(dice);

function roll(die) {
  let index = Math.floor(Math.random() * 6);
  return die[index];
}

// for(var i = 0; i < 10000; i++) {
// }

let player1 = process.argv[2]

if(!validDice.includes(player1)) {
  console.log(`${player1} is not a valid dice type. Pick one from: ${validDice}`)
  process.exit(1);
}

let player2 = process.argv[3]

if(!validDice.includes(player2)) {
  console.log(`${player2} is not a valid dice type. Pick one from: ${validDice}`)
  process.exit(1);
}

console.log(`${player1} vs ${player2}`);
console.log(`Running ${trials} trials`)


let results = [];

for(let i = 0; i < trials; i++) {
  results.push([
    roll(dice[player1]),
    roll(dice[player2]),
  ])
}



console.log('results: ', results);


function createReducer(fn) {
  return function(accumulator, current) {
    if(fn(current)) {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }
}

let player1WinsFn = createReducer((result) => result[0] > result[1])
let player2WinsFn = createReducer((result) => result[0] < result[1])
let tieFn = createReducer((result) => result[0] == result[1])



let player1Wins = results.reduce(player1WinsFn, 0)
let player2Wins = results.reduce(player2WinsFn, 0)
let ties = results.reduce(tieFn, 0)

console.log(`player1 wins: ${player1Wins}`)
console.log(`player2 wins: ${player2Wins}`)
console.log(`ties: ${ties}`)
