import { PathColors } from "utils/globalConsts";
import { movePath } from "./../../utils/vizPath";

export default function (creep: Creep): void {
  const tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_TOWER
  });

  if (tower) {
    if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      if (!creep.memory.announcedTask) {
        creep.say("⛴︎");
        creep.memory.announcedTask = true;
      }
      movePath(creep, tower, PathColors.PATHCOLOR_ENERGIZE_TOWER);
    }
  }
}
