/** movePath
 * Move the Creep to a desired Target. If pathViz is true, the path will be visialized.
 *
 * @param creep The Creep, which will be moved
 * @param target The Taget, to which the Creep moves
 * @param pathColor The Color of the Path, if it is displayed
 */
export function movePath(creep: Creep, target: any, pathColor: string): void {
  if (global.pathViz) {
    creep.moveTo(target, { visualizePathStyle: { stroke: pathColor } });
  } else {
    creep.moveTo(target);
  }
}
