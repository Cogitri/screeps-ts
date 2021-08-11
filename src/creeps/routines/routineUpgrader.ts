import { Logger } from "utils/logger";
import { Routines } from "utils/globalConsts";
import checkCreepCapacity from "./checkCreepCapacity";
import routineUpgrade from "./routineUpgrade";
import routineWithdraw from "./routineWithdraw";

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
