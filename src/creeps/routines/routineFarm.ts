import { PathColors } from "utils/globalConsts";
import { movePath } from "utils/vizPath";

/**
 * Find, move and harvest from energy sources.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  const sources = creep.room.find(FIND_SOURCES);

  if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say("⛏️");
      creep.memory.announcedTask = true;
    }

    movePath(creep, sources[0], PathColors.PATHCOLOR_FARM);
  }
}
