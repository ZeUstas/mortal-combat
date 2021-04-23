export const player1 = {
  indexNum: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Axe', 'Long Sword', 'Ice Hammer'],
  attack: launchAttack,
  changeHp: changeHP,
  elHp: elHP,
  renderHp: renderHP
};

export const player2 = {
  indexNum: 2,
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
  console.log(`${this.name} Fight...`);
}

function changeHP(num) {
  this.hp += num;
  if (this.hp < 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(`.player${this.indexNum} .life`);
}

function renderHP() {
  this.elHp().style.width = `${this.hp}%`;
}
