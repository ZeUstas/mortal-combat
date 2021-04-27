import { getRandNum, zeroPad, createElement, showElement } from './utils/index.js';
import { hitMaxStrengths, hitTargets, logTemplates } from './constants/index.js';
import { Player } from './Player/index.js';
import { Game } from './Game/index.js';

const $arenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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
// const getLogMessage = (logType, player1Obj, player2Obj, damage) => {
//   let logText;
//   const time = new Date();
//   const hours = zeroPad(time.getHours());
//   const minutes = zeroPad(time.getMinutes());
//   const seconds = zeroPad(time.getSeconds());

//   switch (logType) {
//     case 'start':
//       logText = logTemplates[logType];
//       logText = logText.replace('[time]', `${hours}:${minutes}`);
//       logText = logText.replace('[player1]', player1Obj.name);
//       logText = logText.replace('[player2]', player2Obj.name);
//       return logText;
//     case 'end':
//       logText = logTemplates[logType][getRandNum(0, logTemplates[logType].length -1)];
//       logText = logText.replace('[playerWins]', player1Obj.name);
//       logText = logText.replace('[playerLose]', player2Obj.name);
//       return logText;
//     case 'hit':
//     case 'defence':
//       logText = logTemplates[logType][getRandNum(0, logTemplates[logType].length -1)];
//       logText = logText.replace('[playerKick]', player1Obj.name);
//       logText = logText.replace('[playerDefence]', player2Obj.name);
//       logText = `${hours}:${minutes}:${seconds}` +
//                 ` -- ${logText}` +
//                 ` -- ${player2Obj.name}: ущерб ${damage}, осталось ${player2Obj.hp} из 100.`;
//       return logText;
//     case 'draw':
//       return logTemplates[logType];
//   }
// }

// const showLogMessage = (message) => {
//   $chat.insertAdjacentHTML('afterbegin', `<p>${message}</p>`);
// }

// const logSpacer = () => {
//   $chat.insertAdjacentHTML('afterbegin', `<p style="color:yellow" >***</p>`);
// }

// const createResultMessage = () => {
//   const $resMessage = createElement('div', 'winTitle');
//   $resMessage.style.display = 'none';
//   return $resMessage;
// }

// const showFightResult = (message) => {
//   $fightForm.style.display = 'none';
//   const $resultMessage = createResultMessage();
//   $arenas.appendChild($resultMessage);
//   if (message === player1.name || message === player2.name) {
//     $resultMessage.innerText = `${message} wins!`;
//   } else {
//     $resultMessage.innerText = message;
//   }
//   $resultMessage.style.display = 'block';
// }

// const createReloadButton = (buttonTitle) => {
//   const $button = createElement('button', 'button');
//   $button.style.display = 'none';
//   $button.innerText = buttonTitle;
//   $button.addEventListener('click', function () {
//     window.location.reload();
//   });
//   return $button;
// }

// const showReloadButton = () => {
//   const $reloadButtonDiv = createElement('div', 'reloadWrap');
//   $arenas.appendChild($reloadButtonDiv);
//   const $reloadButton = createReloadButton('Reload');
//   $reloadButtonDiv.appendChild($reloadButton);
//   showElement($reloadButton);
// }

// const controlDuel = (event) => {
//   event.preventDefault();

//   const player1Hit = player1Attack();
//   console.log('##### player1Hit', player1Hit);

//   const player2Hit = player2Attack();
//   console.log('##### player2Hit', player2Hit);

//   const damage1 =
//    (player1Hit.defenceTarget === player2Hit.hitTarget) ? 0 : player2Hit.hitValue;
//   const damage2 =
//    (player2Hit.defenceTarget === player1Hit.hitTarget) ? 0 : player1Hit.hitValue;

//   console.log(`Damages: ${damage1}, ${damage2}`);

//   logSpacer();

//   if (damage1 !== 0) {
//   showLogMessage(getLogMessage('start', player1, player2));
//     player1.changeHp(-damage1);
//     player1.renderHp();
//     showLogMessage(getLogMessage('hit', player2, player1, damage1));
//   } else {
//     showLogMessage(getLogMessage('defence', player2, player1, 0));
//   }
//   if (damage2 !== 0) {
//     player2.changeHp(-damage2);
//     player2.renderHp();
//     showLogMessage(getLogMessage('hit', player1, player2, damage2));
//   } else {
//     showLogMessage(getLogMessage('defence', player1, player2, 0));
//   }

//   if (player1.hp === 0 && player2.hp > 0) {
//     showFightResult(player2.name);
//     logSpacer();
//     showLogMessage(getLogMessage('end', player2, player1));
//   } else if (player2.hp === 0 && player1.hp > 0) {
//     showFightResult(player1.name);
//     logSpacer();
//     showLogMessage(getLogMessage('end', player1, player2));
// } else if (player1.hp === 0 && player2.hp === 0) {
//     showFightResult('Draw');
//     logSpacer();
//     showLogMessage(getLogMessage('draw'));
// } else {
//     return;
//   }
//   showReloadButton();
// };

// const player1Attack = () => {
//   const hitTrg = hitTargets[getRandNum(0, hitTargets.length - 1)];
//   const defenceTrg = hitTargets[getRandNum(0, hitTargets.length - 1)];
//   return {
//     hitTarget: hitTrg,
//     hitValue: getRandNum(1, hitMaxStrengths[hitTrg]),
//     defenceTarget: defenceTrg
//   };
// }

// const player2Attack = () => {
//   const strike = {};
//   for (let item of $fightForm) {
//     if (item.checked && item.name === 'hit') {
//       strike.hitTarget = item.value;
//       strike.hitValue = getRandNum(1, hitMaxStrengths[item.value]);
//     }
//     if (item.checked && item.name === 'defence') {
//       strike.defenceTarget = item.value;
//     }
//     item.checked = false;
//   }
//   return strike;
// }

// function init() {
//   player1.enterArena();
//   player2.enterArena();

//   showLogMessage(getLogMessage('start', player1, player2));

//   $fightForm.addEventListener('submit', controlDuel);
// }

// init();
