import { Player } from './Player/index.js';
import { Game } from './Game/index.js';

const player1 = new Player({
  indexNum: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  selector: 1,
  rootSelector: 'arenas'
});
console.log(player1);

const player2 = new Player({
  indexNum: 2,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  selector: 2,
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
