import {
  getRandNum,
  zeroPad,
  createElement,
  showElement,
} from '../utils/index.js';
import {
  hitMaxStrengths,
  hitTargets,
  logTemplates,
} from '../constants/index.js';
import { Player } from '../Player/index.js';

export class Game {
  constructor({ arenaTagClass, controlTagClass, logTagClass }) {
    this.$arenas = document.querySelector(arenaTagClass);
    this.$duelControlForm = document.querySelector(controlTagClass);
    this.$chat = document.querySelector(logTagClass);
  }

  getLogMessage = (logType, player1Obj, player2Obj, damage) => {
    let logText;
    const time = new Date();
    const hours = zeroPad(time.getHours());
    const minutes = zeroPad(time.getMinutes());
    const seconds = zeroPad(time.getSeconds());

    switch (logType) {
      case 'start':
        logText = logTemplates[logType];
        logText = logText.replace('[time]', `${hours}:${minutes}`);
        logText = logText.replace('[player1]', player1Obj.name);
        logText = logText.replace('[player2]', player2Obj.name);
        return logText;
      case 'end':
        logText =
          logTemplates[logType][
            getRandNum(0, logTemplates[logType].length - 1)
          ];
        logText = logText.replace('[playerWins]', player1Obj.name);
        logText = logText.replace('[playerLose]', player2Obj.name);
        return logText;
      case 'hit':
      case 'defence':
        logText =
          logTemplates[logType][
            getRandNum(0, logTemplates[logType].length - 1)
          ];
        logText = logText.replace('[playerKick]', player1Obj.name);
        logText = logText.replace('[playerDefence]', player2Obj.name);
        logText =
          `${hours}:${minutes}:${seconds}` +
          ` -- ${logText}` +
          ` -- ${player2Obj.name}: ущерб ${damage}, осталось ${player2Obj.hp} из 100.`;
        return logText;
      case 'draw':
        return logTemplates[logType];
    }
  };

  showLogMessage = (message) => {
    this.$chat.insertAdjacentHTML('afterbegin', `<p>${message}</p>`);
  };

  logSpacer = () => {
    this.$chat.insertAdjacentHTML(
      'afterbegin',
      `<p style="color:yellow" >***</p>`
    );
  };

  createResultMessage = () => {
    const $resMessage = createElement('div', 'winTitle');
    $resMessage.style.display = 'none';
    return $resMessage;
  };

  showFightResult = (message) => {
    this.$duelControlForm.style.display = 'none';
    const $resultMessage = this.createResultMessage();
    this.$arenas.appendChild($resultMessage);
    if (message === 'Draw') {
      $resultMessage.innerText = message;
    } else {
      $resultMessage.innerText = `${message} wins!`;
    }
    $resultMessage.style.display = 'block';
  };

  createReloadButton = (buttonTitle) => {
    const $button = createElement('button', 'button');
    $button.style.display = 'none';
    $button.innerText = buttonTitle;
    $button.addEventListener('click', function () {
      window.location.reload();
    });
    return $button;
  };

  showReloadButton = () => {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    this.$arenas.appendChild($reloadButtonDiv);
    const $reloadButton = this.createReloadButton('Reload');
    $reloadButtonDiv.appendChild($reloadButton);
    showElement($reloadButton);
  };

  playerIntent = () => {
    const intent = {};
    for (let item of this.$duelControlForm) {
      if (item.checked && item.name === 'hit') {
        intent.hitTarget = item.value;
      }
      if (item.checked && item.name === 'defence') {
        intent.defenceTarget = item.value;
      }
      // item.checked = false;
    }
    return intent;
  };

  prepareAttack = (hitTarget, defTarget) => {
    const fetchPromise = fetch(
      'http://reactmarathon-api.herokuapp.com/api/mk/player/fight',
      {
        method: 'POST',
        body: JSON.stringify({
          hit: hitTarget,
          defence: defTarget,
        }),
      }
    );
    const attackData = fetchPromise.then((result) => result.json());
    return attackData;
  };

  controlDuel = (player1Obj, player2Obj) => async (event) => {
    event.preventDefault();

    const intent = this.playerIntent();

    let player1Hit = {};
    let player2Hit = {};

    try {
      const attackData = await this.prepareAttack(
        intent.hitTarget,
        intent.defenceTarget
      );

      player1Hit.hitValue = attackData.player1.value;
      player1Hit.hitTarget = attackData.player1.hit;
      player1Hit.defenceTarget = attackData.player1.defence;

      player2Hit.hitValue = attackData.player2.value;
      player2Hit.hitTarget = attackData.player2.hit;
      player2Hit.defenceTarget = attackData.player2.defence;

      console.log('\nplayer-1:', player1Hit);
      console.log('player-2:', player2Hit);

      const damage1 =
        player1Hit.defenceTarget === player2Hit.hitTarget
          ? 0
          : player2Hit.hitValue;
      const damage2 =
        player2Hit.defenceTarget === player1Hit.hitTarget
          ? 0
          : player1Hit.hitValue;

      console.log(`Damages: ${damage1}, ${damage2}`);

      this.logSpacer();

      if (damage1 !== 0) {
        player1Obj.changeHp(-damage1);
        player1Obj.renderHp();
        this.showLogMessage(
          this.getLogMessage('hit', player2Obj, player1Obj, damage1)
        );
      } else {
        this.showLogMessage(
          this.getLogMessage('defence', player2Obj, player1Obj, 0)
        );
      }

      if (damage2 !== 0) {
        player2Obj.changeHp(-damage2);
        player2Obj.renderHp();
        this.showLogMessage(
          this.getLogMessage('hit', player1Obj, player2Obj, damage2)
        );
      } else {
        this.showLogMessage(
          this.getLogMessage('defence', player1Obj, player2Obj, 0)
        );
      }

      if (player1Obj.hp === 0 && player2Obj.hp > 0) {
        this.showFightResult(player2Obj.name);
        this.logSpacer();
        this.showLogMessage(this.getLogMessage('end', player2Obj, player1Obj));
      } else if (player2Obj.hp === 0 && player1Obj.hp > 0) {
        this.showFightResult(player1Obj.name);
        this.logSpacer();
        this.showLogMessage(this.getLogMessage('end', player1Obj, player2Obj));
      } else if (player1Obj.hp === 0 && player2Obj.hp === 0) {
        this.showFightResult('Draw');
        this.logSpacer();
        this.showLogMessage(this.getLogMessage('draw'));
      } else {
        return;
      }
      this.showReloadButton();
    } catch (err) {
      console.log(`Error fetching data from server: ${err.message}`);
    }
  };

  initStage = (player1Obj, player2Obj) => {
    this.showLogMessage(this.getLogMessage('start', player1Obj, player2Obj));
    this.$duelControlForm.addEventListener(
      'submit',
      this.controlDuel(player1Obj, player2Obj)
    );
  };

  fetchPlayers = async () => {
    let players;
    try {
      players = await fetch(
        'https://reactmarathon-api.herokuapp.com/api/mk/players'
      ).then((result) => result.json());
      return players;
    } catch (err) {
      console.log(err.message);
    }
  };

  getPlayer = async () => {
    try {
      const playersArr = await this.fetchPlayers();
      const player = playersArr[getRandNum(0, playersArr.length - 1)];
      return player;
    } catch (err) {
      console.log(`Error obtaining Player2: ${err.message}`);
    }
  };

  createRandomPlayer = async () => {
    let playerData;
    let player;

    try {
      playerData = await this.getPlayer();
    } catch (err) {
      console.log(`Error getting player2: ${err.message}`);
    }

    player = new Player({
      ...playerData,
      indexNum: 2,
      rootSelector: 'arenas',
    });
    return player;
  };

  createChosenPlayer = () => {
    const player = new Player({
      indexNum: 1,
      name: 'Sub-Zero',
      hp: 100,
      img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
      rootSelector: 'arenas',
    });
    return player;
  };

  start = async () => {
    const player1 = this.createChosenPlayer();
    console.log(player1);

    const player2 = await this.createRandomPlayer();
    console.log(player2);

    player1.enterArena();
    player2.enterArena();

    this.initStage(player1, player2);
  };
}
