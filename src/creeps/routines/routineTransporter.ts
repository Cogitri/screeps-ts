import globalConsts, { PathColors, Routines, WorkEmoji } from "utils/globalConsts";
import { Logger } from "utils/logger";
import checkCreepCapacity from "./checkCreepCapacity";
import { movePath } from "utils/viz/vizPath";
import routineEnergizeTower from "./routineEnergizeTower";
import routineUpgrade from "./routineUpgrade";
import routineWithdraw from "./routineWithdraw";

/**
 * Depending on creep's capacity transfer energy to towers/controller/spawn or extension.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (checkCreepCapacity(creep)) {
    routineWithdraw(creep);
    if (creep.memory.currentTask !== Routines.WITHDRAW) {
      Logger.info(`${creep.name} switched to withdraw routine`);
      creep.memory.currentTask = Routines.WITHDRAW;
    }
  } else {
    if (checkSpawnCapacity(creep) && checkExtensionsCapacity(creep)) {
      if (TOWER_CAPACITY < globalConsts.TARGET_TOWER_CAPACITY) {
        const tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: structure =>
            structure.structureType === STRUCTURE_TOWER &&
            structure.store[RESOURCE_ENERGY] < globalConsts.TARGET_TOWER_CAPACITY
        });

        if (tower) {
          routineEnergizeTower(creep);
          if (creep.memory.currentTask !== Routines.ENERGIZE) {
            Logger.info(`${creep.name} switched to energize tower routine`);
            creep.memory.currentTask = Routines.ENERGIZE;
          }
        }
      } else {
        routineUpgrade(creep);
        if (creep.memory.currentTask !== Routines.UPGRADE) {
          Logger.info(` ${creep.name} switched to upgrade routine`);
          creep.memory.currentTask = Routines.UPGRADE;
        }
      }
    } else {
      if (creep.memory.currentTask !== Routines.TRANSPORT) {
        Logger.info(`${creep.name} switched to transporter routine`);
        creep.memory.currentTask = Routines.TRANSPORT;
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
          if (!creep.memory.announcedTask) {
            creep.say(WorkEmoji.EMOJI_DELIVER);
            creep.memory.announcedTask = true;
          }
          movePath(creep, target[0], PathColors.PATHCOLOR_TRANSPORTER);
        }
      }
    }
  }
}

/**
 * Checks spawn capacity to determine if harvester should upgrade controller.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 * @returns boolean - true if spawns and extensions are full, false otherwise.
 */
function checkSpawnCapacity(creep: Creep): boolean {
  if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
    return true;
  }
  return false;
}

/**
 *  Checks if there are Extensions with free Capacity
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
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
