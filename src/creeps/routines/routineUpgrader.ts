import { Logger } from "utils/logger";
import { Routines } from "utils/globalConsts";
import checkCreepCapacity from "./checkCreepCapacity";
import routineUpgrade from "./routineUpgrade";
import routineWithdraw from "./routineWithdraw";

/**
 * Default routine for upgrader role. Continously transfers energy into room controller to progress and avoid downgrading.
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
    routineUpgrade(creep);
    if (creep.memory.currentTask !== Routines.UPGRADE) {
      Logger.info(` ${creep.name} switched to upgrade routine`);
      creep.memory.currentTask = Routines.UPGRADE;
    }
  }
}
