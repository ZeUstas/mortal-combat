import { Player } from './Player/index.js';
import { Game } from './Game/index.js';
import { getRandNum } from './utils/index.js';

const fetchPlayers = async () => {
  const fetchPromise = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players');
  return fetchPromise.then((result) => result.json());
};

const getPlayer = async () => {
  try {
    const playersArr = await fetchPlayers();
    const player = playersArr[getRandNum(0, playersArr.length - 1)];
    return player;
  }
  catch(err) {
    console.log(`Error fetching players from server: ${err.message}`);
  }
};

let pl2;

try {
  pl2 = await getPlayer();
}
catch(err) {
  console.log(`Error getting player2: ${err.message}`);
}

const player1 = new Player({
  indexNum: 1,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  rootSelector: 'arenas'
});
console.log(player1);

const player2 = new Player({
  ...pl2,
  indexNum: 2,
  rootSelector: 'arenas'
});
console.log(player2);

const game = new Game({
  arenaTagClass: '.arenas',
  controlTagClass: '.control',
  logTagClass: '.chat'
});

player1.enterArena();
player2.enterArena();

game.initStage(player1, player2);
