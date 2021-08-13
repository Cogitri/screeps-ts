import { PathColors, Routines, WorkEmoji } from "utils/globalConsts";
import { Logger } from "utils/logger";
import { movePath } from "utils/viz/vizPath";

/**
 * Finds and transfers energy into towers.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (creep.memory.currentTask !== Routines.ENERGIZE) {
    Logger.info(`${creep.name} switched to energize tower routine`);
    creep.say(WorkEmoji.EMOJI_DELIVER);
    creep.memory.currentTask = Routines.ENERGIZE;
  }

  const tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_TOWER
  });

  if (tower) {
    if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      movePath(creep, tower, PathColors.PATHCOLOR_ENERGIZE_TOWER);
    }
  }
}
