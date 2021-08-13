import globalConsts, { PathColors, Routines, WorkEmoji } from "utils/globalConsts";
import { Logger } from "utils/logger";
import { movePath } from "utils/viz/vizPath";
import pickupEnergy from "./pickupEnergy";
import routineEnergizeTower from "./routineEnergizeTower";
import routineUpgrade from "./routineUpgrade";
import routineWithdraw from "./routineWithdraw";
import shouldCreepRefill from "./shouldCreepRefill";

/**
 * Depending on creep's capacity transfer energy to towers/controller/spawn or extension.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (shouldCreepRefill(creep)) {
    if (!pickupEnergy(creep)) {
      routineWithdraw(creep);
    }
  } else {
    if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
      const tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure =>
          structure.structureType === STRUCTURE_TOWER &&
          structure.store[RESOURCE_ENERGY] < globalConsts.TARGET_TOWER_CAPACITY
      });
      if (tower) {
        routineEnergizeTower(creep);
      } else {
        routineUpgrade(creep);
      }
    } else {
      if (creep.memory.currentTask !== Routines.TRANSPORT) {
        Logger.info(`${creep.name} switched to transporter routine`);
        creep.say(WorkEmoji.EMOJI_DELIVER);
        creep.memory.currentTask = Routines.TRANSPORT;
      }

      const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });

      if (target && creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.memory.isWorking = true;
        movePath(creep, target, PathColors.PATHCOLOR_TRANSPORTER);
      }
    }
  }
}
