import type { Grid, GridNode } from "./grid";
import { DiagonalMovement } from "./diagonalMovement";

export interface AStarOptions {
  diagonalMovement?: number;
  heuristic?: (dx: number, dy: number) => number;
  weight?: number;
}

const manhattan = (dx: number, dy: number): number => dx + dy;
const octile = (dx: number, dy: number): number => {
  const F = Math.SQRT2 - 1;
  return dx < dy ? F * dx + dy : F * dy + dx;
};

const reconstructPath = (endNode: GridNode): number[][] => {
  const path: number[][] = [];
  let node: GridNode | undefined = endNode;
  while (node) {
    path.push([node.x, node.y]);
    node = node.parent as GridNode | undefined;
  }
  return path.reverse();
};

const getHeuristic = (
  diagonalMovement: number
): ((dx: number, dy: number) => number) => {
  if (diagonalMovement === DiagonalMovement.Never) return manhattan;
  return octile;
};

export const createAStarFinder = (opts: AStarOptions = {}) => {
  const diagonalMovement = opts.diagonalMovement ?? DiagonalMovement.Never;
  const heuristic = opts.heuristic ?? getHeuristic(diagonalMovement);
  const weight = opts.weight ?? 1;

  const findPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    grid: Grid
  ): number[][] => {
    const start = grid.getNodeAt(startX, startY);
    const end = grid.getNodeAt(endX, endY);

    // Open list implemented as a simple array with linear min search for clarity
    const openList: GridNode[] = [];

    start.g = 0;
    start.h = 0;
    start.f = 0;
    start.opened = true;
    openList.push(start);

    while (openList.length > 0) {
      // extract node with smallest f
      let bestIdx = 0;
      for (let i = 1; i < openList.length; i++) {
        if ((openList[i].f as number) < (openList[bestIdx].f as number)) {
          bestIdx = i;
        }
      }
      const node = openList.splice(bestIdx, 1)[0];
      node.closed = true;

      if (node === end) {
        return reconstructPath(end);
      }

      const neighbors = grid.getNeighbors(node, diagonalMovement);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (neighbor.closed) continue;

        const dx = Math.abs(neighbor.x - node.x);
        const dy = Math.abs(neighbor.y - node.y);
        const ng = (node.g as number) + (dx === 0 || dy === 0 ? 1 : Math.SQRT2);

        if (!neighbor.opened || ng < (neighbor.g as number)) {
          neighbor.g = ng;
          neighbor.h =
            neighbor.h ??
            weight *
              heuristic(
                Math.abs(neighbor.x - end.x),
                Math.abs(neighbor.y - end.y)
              );
          neighbor.f = (neighbor.g as number) + (neighbor.h as number);
          neighbor.parent = node;

          if (!neighbor.opened) {
            neighbor.opened = true;
            openList.push(neighbor);
          }
        }
      }
    }

    // no path found
    return [];
  };

  return { findPath };
};
