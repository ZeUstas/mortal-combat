import {createElement} from './lib.js';
import {player1, player2} from './players.js';
import {getLogMessage, showLogMessage} from './log.js';
import {startCombat} from './fight.js';
import {$resultMessage, $reloadButtonDiv, $reloadButton} from './fight-result.js';
import {$fightForm} from '/fight-form.js';

const $arenas = document.querySelector('.arenas');

const createPlayer = (playerObj) => {
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

export const initGame = () => {
  $arenas.appendChild(createPlayer(player1));
  $arenas.appendChild(createPlayer(player2));
  $arenas.appendChild($resultMessage);

  $arenas.appendChild($reloadButtonDiv);
  $reloadButtonDiv.appendChild($reloadButton);

  showLogMessage(getLogMessage('start', player1, player2));
  console.log(getLogMessage('start', player1, player2));
  $fightForm.addEventListener('submit', startCombat);
}

