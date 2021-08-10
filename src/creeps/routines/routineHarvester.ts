import { Logger } from "utils/logger";
import { PathColors } from "utils/globalConsts";
import checkCreepCapacity from "./checkCreepCapacity";
import { movePath } from "./../../utils/vizPath";
import routineFarm from "./routineFarm";

export default function (creep: Creep): void {
  if (!creep.memory.working) {
    if (creep.memory.currentTask !== "farm") {
      Logger.info(`${creep.name} switched to farm routine`);
      creep.memory.currentTask = "farm";
    }
    if (checkCreepCapacity(creep)) {
      routineFarm(creep);
    } else {
      // the creep looks for the nearest container.
      // the container the creep hopefully can use.
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => {
          return (
            structure.structureType === STRUCTURE_CONTAINER &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.store.getUsedCapacity()
          );
        }
      });

      // check if there are any containers, if there are no containers the creep will drop the energy
      if (container) {
        if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          movePath(creep, container, PathColors.PATHCOLOR_HARVESTER);
        }
      } else {
        creep.drop(RESOURCE_ENERGY);
      }
    }
  }
}
