import { getRandNum, zeroPad, createElement, showElement } from '../utils/index.js';
import { hitMaxStrengths, hitTargets, logTemplates } from '../constants/index.js';

export class Game {
  constructor({arenaTagClass, controlTagClass, logTagClass}) {
    this.$arenas = document.querySelector(arenaTagClass);
    this.$fightForm = document.querySelector(controlTagClass);
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
        logText = logTemplates[logType][getRandNum(0, logTemplates[logType].length -1)];
        logText = logText.replace('[playerWins]', player1Obj.name);
        logText = logText.replace('[playerLose]', player2Obj.name);
        return logText;
      case 'hit':
      case 'defence':
        logText = logTemplates[logType][getRandNum(0, logTemplates[logType].length -1)];
        logText = logText.replace('[playerKick]', player1Obj.name);
        logText = logText.replace('[playerDefence]', player2Obj.name);
        logText = `${hours}:${minutes}:${seconds}` +
                  ` -- ${logText}` +
                  ` -- ${player2Obj.name}: ущерб ${damage}, осталось ${player2Obj.hp} из 100.`;
        return logText;
      case 'draw':
        return logTemplates[logType];
    }
  }

  showLogMessage = (message) => {
    this.$chat.insertAdjacentHTML('afterbegin', `<p>${message}</p>`);
  }

  logSpacer = () => {
    this.$chat.insertAdjacentHTML('afterbegin', `<p style="color:yellow" >***</p>`);
  }

  createResultMessage = () => {
    const $resMessage = createElement('div', 'winTitle');
    $resMessage.style.display = 'none';
    return $resMessage;
  }

  showFightResult = (message) => {
    this.$fightForm.style.display = 'none';
    const $resultMessage = this.createResultMessage();
    this.$arenas.appendChild($resultMessage);
    if (message === 'Draw') {
      $resultMessage.innerText = message;
    } else {
      $resultMessage.innerText = `${message} wins!`;
    }
    $resultMessage.style.display = 'block';
  }

  createReloadButton = (buttonTitle) => {
    const $button = createElement('button', 'button');
    $button.style.display = 'none';
    $button.innerText = buttonTitle;
    $button.addEventListener('click', function () {
      window.location.reload();
    });
    return $button;
  }

  showReloadButton = () => {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    this.$arenas.appendChild($reloadButtonDiv);
    const $reloadButton = this.createReloadButton('Reload');
    $reloadButtonDiv.appendChild($reloadButton);
    showElement($reloadButton);
  }

  controlDuel = (player1Obj, player2Obj) => (event) => {
    event.preventDefault();
  
    const player1Hit = this.player1Attack();
    console.log('##### player1Hit', player1Hit);
  
    const player2Hit = this.player2Attack();
    console.log('##### player2Hit', player2Hit);
  
    const damage1 =
      (player1Hit.defenceTarget === player2Hit.hitTarget) ? 0 : player2Hit.hitValue;
    const damage2 =
      (player2Hit.defenceTarget === player1Hit.hitTarget) ? 0 : player1Hit.hitValue;
  
    console.log(`Damages: ${damage1}, ${damage2}`);
  
    this.logSpacer();
  
    if (damage1 !== 0) {
    this.showLogMessage(this.getLogMessage('start', player1Obj, player2Obj));
      player1Obj.changeHp(-damage1);
      player1Obj.renderHp();
      this.showLogMessage(this.getLogMessage('hit', player2Obj, player1Obj, damage1));
    } else {
      this.showLogMessage(this.getLogMessage('defence', player2Obj, player1Obj, 0));
    }
    if (damage2 !== 0) {
      player2Obj.changeHp(-damage2);
      player2Obj.renderHp();
      this.showLogMessage(this.getLogMessage('hit', player1Obj, player2Obj, damage2));
    } else {
      this.showLogMessage(this.getLogMessage('defence', player1Obj, player2Obj, 0));
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
  };

  player1Attack = () => {
    const hitTrg = hitTargets[getRandNum(0, hitTargets.length - 1)];
    const defenceTrg = hitTargets[getRandNum(0, hitTargets.length - 1)];
    return {
      hitTarget: hitTrg,
      hitValue: getRandNum(1, hitMaxStrengths[hitTrg]),
      defenceTarget: defenceTrg
    };
  }

  player2Attack = () => {
    const strike = {};
    for (let item of this.$fightForm) {
      if (item.checked && item.name === 'hit') {
        strike.hitTarget = item.value;
        strike.hitValue = getRandNum(1, hitMaxStrengths[item.value]);
      }
      if (item.checked && item.name === 'defence') {
        strike.defenceTarget = item.value;
      }
      item.checked = false;
    }
    return strike;
  }

  initStage = (player1Obj, player2Obj) => {
    // player1.enterArena();
    // player2.enterArena();
  
    this.showLogMessage(this.getLogMessage('start', player1Obj, player2Obj));
  
    this.$fightForm.addEventListener('submit', this.controlDuel(player1Obj, player2Obj));
  }
}