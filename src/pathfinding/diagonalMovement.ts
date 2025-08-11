export const DiagonalMovement = {
  Always: 1,
  Never: 2,
  IfAtMostOneObstacle: 3,
  OnlyWhenNoObstacles: 4,
} as const;

export type DiagonalMovement =
  (typeof DiagonalMovement)[keyof typeof DiagonalMovement];
