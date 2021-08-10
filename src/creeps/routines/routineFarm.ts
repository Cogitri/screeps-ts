import { PathColors, WorkEmoji } from "utils/globalConsts";
import { movePath } from "utils/viz/vizPath";

/**
 * Find, move and harvest from energy sources.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  const sources = creep.room.find(FIND_SOURCES);

  if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say(WorkEmoji.EMOJI_HARVEST);
      creep.memory.announcedTask = true;
    }

    movePath(creep, sources[0], PathColors.PATHCOLOR_FARM);
  } else if (creep.harvest(sources[0]) === OK) {
    creep.memory.target = sources[0];
    creep.say(WorkEmoji.EMOJI_HARVEST);
  }
}
