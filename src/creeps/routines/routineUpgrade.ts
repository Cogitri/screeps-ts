import { PathColors } from "utils/globalConsts";
import { movePath } from "./../../utils/vizPath";

export default function (creep: Creep): void {
  const controller = creep.room.controller;

  if (!controller) {
    return;
  }

  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("⚡ upgrade");
    movePath(creep, controller, PathColors.PATHCOLOR_UPGRADE);
    creep.memory.target = controller;
  }
}
