import CollisionDetection from './collisionDetection';
import { roadMap } from "../map/affirmRoadMap";
import { brickStatus, dirNum } from '../global/var';

export default class TankCollisionDetection extends CollisionDetection {
  distanceToCenter: number;
  direction: string;
  x: number;
  y: number;

  constructor() {
    super();

    this.distanceToCenter = 16;
  }

  // 获取每一个碰撞坐标点最后的碰撞信息
  getItemBlockCollisionInfo(row: number, col: number): [boolean, number] {
    const roadType = roadMap[row][col];

    if (roadType === 0) return [false, 0];

    // roadType为1表示冰
    if (roadType === 1) {
      // TODO
      return [false, roadType];
    }

    // roadType为3表示砖块
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];

    if (roadType === 3 && brickStatusArr) {
      const directionNum = dirNum[this.direction];

      let indexInBrick = 0;
      let passAble = false;

      if (directionNum % 2) {
        indexInBrick = (this.x + (+!(directionNum - 1) * 32) - (col << 4)) >> 3;
        passAble = brickStatusArr.some(ele => (ele[indexInBrick] === 0));
      } else {
        indexInBrick = (this.y + (directionNum >> 1) * 32 - (row << 4)) >> 3;
        passAble = brickStatusArr[indexInBrick].some(ele => (ele === 0));
      }

      return [passAble, roadType];
    }

    return [roadType > 1, roadType];
  }

  // 检测是否碰到奖励
}
