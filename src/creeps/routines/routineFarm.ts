import { PathColors } from "utils/globalConsts";
import { movePath } from "./../../utils/vizPath";

export default function (creep: Creep): void {
  const sources = creep.room.find(FIND_SOURCES);
  if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
    creep.say("⛏️ harvest");
    movePath(creep, sources[0], PathColors.PATHCOLOR_FARM);
  } else if (creep.harvest(sources[0]) === OK) {
    creep.memory.target = sources[0];
    creep.say("⛏️");
  }
}
