import { PathColors, WorkEmoji } from "utils/globalConsts";
import { movePath } from "utils/viz/vizPath";

/**
 * Withdraws energy from containers if available.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
  });

  if (container) {
    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      if (!creep.memory.announcedTask) {
        creep.say(WorkEmoji.EMOJI_WITHDRAW);
        creep.memory.announcedTask = true;
      }
      movePath(creep, container, PathColors.PATHCOLOR_WITHDRAW);
    }
  }
}
