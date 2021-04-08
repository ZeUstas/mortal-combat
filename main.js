const player1 = {
  name: 'Scorpion',
  hp: 50,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Axe', 'Long Sword', 'Ice Hammer'],
  attack: function () {
    console.log(this.name + 'Fight...');
  },
};

const player2 = {
  name: 'Sub-Zero',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Ice Scepter', 'Kori Blade', 'Ice Daggers', 'Ice Hammer'],
  attack: function () {
    console.log(this.name + 'Fight...');
  },
};

function createPlayer(playerNodeClassName, playerName, playerHitPoints) {
  const $player = document.createElement('div');
  $player.className = playerNodeClassName;

  const $progressBar = document.createElement('div');
  $progressBar.className = 'progressbar';

  const $life = document.createElement('div');
  $life.className = 'life';
  $life.style.width = '100%';
  // $life.innerText = playerHitPoints;

  const $name = document.createElement('div');
  $name.className = 'name';
  $name.innerText = playerName;

  const $character = document.createElement('div');
  $character.className = 'character';

  const $image = document.createElement('img');
  $image.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';

  document.querySelector('.arenas').appendChild($player);

  $player.appendChild($progressBar);
  $player.appendChild($character);

  $progressBar.appendChild($life);
  $progressBar.appendChild($name);

  $character.appendChild($image);
}

createPlayer('player1', 'Scorpion', 50);
createPlayer('player2', 'Sub-Zero', 80);
