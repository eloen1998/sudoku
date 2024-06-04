export interface BlockState {
  // 坐标
  x: number;
  y: number;
  // 正确值
  correct: number;
  // 填充值
  fill?: number;
  // 标记值
  markList: number[];
}
