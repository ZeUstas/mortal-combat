import { Game } from './Game/index.js';

const game = new Game({
  arenaTagClass: '.arenas',
  controlTagClass: '.control',
  logTagClass: '.chat'
});

game.start();
