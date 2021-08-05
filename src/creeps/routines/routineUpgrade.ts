export default function (creep: Creep): void {
  const pathColor = "#00e600";

  const controller = creep.room.controller;

  if (!controller) {
    return;
  }

  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("⚡ upgrade");
    if (global.pathViz) {
      creep.moveTo(controller, { visualizePathStyle: { stroke: pathColor } });
    } else {
      creep.moveTo(controller);
    }

    creep.memory.target = controller;
  }
}
