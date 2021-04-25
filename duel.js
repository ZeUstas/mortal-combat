import {createElement, showElement, getRandNum} from './lib.js';
import Player from './player.js';
import DuelLog from './duel-log.js';

export default class Duel {
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

  create$Player = (objPlayer) => {
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

  $controlForm = document.querySelector('.control');

  create$ResultMessage = () => {
    const $resMessage = createElement('div', 'winTitle');
    $resMessage.style.display = 'none';
    return $resMessage;
  }
  $resultMessage = this.create$ResultMessage();

  showFightResult = (message) => {
    this.$controlForm.style.display = 'none';
    switch (message) {
      case this.player1.name:
      case this.player2.name:
        this.$resultMessage.innerText = `${message} wins!`;
        break;
      default:
        this.$resultMessage.innerText = message;
    }
    this.$resultMessage.style.display = 'block';
  }

  create$ReloadButton = (buttonTitle) => {
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

  duelLog = new DuelLog();

  getReady = () => {
    this.$arenas.appendChild(this.$player1);
    this.$arenas.appendChild(this.$player2);

    this.$arenas.appendChild(this.$resultMessage);

    this.$arenas.appendChild(this.$reloadButtonDiv);
    this.$reloadButtonDiv.appendChild(this.$reloadButton);

    let message = this.duelLog.getMessage('start', this.player1, this.player2);
    this.duelLog.showMessage(message);
  }

  hitMaxStrengths = {
    head: 70,
    body: 60,
    foot: 50
  };

  hitTargets = ['head', 'body', 'foot'];

  getPlayer1Hit = () => {
    const hitTrg = this.hitTargets[getRandNum(0, this.hitTargets.length - 1)];
    const defenceTrg = this.hitTargets[getRandNum(0, this.hitTargets.length - 1)];
    return {
      hitTarget: hitTrg,
      hitValue: getRandNum(1, this.hitMaxStrengths[hitTrg]),
      defenceTarget: defenceTrg
    };
  }

  getPlayer2Hit = () => {
    const strike = {};
    for (let item of this.$controlForm) {
      if (item.checked && item.name === 'hit') {
        strike.hitTarget = item.value;
        strike.hitValue = getRandNum(1, this.hitMaxStrengths[item.value]);
      }
      if (item.checked && item.name === 'defence') {
        strike.defenceTarget = item.value;
      }
      item.checked = false;
    }
    return strike;
  }

  start = (event) => {
    event.preventDefault();

    const player1Hit = this.getPlayer1Hit();
    console.log('##### player1-hit', player1Hit);

    const player2Hit = this.getPlayer2Hit();
    console.log('##### player2-hit', player2Hit);

    const damage1 =
      (player1Hit.defenceTarget === player2Hit.hitTarget) ? 0 : player2Hit.hitValue;
    const damage2 =
      (player2Hit.defenceTarget === player1Hit.hitTarget) ? 0 : player1Hit.hitValue;

    console.log(`Damages: ${damage1}, ${damage2}`);

    this.duelLog.lineFeed();

    if (damage1 !== 0) {
      this.player1.changeHp(-damage1);
      this.player1.renderHp();
      this.duelLog.showMessage(this.duelLog.getMessage('hit', this.player2, this.player1, damage1));
    } else {
      this.duelLog.showMessage(this.duelLog.getMessage('defence', this.player2, this.player1, 0));
    }
    if (damage2 !== 0) {
      this.player2.changeHp(-damage2);
      this.player2.renderHp();
      this.duelLog.showMessage(this.duelLog.getMessage('hit', this.player1, this.player2, damage2));
    } else {
      this.duelLog.showMessage(this.duelLog.getMessage('defence', this.player1, this.player2, 0));
    }

    if (this.player1.hp === 0 && this.player2.hp > 0) {
      this.showFightResult(this.player2.name);
      this.duelLog.lineFeed();
      this.duelLog.showMessage(this.duelLog.getMessage('end', this.player2, this.player1));
    } else if (this.player2.hp === 0 && this.player1.hp > 0) {
      this.showFightResult(this.player1.name);
      this.duelLog.lineFeed();
      this.duelLog.showMessage(this.duelLog.getMessage('end', this.player1, this.player2));
    } else if (this.player1.hp === 0 && this.player2.hp === 0) {
      this.showFightResult('Draw');
      this.duelLog.lineFeed();
      this.duelLog.showMessage(this.duelLog.getMessage('draw'));
    } else {
      return;
    }
    // this.$reloadButton.style.display = 'block';
    showElement(this.$reloadButton);
  }
}


