const $arenas = document.querySelector('.arenas');
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

function launchAttack() {
  console.log(this.name + 'Fight...');
}

function changeHP(num) {
  this.hp += num;
  if (this.hp < 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector('.player' + this.playerNum + ' .life');
}

function renderHP() {
  this.elHp().style.width = this.hp + '%';
}

$fightForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const fighter1Strike = fighter1Attack();
  console.log('##### fighter1Strike', fighter1Strike);

  const fighter2Strike = fighter2Attack();
  console.log('##### fighter2Strike', fighter2Strike);

  const damage1 = (fighter1Strike.defenceTarget === fighter2Strike.hitTarget) ?
    Math.floor(fighter2Strike.hitValue / 2) : fighter2Strike.hitValue;
  const damage2 = (fighter2Strike.defenceTarget === fighter1Strike.hitTarget) ?
    Math.floor(fighter1Strike.hitValue / 2) : fighter1Strike.hitValue;
  player1.changeHp(-damage1);
  player2.changeHp(-damage2);
  console.log('Damages:', damage1, damage2);
  console.log('Hitpoints', player1.hp, player2.hp);
  player1.renderHp();
  player2.renderHp();

  if (player1.hp === 0 && player2.hp > 0) {
    showFightResult(player2.name);
  } else if (player2.hp === 0 && player1.hp > 0) {
    showFightResult(player1.name);
  } else if (player1.hp === 0 && player2.hp === 0) {
    showFightResult('Draw');
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
    $resultMessage.innerText = message + ' wins!';
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
  const $player = createElement('div', 'player' + playerObj.playerNum);
  const $progressBar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $image = createElement('img');

  $life.style.width = playerObj.hp + '%';
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

