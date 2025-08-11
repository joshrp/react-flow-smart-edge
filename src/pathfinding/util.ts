// Based on https://github.com/qiao/PathFinding.js

import type { Grid } from "./grid";

const compressPath = (path: number[][]): number[][] => {
  if (path.length < 3) return path.slice();
  const compressed: number[][] = [];

  const [sx, sy] = path[0];
  let [px, py] = path[1];
  let dx = px - sx;
  let dy = py - sy;
  const norm = Math.sqrt(dx * dx + dy * dy);
  dx /= norm || 1;
  dy /= norm || 1;

  // save the first point
  compressed.push([sx, sy]);

  for (let i = 2; i < path.length; i++) {
    const [cx, cy] = path[i];
    const ndx = cx - px;
    const ndy = cy - py;
    const nNorm = Math.sqrt(ndx * ndx + ndy * ndy);
    const ndxNorm = (ndx / (nNorm || 1)) | 0;
    const ndyNorm = (ndy / (nNorm || 1)) | 0;

    // if the direction has changed, save the previous point
    if (ndxNorm !== dx || ndyNorm !== dy) {
      compressed.push([px, py]);
      dx = ndxNorm;
      dy = ndyNorm;
    }

    [px, py] = [cx, cy];
  }

  // save the last point
  compressed.push([px, py]);

  return compressed;
};

const interpolate = (
  x0: number,
  y0: number,
  x1: number,
  y1: number
): number[][] => {
  // Bresenham's line algorithm
  const line: number[][] = [];
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    line.push([x0, y0]);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
  return line;
};

const expandPath = (path: number[][]): number[][] => {
  const expanded: number[][] = [];
  if (path.length === 0) return expanded;
  for (let i = 0; i < path.length - 1; i++) {
    const [x0, y0] = path[i];
    const [x1, y1] = path[i + 1];
    const segment = interpolate(x0, y0, x1, y1);
    for (let j = 0; j < segment.length - 1; j++) {
      expanded.push(segment[j]);
    }
  }
  expanded.push(path[path.length - 1]);
  return expanded;
};

const smoothenPath = (_: Grid, path: number[][]): number[][] => {
  if (path.length < 3) return path.slice();
  const newPath: number[][] = [path[0]];
  let px = path[1][0];
  let py = path[1][1];
  let dx = px - path[0][0];
  let dy = py - path[0][1];

  const len = path.length;
  for (let i = 2; i < len; i++) {
    const cx = path[i][0];
    const cy = path[i][1];
    const ndx = cx - px;
    const ndy = cy - py;
    const cross = dx * ndy - ndx * dy;
    if (cross !== 0) {
      newPath.push([px, py]);
      dx = ndx;
      dy = ndy;
    }
    px = cx;
    py = cy;
  }
  newPath.push([px, py]);

  return newPath;
};

export const Util = {
  compressPath,
  expandPath,
  smoothenPath,
  interpolate,
};
