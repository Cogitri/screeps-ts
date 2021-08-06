import { movePath } from "./../../utils/vizPath";

export default function (creep: Creep): void {
  const pathColor = "#00e600";

  const controller = creep.room.controller;

  if (!controller) {
    return;
  }

  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("⚡ upgrade");
    movePath(creep, controller, pathColor);

    creep.memory.target = controller;
  }
}
