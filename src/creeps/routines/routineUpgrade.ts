export default function (creep: Creep): void {
  const pathColor = "#00e600";

  const controller = creep.room.controller;

  if (!controller) {
    return;
  }

  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announceTask) {
      creep.say("⚡ upgrade");
      creep.memory.announceTask = true;
    }
    creep.moveTo(controller, { visualizePathStyle: { stroke: pathColor } });
    creep.memory.target = controller;
  }
}
