export default function (creep: Creep, damagedStructure: AnyStructure): void {
  const pathColor = "#ffff33";

  if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("ðŸ› ï¸Ž repair");
    creep.moveTo(damagedStructure, { visualizePathStyle: { stroke: pathColor } });
  }
}
