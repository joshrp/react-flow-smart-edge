import { createAStarFinder } from "../pathfinding/aStar";
import type { Grid } from "../pathfinding/grid";
import type { XYPosition } from "@xyflow/react";

/**
 * Takes source and target {x, y} points, together with an grid representation
 * of the graph, and returns two arrays of number tuples [x, y]. The first
 * array represents the full path from source to target, and the second array
 * represents a condensed path from source to target.
 */
export type PathFindingFunction = (
  grid: Grid,
  start: XYPosition,
  end: XYPosition
) => {
  fullPath: number[][];
};

export const pathfindingAStarDiagonal: PathFindingFunction = (
  grid,
  start,
  end
) => {
  try {
    const finder = createAStarFinder({
      diagonalMovement: "Always",
    });
    const fullPath = finder.findPath(start.x, start.y, end.x, end.y, grid);

    if (fullPath.length === 0) {
      throw new Error("No path found");
    }
    return { fullPath };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    throw new Error("Unknown error: " + error);
  }
};

export const pathfindingAStarNoDiagonal: PathFindingFunction = (
  grid,
  start,
  end
) => {
  try {
    const finder = createAStarFinder({
      diagonalMovement: "Never",
    });
    const fullPath = finder.findPath(start.x, start.y, end.x, end.y, grid);

    if (fullPath.length === 0) {
      throw new Error("No path found");
    }
    return { fullPath };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    throw new Error("Unknown error: " + error);
  }
};
