/**
 * Move the Creep to a desired target. If pathViz is true, the path will be visialized.
 *
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 * @param target The target, to which the creep moves.
 * @param pathColor The color of the path, if it is displayed.
 * @returns {@link https://docs.screeps.com/api/#Creep.moveTo|moveTo()} function of creeps with visualized path or not.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function movePath(creep: Creep, target: any, pathColor: string): number {
  if (global.pathViz) {
    return creep.moveTo(target, { reusePath: 100, serializeMemory: true, visualizePathStyle: { stroke: pathColor } });
  } else {
    return creep.moveTo(target, { reusePath: 100, serializeMemory: true });
  }
}
