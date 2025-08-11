import type { Grid } from "./grid";
import { createAStarFinder } from "./aStar";
import { DiagonalMovement } from "./diagonalMovement";

// Minimal no-diagonal JPS wrapper using A* with Never diagonal movement.
// This is sufficient for current usage (JumpPointFinder with Never).
export const createJumpPointFinder = () => {
  const aStar = createAStarFinder({ diagonalMovement: DiagonalMovement.Never });
  const findPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    grid: Grid
  ): number[][] => aStar.findPath(startX, startY, endX, endY, grid);
  return { findPath };
};
