export default function (creep: Creep, damagedStructure: AnyStructure): void {
  const pathColor = "#ffff33";

  if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("ðŸ› ï¸Ž repair");
    if (global.pathViz) {
      creep.moveTo(damagedStructure, { visualizePathStyle: { stroke: pathColor } });
    } else {
      creep.moveTo(damagedStructure);
    }
  }
}
