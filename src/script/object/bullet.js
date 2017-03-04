import { Mover } from './mover';
import { res } from '../data';
import { roadMap } from '../map';
import { DIR, CXT_ROLE, CXT_BG, OFFSET_X, OFFSET_Y, brickStatus } from '../variables';

const BULLET_IMG = res.img.misc;
const ATTACK_OVER_AUD = res.audio.attackOver;
const ROAD_TYPE = {
  3: 'brick',
  4: 'steel',
  5: 'home'
};

let [currentRow, currentCol] = [0, 0]

class Bullet extends Mover {
  constructor (x, y, direction, type, index, grade) {
    super(x, y, direction, type, index);

    // 根据坦克的等级确定子弹的速度
    this.speed = grade ? 5 : 4;
    this.grade = grade;

    this.init();
  }

  init() {
    let resetDirection = {
      W: [this.x + 12, this.y],
      A: [this.x, this.y + 12],
      S: [this.x + 12, this.y + 24],
      D: [this.x + 24, this.y + 12]
    };

    [this.x, this.y] = resetDirection[this.direction];
  }

  clearAllBarrier() {
    roadMap[currentRow][currentCol] = 0;
    CXT_BG.clearRect(OFFSET_X + (currentCol << 4), OFFSET_Y + (currentRow << 4), 16, 16);
  }

  hitBrick(index) {
    console.log(index); 
    return false;
  }

  brick() {
    console.log(this.grade);
    if (this.grade <= 1) {
      let index = currentRow * 28 + currentCol;

      return brickStatus[index]
        ? this.hitBrick(index)
        : (brickStatus[index] = [1, 1, 1, 1]) && this.hitBrick(index);
    } else {
      this.clearAllBarrier();
    }
  }

  steel() {
    this.grade === 3 ? this.clearAllBarrier() : ATTACK_OVER_AUD.play();
    return false;
  }

  home() {
    console.log('home');
    return false;
  }

  hasBarrier(row, col) {
    let roadType = roadMap[row][col];

    if (roadType <= 2) {return true;}

    [currentRow, currentCol] = [row, col];
    return this[ROAD_TYPE[roadType]]();
  }

  draw() {
    this.move();
    CXT_ROLE.drawImage(BULLET_IMG, DIR[this.direction] << 3, 0, 8, 8, this.x + OFFSET_X, this.y + OFFSET_Y, 8, 8);
  }

  moveState() {
    return [true, false];
  }
}

export { Bullet };
