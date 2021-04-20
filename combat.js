import {$fightForm, $resultMessage, $reloadButton} from './controls.js';
import {getLogMessage, showLogMessage, lineFeed} from './log.js';
import {player1, player2} from './players.js';
import {getRandNum} from './lib.js';

const hitMaxStrengths = {
  head: 30,
  body: 25,
  foot: 20
};
const hitTargets = ['head', 'body', 'foot'];

// $fightForm.addEventListener('submit', function (event) {
export function startCombat(event) {
  event.preventDefault();

  const fighter1Strike = fighter1Attack();
  console.log('##### fighter1Strike', fighter1Strike);

  const fighter2Strike = fighter2Attack();
  console.log('##### fighter2Strike', fighter2Strike);

  const damage1 =
   (fighter1Strike.defenceTarget === fighter2Strike.hitTarget) ? 0 : fighter2Strike.hitValue;
  const damage2 =
   (fighter2Strike.defenceTarget === fighter1Strike.hitTarget) ? 0 : fighter1Strike.hitValue;

  console.log(`Damages: ${damage1}, ${damage2}`);
  
  lineFeed();

  if (damage1 !== 0) {
    player1.changeHp(-damage1);
    player1.renderHp();
    showLogMessage(getLogMessage('hit', player2, player1, damage1));
  } else {
    showLogMessage(getLogMessage('defence', player2, player1, 0));
  }
  if (damage2 !== 0) {
    player2.changeHp(-damage2);
    player2.renderHp();
    showLogMessage(getLogMessage('hit', player1, player2, damage2));
  } else {
    showLogMessage(getLogMessage('defence', player1, player2, 0));
  }

  if (player1.hp === 0 && player2.hp > 0) {
    showFightResult(player2.name);
    lineFeed();
    showLogMessage(getLogMessage('end', player2, player1));
  } else if (player2.hp === 0 && player1.hp > 0) {
    showFightResult(player1.name);
    lineFeed();
    showLogMessage(getLogMessage('end', player1, player2));
} else if (player1.hp === 0 && player2.hp === 0) {
    showFightResult('Draw');
    lineFeed();
    showLogMessage(getLogMessage('draw'));
} else {
    return;
  }
  showReloadButton();
};

function fighter1Attack() {
  const hitTrg = hitTargets[getRandNum(0, hitTargets.length - 1)];
  const defenceTrg = hitTargets[getRandNum(0, hitTargets.length - 1)];
  return {
    hitTarget: hitTrg,
    hitValue: getRandNum(1, hitMaxStrengths[hitTrg]),
    defenceTarget: defenceTrg
  };
}

function fighter2Attack() {
  const strike = {};
  for (let item of $fightForm) {
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

function showFightResult(message) {
  $fightForm.style.display = 'none';
  if (message === player1.name || message === player2.name) {
    $resultMessage.innerText = `${message} wins!`;
  } else {
    $resultMessage.innerText = message;
  }
  $resultMessage.style.display = 'block';
}

function showReloadButton() {
  $reloadButton.style.display = 'block';
}
