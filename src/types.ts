export interface BlockState {
  // 坐标
  x: number;
  y: number;
  // 正确值
  correctValue?: number;
  // 是不是题目中的值
  original: boolean;
  // 填充值
  displayValue?: number;
  // 标记值
  notes: number[];

  flagged?: boolean;
  revealed?: boolean;
  mine?: boolean;
}
