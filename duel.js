import {showElement, getRandNum} from './lib.js';
import Player from './player.js';
import DuelLog from './duel-log.js';

export class Duel {
  $controlForm = document.querySelector('.control');

  createResultMessage = () => {
    const $resMessage = createElement('div', 'winTitle');
    $resMessage.style.display = 'none';
    return $resMessage;
  }

  showFightResult = (message) => {
    $fightForm.style.display = 'none';
    if (message === player1.name || message === player2.name) {
      $resultMessage.innerText = `${message} wins!`;
    } else {
      $resultMessage.innerText = message;
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
  
  action(event) {
    const hitMaxStrengths = {
      head: 30,
      body: 25,
      foot: 20
    };
    const hitTargets = ['head', 'body', 'foot'];
    const getPlayer1Hit = () => {
      const hitTrg = hitTargets[getRandNum(0, hitTargets.length - 1)];
      const defenceTrg = hitTargets[getRandNum(0, hitTargets.length - 1)];
      return {
        hitTarget: hitTrg,
        hitValue: getRandNum(1, hitMaxStrengths[hitTrg]),
        defenceTarget: defenceTrg
      };
    }
    const getPlayer2Hit = () => {
      const strike = {};
      for (let item of this.$controlForm) {
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
    const startDuel = (e) => {
      e.preventDefault();
    
      const player1Hit = getPlayer1Hit();
      console.log('##### player1Hit', player1Hit);
    
      const player2Hit = getPlayer2Hit();
      console.log('##### player2Hit', player2Hit);
    
      const damage1 =
       (player1Hit.defenceTarget === player2Hit.hitTarget) ? 0 : player2Hit.hitValue;
      const damage2 =
       (player2Hit.defenceTarget === player1Hit.hitTarget) ? 0 : player1Hit.hitValue;
    
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
      showElement($reloadButton);
    };
    startDuel(event);
  }
}


