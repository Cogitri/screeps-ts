export default function (creep: Creep): void {
  const pathColor = "#ffff33";

  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

  if (targets.length) {
    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.memory.lockTask = true;
      creep.say("ðŸ› ï¸Ž build");
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: pathColor } });
    }
  }
}
