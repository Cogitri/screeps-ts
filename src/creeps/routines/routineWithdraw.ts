import { PathColors, Routines, WorkEmoji } from "utils/globalConsts";
import { Logger } from "utils/logger";
import { movePath } from "utils/viz/vizPath";

/**
 * Withdraws energy from containers if available.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (creep.memory.currentTask !== Routines.WITHDRAW) {
    Logger.info(`${creep.name} switched to withdraw routine`);
    creep.say(WorkEmoji.EMOJI_WITHDRAW);
    creep.memory.currentTask = Routines.WITHDRAW;
  }

  const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
  });

  if (container) {
    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      movePath(creep, container, PathColors.PATHCOLOR_WITHDRAW);
    }
  }
}
