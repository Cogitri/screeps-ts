export default function (creep: Creep): void {
  const pathColor = "#33d6ff";
  const tower = creep.room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_TOWER
  });

  if (creep.transfer(tower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announceTask) {
      creep.say("transfer");
      creep.memory.announceTask = true;
    }

    creep.moveTo(tower[0], { visualizePathStyle: { stroke: pathColor } });
  }
}
