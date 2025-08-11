// Based on https://github.com/qiao/PathFinding.js

import type { Grid, GridNode } from "./grid";
import type { DiagonalMovement } from "./types.ts";

export interface AStarOptions {
  diagonalMovement?: DiagonalMovement;
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
    node = node.parent;
  }
  return path.reverse();
};

const getHeuristic = (
  diagonalMovement: DiagonalMovement,
): ((dx: number, dy: number) => number) => {
  if (diagonalMovement === "Never") return manhattan;
  return octile;
};

const selectNodeWithLowestF = (openList: GridNode[]): GridNode => {
  let bestIdx = 0;
  for (let i = 1; i < openList.length; i++) {
    if ((openList[i].f ?? Infinity) < (openList[bestIdx].f ?? Infinity)) {
      bestIdx = i;
    }
  }
  return openList.splice(bestIdx, 1)[0];
};

const processNeighbor = (
  neighbor: GridNode,
  current: GridNode,
  end: GridNode,
  openList: GridNode[],
  heuristic: (dx: number, dy: number) => number,
  weight: number,
): void => {
  if (neighbor.closed) return;

  const dx = Math.abs(neighbor.x - current.x);
  const dy = Math.abs(neighbor.y - current.y);
  const tentativeG = (current.g ?? 0) + (dx === 0 || dy === 0 ? 1 : Math.SQRT2);

  if (!neighbor.opened || tentativeG < (neighbor.g ?? Infinity)) {
    neighbor.g = tentativeG;
    neighbor.h =
      neighbor.h ??
      weight *
        heuristic(Math.abs(neighbor.x - end.x), Math.abs(neighbor.y - end.y));
    neighbor.f = (neighbor.g ?? 0) + (neighbor.h ?? 0);
    neighbor.parent = current;

    if (!neighbor.opened) {
      neighbor.opened = true;
      openList.push(neighbor);
    }
  }
};

export const createAStarFinder = (opts: AStarOptions = {}) => {
  const diagonalMovement: DiagonalMovement = opts.diagonalMovement ?? "Never";
  const heuristic = opts.heuristic ?? getHeuristic(diagonalMovement);
  const weight = opts.weight ?? 1;

  const findPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    grid: Grid,
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
      const node = selectNodeWithLowestF(openList);
      node.closed = true;

      if (node === end) {
        return reconstructPath(end);
      }

      const neighbors = grid.getNeighbors(node, diagonalMovement);
      for (const neighbor of neighbors) {
        processNeighbor(neighbor, node, end, openList, heuristic, weight);
      }
    }

    // no path found
    return [];
  };

  return { findPath };
};
