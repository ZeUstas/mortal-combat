import {player1, player2} from './players.js';
import {getLogMessage, showLogMessage} from './log.js';
import {startCombat} from './combat.js';
import {createElement} from './lib.js';

const $arenas = document.querySelector('.arenas');
export const $chat = document.querySelector('.chat');
export const $fightForm = document.querySelector('.control');
export const $resultMessage = createResultMessage();
const $reloadButtonDiv = createElement('div', 'reloadWrap');
export const $reloadButton = createReloadButton('Reload');

export function initGame() {
  $arenas.appendChild(createPlayer(player1));
  $arenas.appendChild(createPlayer(player2));
  $arenas.appendChild($resultMessage);

  $arenas.appendChild($reloadButtonDiv);
  $reloadButtonDiv.appendChild($reloadButton);

  showLogMessage(getLogMessage('start', player1, player2));
  console.log(getLogMessage('start', player1, player2));
  $fightForm.addEventListener('submit', startCombat);
}

function createPlayer(playerObj) {
  const $player = createElement('div', `player${playerObj.indexNum}`);
  const $progressBar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $image = createElement('img');

  $life.style.width = `${playerObj.hp}%`;
  $name.innerText = playerObj.name;
  $image.src = playerObj.img;

  $player.appendChild($progressBar);
  $player.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($image);

  return $player;
}

function createResultMessage() {
  const $resMessage = createElement('div', 'winTitle');
  $resMessage.style.display = 'none';
  return $resMessage;
}

function createReloadButton(buttonTitle) {
  const $button = createElement('button', 'button');
  $button.style.display = 'none';
  $button.innerText = buttonTitle;
  $button.addEventListener('click', function () {
    window.location.reload();
  });
  return $button;
}
