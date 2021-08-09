import globalConsts, { PathColors } from "utils/globalConsts";
import { Logger } from "utils/logger";
import { movePath } from "utils/vizPath";
import routineEnergizeTower from "./routineEnergizeTower";
import routineUpgrade from "./routineUpgrade";
import routineWithdraw from "./routineWithdraw";

export default function (creep: Creep): void {
  if (!creep.memory.working) {
    if (checkCreepCapacity(creep)) {
      routineWithdraw(creep);
      if (creep.memory.currentTask !== "withdraw") {
        Logger.info(`${creep.name} switched to withdraw routine`);
        creep.memory.currentTask = "withdraw";
      }
    } else {
      if (checkSpawnCapacity(creep) && checkExtensionsCapacity(creep)) {
        if (TOWER_CAPACITY < globalConsts.TARGET_TOWER_CAPACITY) {
          routineEnergizeTower(creep);
          if (creep.memory.currentTask !== "energize") {
            Logger.info(`${creep.name} switched to energize tower routine`);
            creep.memory.currentTask = "energize";
          }
        } else {
          routineUpgrade(creep);
          if (creep.memory.currentTask !== "upgrade") {
            Logger.info(` ${creep.name} switched to upgrade routine`);
            creep.memory.currentTask = "upgrade";
          }
        }
      } else {
        if (creep.memory.currentTask !== "transport") {
          Logger.info(`${creep.name} switched to transporter routine`);
          creep.memory.currentTask = "transport";
        }
        const target = creep.room.find(FIND_STRUCTURES, {
          filter: structure => {
            return (
              (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
          }
        });

        if (target.length > 0) {
          if (creep.transfer(target[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.memory.lockTask = false;
            creep.say("⛴︎ deliver");
            movePath(creep, target[0], PathColors.PATHCOLOR_TRANSPORT);
          }
        }
      }
    }
  }
}

function checkCreepCapacity(creep: Creep): boolean {
  if (creep.store.getFreeCapacity() > 0 && !creep.memory.lockTask) {
    return true;
  }
  return false;
}

function checkSpawnCapacity(creep: Creep): boolean {
  if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
    return true;
  }
  return false;
}

/**
 *  Checks if there are Extensions with free Capacity
 * @param creep
 * @returns True if there ist no Capacity in any Extensions
 */
function checkExtensionsCapacity(creep: Creep): boolean {
  const extensions = creep.room.find(FIND_STRUCTURES, {
    filter: s => s.structureType === STRUCTURE_EXTENSION && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  });

  if (extensions.length) {
    return false;
  }
  return true;
}
