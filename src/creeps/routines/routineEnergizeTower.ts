import { PathColors } from "utils/globalConsts";
import { movePath } from "./../../utils/vizPath";

export default function (creep: Creep): void {
  const tower = creep.room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_TOWER
  });

  if (creep.transfer(tower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.say("transfer");
    movePath(creep, tower[0], PathColors.PATHCOLOR_ENERGIZE_TOWER);
  }
}
