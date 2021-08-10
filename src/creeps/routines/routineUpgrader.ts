import { Logger } from "utils/logger";
import checkCreepCapacity from "./checkCreepCapacity";
import routineUpgrade from "./routineUpgrade";
import routineWithdraw from "./routineWithdraw";

export default function (creep: Creep): void {
  if (checkCreepCapacity(creep)) {
    routineWithdraw(creep);
    if (creep.memory.currentTask !== "withdraw") {
      Logger.info(`${creep.name} switched to withdraw routine`);
      creep.memory.currentTask = "withdraw";
    }
  } else {
    routineUpgrade(creep);
    if (creep.memory.currentTask !== "upgrade") {
      Logger.info(` ${creep.name} switched to upgrade routine`);
      creep.memory.currentTask = "upgrade";
    }
  }
}
