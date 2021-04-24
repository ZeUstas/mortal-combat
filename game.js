import {createElement, showElement} from './lib.js';
import Player from './player.js';
import Duel from './duel.js'
import DuelLog from './duel-log.js';

export class Game {
  // constructor() {
  // }
  player1 = new Player({
    indexNum: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai', 'Axe', 'Long Sword', 'Ice Hammer']
  });
  player2 = new Player({
    indexNum: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade', 'Ice Daggers', 'Ice Hammer']
  });

  create$Player(objPlayer) {
    const $player = createElement('div', `player${objPlayer.indexNum}`);
    const $progressBar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $image = createElement('img');

    $life.style.width = `${objPlayer.hp}%`;
    $name.innerText = objPlayer.name;
    $image.src = objPlayer.img;

    $player.appendChild($progressBar);
    $player.appendChild($character);
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($image);

    return $player;
  }
  $player1 = this.create$Player(this.player1);
  $player2 = this.create$Player(this.player2);

  $arenas = document.querySelector('.arenas');

  duel = new Duel();
  $duelLog = new DuelLog();

  create$ResultMessage() {
    const $resMessage = createElement('div', 'winTitle');
    $resMessage.style.display = 'none';
    return $resMessage;
  }
  $resultMessage = this.create$ResultMessage();

  create$ReloadButton(buttonTitle) {
    const $button = createElement('button', 'button');
    $button.style.display = 'none';
    $button.innerText = buttonTitle;
    $button.addEventListener('click', function () {
      window.location.reload();
    });
    return $button;
  }
  $reloadButton = this.create$ReloadButton('Reload');
  $reloadButtonDiv = createElement('div', 'reloadWrap');

  showResult(message) {
    this.duel.$controlForm.style.display = 'none';
    switch (message) {
      case player1.name:
      case player2.name:
        this.$resultMessage.innerText = `${message} wins!`;
        break;
      default:
        this.$resultMessage.innerText = message;
        break;
    }
    this.$resultMessage.style.display = 'block';
  }

  start() {
    const create$Player = (objPlayer) => {
      const $player = createElement('div', `player${objPlayer.indexNum}`);
      const $progressBar = createElement('div', 'progressbar');
      const $life = createElement('div', 'life');
      const $name = createElement('div', 'name');
      const $character = createElement('div', 'character');
      const $image = createElement('img');
    
      $life.style.width = `${objPlayer.hp}%`;
      $name.innerText = objPlayer.name;
      $image.src = objPlayer.img;
    
      $player.appendChild($progressBar);
      $player.appendChild($character);
      $progressBar.appendChild($life);
      $progressBar.appendChild($name);
      $character.appendChild($image);
    
      return $player;
    };
    const $player1 = create$Player(player1);
    const $player2 = create$Player(player2);
    this.$arenas.appendChild($player1);
    this.$arenas.appendChild($player2);
    this.$arenas.appendChild($resultMessage);

    this.$arenas.appendChild($reloadButtonDiv);
    this.$reloadButtonDiv.appendChild($reloadButton);

    let message = this.duelLog.getMessage('start', player1, player2);
    this.duelLog.showMessage(message);
    this.duel.$controlForm.addEventListener('submit', console.log);
  }
}

