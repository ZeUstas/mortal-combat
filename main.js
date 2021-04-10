const $arenas = document.querySelector('.arenas');

const player1 = {
  playerNum: 1,
  name: 'Scorpion',
  hp: 50,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Axe', 'Long Sword', 'Ice Hammer'],
  attack: function () {
    console.log(this.name + 'Fight...');
  },
};

const player2 = {
  playerNum: 2,
  name: 'Sub-Zero',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Ice Scepter', 'Kori Blade', 'Ice Daggers', 'Ice Hammer'],
  attack: function () {
    console.log(this.name + 'Fight...');
  },
};

function createElement(tag, className) {
  const $element = document.createElement(tag);;
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

