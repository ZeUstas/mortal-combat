import { createElement } from '../utils/index.js';

export class Player {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.indexNum = props.indexNum;
    this.rootSelector = props.rootSelector;
    this.selector = `player${this.indexNum}`;
  }

  changeHp = (num) => {
    this.hp += num;
    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  elHp = () => {
    const $node = document.querySelector(`.${this.selector} .life`);
    return $node;
  }

  renderHp = () => {
    this.elHp().style.width = `${this.hp}%`;
  }

  create = () => {
    const $player = createElement('div', this.selector);
    const $progressBar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $image = createElement('img');

    $life.style.width = `${this.hp}%`;
    $name.innerText = this.name;
    $image.src = this.img;

    $player.appendChild($progressBar);
    $player.appendChild($character);
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($image);

    return $player;
  }

  enterArena = () => {
    const $root = document.querySelector(`.${this.rootSelector}`);
    $root.appendChild(this.create());
  }
}

// export default Player;