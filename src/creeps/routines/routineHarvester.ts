import { CreepRoles, PathColors } from "utils/globalConsts";

import { Logger } from "utils/logger";
import { movePath } from "utils/viz/vizPath";
import routineFarm from "./routineFarm";
import routineTransporter from "./routineTransporter";

/**
 * Depending on creep capacity the creep farms or transfers energy to spawn/containers/extensions, if no transporters are alive.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (creep.store.getUsedCapacity(RESOURCE_ENERGY) !== creep.store.getCapacity(RESOURCE_ENERGY)) {
    routineFarm(creep);
  } else {
    const container = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return structure.structureType === STRUCTURE_CONTAINER;
      }
    });

    // Is a transporter alive  ---yes--->  Container already build  ---yes--->  Container have capacity left  ---yes--->  Fill container with energy
    //     |                                   |                                      |
    //     no                                  no                                     no
    //     |                                   |                                      |
    //     V                                   V                                      V
    // Do the transporter Routine             Drop Energy                            Do the transporter Routine

    if (isATransporterAlive(creep.room)) {
      if (container.length) {
        const emptyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: structure => {
            return (
              structure.structureType === STRUCTURE_CONTAINER &&
              structure.store.getUsedCapacity(RESOURCE_ENERGY) !== structure.store.getCapacity(RESOURCE_ENERGY)
            );
          }
        });
        if (emptyContainer) {
          if (creep.transfer(emptyContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            movePath(creep, emptyContainer, PathColors.PATHCOLOR_HARVESTER);
          }
        } else {
          routineTransporter(creep);
        }
      } else {
        creep.drop(RESOURCE_ENERGY);
      }
    } else {
      routineTransporter(creep);
    }
  }
}

/**
 * Checks if min. 1 transporter is alive and in the same room, as the harvester.
 * @param room The room, the harvester is in
 * @returns True if min. 1 transporter is alive and in the same room. False if no transporters alive or in the same room.
 */
function isATransporterAlive(room: Room): boolean {
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    if (creep.memory.role === CreepRoles.ROLE_TRANSPORTER && creep.room.name === room.name) {
      Logger.debug("Es ist min. ein Transporter am Leben");
      return true;
    }
  }
  Logger.debug("Es sind keine Transporter am Leben");
  return false;
}
