/** movePath
 * Move the Creep to a desired Target. If pathViz is true, the path will be visialized.
 *
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 * @param target The Taget, to which the Creep moves
 * @param pathColor The Color of the Path, if it is displayed
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function movePath(creep: Creep, target: any, pathColor: string): number {
  if (global.pathViz) {
    return creep.moveTo(target, { visualizePathStyle: { stroke: pathColor } });
  } else {
    return creep.moveTo(target);
  }
}
