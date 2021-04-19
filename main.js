const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $resultMessage = createResultMessage();
const $reloadButtonDiv = createElement('div', 'reloadWrap');
const $reloadButton = createReloadButton('Reload');
const $fightForm = document.querySelector('.control');

const hitMaxStrengths = {
  head: 30,
  body: 25,
  foot: 20
};
const hitTargets = ['head', 'body', 'foot'];

const player1 = {
  playerNum: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Axe', 'Long Sword', 'Ice Hammer'],
  attack: launchAttack,
  changeHp: changeHP,
  elHp: elHP,
  renderHp: renderHP
};

const player2 = {
  playerNum: 2,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Ice Scepter', 'Kori Blade', 'Ice Daggers', 'Ice Hammer'],
  attack: launchAttack,
  changeHp: changeHP,
  elHp: elHP,
  renderHp: renderHP
};

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
      'Результат удара [playerWins]: [playerLose] - труп',
      '[playerLose] погиб от удара бойца [playerWins]',
      'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
      '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
      '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
      '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
      '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
      '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
      '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
      '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
      '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
      '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
      '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
      '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
      '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
      '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
      '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
      '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
      '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
      '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
      '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
      '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
      '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
      '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
      '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
      '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
      '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

function launchAttack() {
  console.log(`${this.name} Fight...`);
}

function changeHP(num) {
  this.hp += num;
  if (this.hp < 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(`.player${this.playerNum} .life`);
}

function renderHP() {
  this.elHp().style.width = `${this.hp}%`;
}

function zeroPad(str) {
  return +str < 10 ? `0${str}` : str;
}

function getLogMessage(logType, player1Obj, player2Obj, damage) {
  let logText;
  const time = new Date();
  const hours = zeroPad(time.getHours());
  const minutes = zeroPad(time.getMinutes());
  const seconds = zeroPad(time.getSeconds());

  switch (logType) {
    case 'start':
      logText = logs[logType];
      logText = logText.replace('[time]', `${hours}:${minutes}`);
      logText = logText.replace('[player1]', player1Obj.name);
      logText = logText.replace('[player2]', player2Obj.name);
      return logText;
    case 'end':
      logText = logs[logType][getRandNum(0, logs[logType].length -1)];
      logText = logText.replace('[playerWins]', player1Obj.name);
      logText = logText.replace('[playerLose]', player2Obj.name);
      return logText;
    case 'hit':
    case 'defence':
      logText = logs[logType][getRandNum(0, logs[logType].length -1)];
      logText = logText.replace('[playerKick]', player1Obj.name);
      logText = logText.replace('[playerDefence]', player2Obj.name);
      logText = `${hours}:${minutes}:${seconds}` +
                ` -- ${logText}` +
                ` -- ${player2Obj.name}: ущерб ${damage}, осталось ${player2Obj.hp} из 100.`;
      return logText;
    case 'draw':
      return logs[logType];
  }
}

function showLogMessage(message) {
  $chat.insertAdjacentHTML('afterbegin', `<p>${message}</p>`);
}

function lineFeed() {
  $chat.insertAdjacentHTML('afterbegin', `<p style="color:yellow" >***</p>`);
}

$fightForm.addEventListener('submit', function (e) {
  e.preventDefault();

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
});

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

function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
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

function createElement(tag, className) {
  const $element = document.createElement(tag);
  if (className) {
    $element.classList.add(className);
  }
  return $element;
}

function createPlayer(playerObj) {
  const $player = createElement('div', `player${playerObj.playerNum}`);
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$arenas.appendChild($resultMessage);

$arenas.appendChild($reloadButtonDiv);
$reloadButtonDiv.appendChild($reloadButton);

showLogMessage(getLogMessage('start', player1, player2));
console.log(getLogMessage('start', player1, player2));
