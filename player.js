export class Player {
  constructor(props) {
    this.indexNum = props.indexNum;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
  }
  attack() {
    console.log(`${this.name} Fight...`);
  }
  changeHp(num) {
    this.hp += num;
    if (this.hp < 0) {
      this.hp = 0;
    }
  }
  elHp() {
    return document.querySelector(`.player${this.indexNum} .life`);
  }
  renderHp() {
    this.elHp().style.width = `${this.hp}%`;
  }
}
