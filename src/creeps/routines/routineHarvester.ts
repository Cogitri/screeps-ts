import { PathColors, Routines } from "utils/globalConsts";
import { Logger } from "utils/logger";
import checkCreepCapacity from "./checkCreepCapacity";
import { movePath } from "utils/viz/vizPath";
import routineFarm from "./routineFarm";

/**
 * Depending on creep capacity the creep farms, upgrades or transfers energy to spawn/containers/extensions.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (checkCreepCapacity(creep)) {
    routineFarm(creep);
    if (creep.memory.currentTask !== Routines.FARMER) {
      Logger.info(`${creep.name} switched to farm routine`);
      creep.memory.currentTask = Routines.FARMER;
    }
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
