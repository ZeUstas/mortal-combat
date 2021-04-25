import Duel from './duel.js'

export default class Game {
  // constructor() {
  // }

  duel = new Duel();

  start() {
    this.duel.getReady();
    this.duel.$controlForm.addEventListener('submit', this.duel.start);
  }
}

