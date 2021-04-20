import {createElement} from './lib.js';
import {player1, player2} from './players.js';
import {$fightForm} from './fight-form.js';

export const $resultMessage = createResultMessage();
export const $reloadButton = createReloadButton('Reload');
export const $reloadButtonDiv = createElement('div', 'reloadWrap');

function createResultMessage() {
  const $resMessage = createElement('div', 'winTitle');
  $resMessage.style.display = 'none';
  return $resMessage;
}

export function showFightResult(message) {
  $fightForm.style.display = 'none';
  if (message === player1.name || message === player2.name) {
    $resultMessage.innerText = `${message} wins!`;
  } else {
    $resultMessage.innerText = message;
  }
  $resultMessage.style.display = 'block';
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
