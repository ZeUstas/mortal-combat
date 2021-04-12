const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

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

function randomButtonClickHandler() {
  const hitTurn = Math.floor(Math.random() * 10) <= 4 ? 0 : 1;
  let player = (hitTurn === 0) ? player1 : player2;
  // console.log ('hitTurn =  ' + hitTurn);
  hitPlayer(player, 30);
  if (player.hp === 0) {
    player = getWinner(player);
    showFightResult(player.name);
  }
}

function hitPlayer(playerObj, hitStrength) {
  playerObj.changeHp(-hitStrength);
  playerObj.renderHp();
}

function getWinner(playerObj) {
  return playerObj === player1 ? player2 : player1;
}

function showFightResult(playerName) {
  const $resultMessage = createElement('div', 'loseTitle');
  $resultMessage.innerText = playerName + ' wins!';
  $arenas.appendChild($resultMessage);
  $randomButton.style.display = 'none';
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

  // $arenas.appendChild($player);
  $player.appendChild($progressBar);
  $player.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($image);

  return $player;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$randomButton.addEventListener('click', randomButtonClickHandler);

