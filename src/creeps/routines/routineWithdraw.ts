export default function (creep: Creep): void {
  const pathColor = "#33d6ff";
  const containers = creep.room.find(FIND_STRUCTURES, {
    filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
  });

  if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.say("withdraw");
    creep.moveTo(containers[0], { visualizePathStyle: { stroke: pathColor } });
  }
}
